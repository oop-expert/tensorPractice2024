from .consumers import RoomConsumer
from django.urls import path

websocket_urlpatterns = [
    path('ws/room/<room_code>/', RoomConsumer.as_asgi())
]
