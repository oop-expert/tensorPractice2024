from django.urls import path, include
from .views import CreateRetrieveRoomViewSet, QuestionAPIView, PlayerAPIView, generate_image, calculate_score
from rest_framework import routers


router = routers.SimpleRouter()
router.register(r'room', CreateRetrieveRoomViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('question/<int:pk>/', QuestionAPIView.as_view()),
    path('question/generate-image/<int:pk>/', generate_image),
    path('player/<int:pk>/', PlayerAPIView.as_view()),
    path('player/calculate-score/', calculate_score)
]
