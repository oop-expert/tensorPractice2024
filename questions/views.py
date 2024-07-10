from rest_framework import generics
from .models import Question
from .serializers import QuestionSerializer
from rest_framework import status
from rest_framework.response import Response


class QuestionAPIView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get(self, request, *args, **kwargs):
        count = request.query_params.get('count')
        if count:
            if not count.isdigit():
                return Response({'message': 'count must be an integer'}, status=status.HTTP_400_BAD_REQUEST)
            count = int(count)
            if not 5 <= count <= 100:
                return Response({'message': 'count must be between 5 and 100'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            count = 10
        questions = QuestionSerializer(Question.objects.all().order_by('?')[:count], many=True).data
        return Response(questions)
