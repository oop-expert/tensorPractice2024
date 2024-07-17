import random
import string

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    qr_code = models.TextField(default=generate_unique_code)
    is_started = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.code


class Player(models.Model):
    name = models.CharField(max_length=50)
    avatar = models.TextField(null=True, blank=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    is_host = models.BooleanField(default=False)
    is_ready = models.BooleanField(default=False)
    score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


class Question(models.Model):
    image = models.TextField(null=True, blank=True)
    answer = models.CharField(max_length=50)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)


class Prompt(models.Model):
    text = models.CharField(max_length=50, unique=True)
    answer = models.CharField(max_length=50, unique=True)


@receiver(post_save, sender=Room)
def post_save_room(sender, instance, *args, **kwargs):
    if Question.objects.filter(room=instance).count() == 0:
        prompts = Prompt.objects.all().order_by('?')[:10]
        for prompt in prompts:
            Question.objects.create(room=instance, answer=prompt.answer)

