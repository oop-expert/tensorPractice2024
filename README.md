## Подготовка проекта
`
python -m spacy download ru_core_news_lg
`


## Подготовка базы данных

`
python manage.py makemigrations
`

`
python manage.py migrate
`


Загрузит фильмы из файла [films.json](films.json) в бд

`
python manage.py loaddata films.json
`

## WebSocket

Пример ссылки для подключения: `ws://127.0.0.1:8000/ws/room/AAA/?username=Len&avatar_id=1`, 
где AAA - код комнаты, Len - имя игрока и avatar_id - id аватара.


### Запуск redis для WebSocket

`
docker-compose -f docker-compose.yaml up -d
`

### Поля в сообщениях
- `command` - команда
- `info` - общая информация
- `username` - имя пользователя, который отправил сообщение с данной командой
- `players` - все игроки в комнате

### Команды в WebSocket

- `join` - присоединение игрока (отправляется автоматически при подключении к WebSocket).

Пример ответа:
```
{
    "command": "join",
    "info": "Len is joined",
    "username": "Len",
    "players": [
        {
            "id": 6,
            "name": "Len",
            "avatar": "1",
            "is_host": false,
            "is_ready": false,
            "score": 0,
            "created_at": "2024-07-22T18:08:55.272831+05:00",
            "room": 2
        }
    ]
}
```

- `change_status` - смена статуса игрока на противоположный ("Готов к игре" или "Не готов").

Пример отправляемого сообщения:
```
{
    "command": "change_status",
    "info": "Len changed status"
}
```

Пример ответа:
```
{
    "command": "change_status",
    "info": "Len changed status",
    "username": "Len",
    "players": [
        {
            "id": 6,
            "name": "Len",
            "avatar": "1",
            "is_host": false,
            "is_ready": false,
            "score": 0,
            "created_at": "2024-07-22T18:08:55.272831+05:00",
            "room": 2
        }
    ]
}
```

- `start_game` - админ начал игру.

Пример отправляемого сообщения и ответа:
```
{
    "command": "start_game",
    "info": "Len start game"
}
```

- `restart_game` - кто-то из игроков перезапустил игру (тот, кто перезапустил, будет админов).

Пример отправляемого сообщения:
```
{
    "command": "restart_game",
    "info": "Len restart game"
}
```

Пример ответа:
```
{
    "command": "restart_game",
    "info": "Len restart game",
    "username": "Len",
    "players": [
        {
            "id": 6,
            "name": "Len",
            "avatar": "1",
            "is_host": false,
            "is_ready": false,
            "score": 0,
            "created_at": "2024-07-22T18:08:55.272831+05:00",
            "room": 2
        }
    ]
}
```

- `disconnect` - оключение игрока (отправляется автоматически при отключении от WebSocket).

Пример ответа:
```
{
    "command": "disconnect",
    "info": "Len left room",
    "username": "Len",
    "players": [
        {
            "id": 6,
            "name": "viki",
            "avatar": "1",
            "is_host": false,
            "is_ready": false,
            "score": 0,
            "created_at": "2024-07-22T18:08:55.272831+05:00",
            "room": 2
        },
        {
            "id": 7,
            "name": "kek",
            "avatar": "2",
            "is_host": true,
            "is_ready": false,
            "score": 0,
            "created_at": "2024-07-22T18:08:55.272831+05:00",
            "room": 2
        },
    ]
}
```

### Коды ошибок, которые могут возникнуть при подключении
- 4001 - имя пользователя не задано
- 4002 - игрок с таким именем уже существует в этой комнате
- 4003 - игра уже началась
- 4004 - комната не найдена

## Запуск проекта

`
python manage.py runserver
`

## Вопросы для нейросети
Пример запросов находится в файле [questions.http](questions/questions.http)