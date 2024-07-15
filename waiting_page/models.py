from django.db import models


class Room(models.Model):
    code = models.CharField(max_length=50, unique=True)
    is_started = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.code


class Player(models.Model):
    name = models.CharField(max_length=50)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)
    is_ready = models.BooleanField(default=False)
    score = models.IntegerField(default=0)
    combo = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name
