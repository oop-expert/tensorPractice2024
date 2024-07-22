from rest_framework import mixins, viewsets, generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Room, Question, Prompt, Player
from .serializers import RoomSerializer, QuestionSerializer, PlayerSerializer
from .utils import get_similarity
from tensorgame.kandinsky_api import start_generating_image


class CreateRetrieveRoomViewSet(mixins.CreateModelMixin,
                                mixins.RetrieveModelMixin,
                                viewsets.GenericViewSet):
    queryset = Room.objects.all()
    lookup_field = 'room_code'
    serializer_class = RoomSerializer

    def retrieve(self, request, *args, **kwargs):
        room_code = kwargs[self.lookup_field]
        room = Room.objects.filter(code=room_code)
        if not room:
            return Response(data={'error': 'No room found!'}, status=status.HTTP_404_NOT_FOUND)
        else:
            serializer = RoomSerializer(room[0])
            return Response(serializer.data)


class QuestionAPIView(generics.RetrieveAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class PlayerAPIView(generics.RetrieveAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


@api_view(['PATCH'])
def generate_image(request, pk):
    question = Question.objects.get(pk=pk)
    prompt = Prompt.objects.filter(answer=question.answer).first()
    question.image = start_generating_image(prompt.text)
    question.save()
    serializer = QuestionSerializer(question)
    return Response(serializer.data)


@api_view(['PATCH'])
def calculate_score(request):
    player = Player.objects.get(pk=request.data['player_id'])
    question = Question.objects.get(pk=request.data['question_id'])
    score = 0
    is_right = get_similarity(question.answer, request.data['player_answer']) > 0.8
    if is_right:
        score = 10 * request.data['seconds'] + 100
    player.score += score
    player.save()
    return Response({'score': score, 'is_right': is_right})
