from rest_framework import serializers

from .models import Player, Question, Room


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'image', 'answer')


class RoomSerializer(serializers.ModelSerializer):
    players = serializers.SerializerMethodField('get_players')
    questions = serializers.SerializerMethodField('get_questions')

    @staticmethod
    def get_players(room):
        return PlayerSerializer(Player.objects.filter(room=room.id), many=True).data

    @staticmethod
    def get_questions(room):
        return QuestionSerializer(Question.objects.filter(room=room.id), many=True).data

    class Meta:
        model = Room
        fields = ('id', 'code', 'qr_code', 'is_started', 'players', 'questions')
