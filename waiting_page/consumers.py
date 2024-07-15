from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django.http import QueryDict

from .models import Room, Player


class RoomConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.room_code = self.scope['url_route']['kwargs']['room_code']
        query = QueryDict(self.scope['query_string'])
        username = query.get('username')
        self.room = await self.get_room()
        await self.accept()

        if not username:
            return await self.close(4001, 'username is not specified')
        if not self.room:
            return await self.close(4004, 'room is not found')
        if self.room.is_started:
            return await self.close(4003, 'game is started')

        self.user = await self.get_or_create_player(username)
        await self.channel_layer.group_add(
            self.room_code,
            self.channel_name
        )
        await self.channel_layer.group_send(
            self.room_code,
            {
                'type': 'websocket_players_changed',
                'info': f'{username} is joined',
                'username': username,
                'command': 'join'
            }
        )

    async def receive_json(self, content, **kwargs):
        command = content.get('command', None)
        info = content.get('info', None)
        self.room = await self.get_room()
        self.user = await self.refresh_player()

        if command == 'change_status':
            await self.change_player_status()
            await self.channel_layer.group_send(
                self.room_code,
                {
                    'type': 'websocket_players_changed',
                    'info': info,
                    'username': self.user.name,
                    'command': command
                }
            )

        elif command == 'start_game':
            await self.channel_layer.group_send(
                self.room_code,
                {
                    'type': 'websocket_start_game',
                    'info': info,
                    'command': command
                }
            )

        elif command == 'restart_game':
            await self.channel_layer.group_send(
                self.room_code,
                {
                    'type': 'websocket_restart_game',
                    'info': info,
                    'username': self.user.name,
                    'command': command
                }
            )

    async def disconnect(self, close_code):
        if close_code not in [4001, 4003, 4004]:
            self.user = await self.refresh_player()
            await self.delete_player()
            await self.channel_layer.group_send(
                self.room_code,
                {
                    'type': 'websocket_players_changed',
                    'info': f'{self.user.name} left room',
                    'username': self.user.name,
                    'command': 'disconnect'
                }
            )
        await self.channel_layer.group_discard(
            self.room_code,
            self.channel_name,
        )

    async def websocket_players_changed(self, event):
        self.players = await self.refresh_players()
        await self.send_json(({
            'command': event['command'],
            'info': event['info'],
            'username': event['username'],
            'players': self.players
        }))

    async def websocket_start_game(self, event):
        statuses = [player['is_ready'] for player in self.players]
        if all(statuses) and self.user.is_admin:
            await self.change_room_status()
            await self.send_json(({
                'command': event['command'],
                'info': event['info']
            }))

    async def websocket_restart_game(self, event):
        await self.change_room_status()
        await self.reset_players(event['username'])
        self.players = await self.refresh_players()
        await self.send_json(({
            'command': event['command'],
            'info': event['info'],
            'username': event['username'],
            'players': self.players
        }))

    @database_sync_to_async
    def get_room(self):
        return Room.objects.filter(code=self.room_code).first()

    @database_sync_to_async
    def change_room_status(self):
        return Room.objects.filter(code=self.room_code).update(is_started=not self.room.is_started)

    @database_sync_to_async
    def get_or_create_player(self, name):
        player, _ = Player.objects.get_or_create(room=self.room, name=name)
        players_count = self.room.player_set.all().count()
        if players_count == 1:
            player.is_admin = True
            player.save()
        return player

    @database_sync_to_async
    def change_player_status(self):
        return Player.objects.filter(room=self.room, name=self.user.name).update(is_ready=not self.user.is_ready)

    @database_sync_to_async
    def refresh_player(self):
        return Player.objects.get(room=self.room, name=self.user.name)

    @database_sync_to_async
    def refresh_players(self):
        return [
            {
                'name': player.name,
                'is_admin': player.is_admin,
                'is_ready': player.is_ready
            }
            for player in self.room.player_set.all()
        ]

    @database_sync_to_async
    def reset_players(self, admin):
        Player.objects.filter(room=self.room).update(is_admin=False, is_ready=False, score=0, combo=0)
        return Player.objects.filter(room=self.room, name=admin).update(is_admin=True)

    @database_sync_to_async
    def delete_player(self):
        self.user.delete()
        players_count = self.room.player_set.all().count()
        if players_count == 0:
            self.room.delete()
        elif self.user.is_admin:
            new_admin = Player.objects.order_by('created_at')[0]
            new_admin.is_admin = True
            new_admin.save()
