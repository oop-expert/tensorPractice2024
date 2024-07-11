from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Question


class QuestionsTests(APITestCase):
    def setUp(self):
        for i in range(200):
            Question.objects.create(text=f'Test question {i + 1}')

    def test_get_questions(self):
        url = reverse('questions')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 10)

        films = [data['text'] for data in response.data]
        self.assertEqual(len(films), len(set(films)))

    def test_get_nine_questions(self):
        url = reverse('questions')
        response = self.client.get(f'{url}?count=9')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 9)

    def test_get_three_or_questions(self):
        url = reverse('questions')
        response = self.client.get(f'{url}?count=3')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'message': 'count must be between 5 and 100'})

    def test_get_two_hundred_questions(self):
        url = reverse('questions')
        response = self.client.get(f'{url}?count=200')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'message': 'count must be between 5 and 100'})

    def test_count_is_string(self):
        url = reverse('questions')
        response = self.client.get(f'{url}?count=aaa')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'message': 'count must be an integer'})

    def test_count_is_float(self):
        url = reverse('questions')
        response = self.client.get(f'{url}?count=7.5')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {'message': 'count must be an integer'})
