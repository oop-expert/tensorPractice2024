from django.shortcuts import render
from rest_framework import generics
from .models import Question
from .serializers import QuestionSerializer


class QuestionAPIView(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def get_queryset(self):
        count = self.request.query_params.get('count')
        if not count or int(count) < 5 or int(count) > 100:
            count = 10
        queryset = Question.objects.all().order_by('?')[:int(count)]
        return queryset
