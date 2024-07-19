import random
import string
import qrcode
import base64
import io

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from tensorgame.settings import FRONTEND_URL


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


def generate_qr_code(code):
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(f'{FRONTEND_URL}lobby/{code}/')
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    img_bytes = io.BytesIO()
    img.save(img_bytes)
    return base64.b64encode(img_bytes.getvalue()).decode('utf-8')


class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    qr_code = models.TextField(null=True, blank=True)
    is_started = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.code

    def save(self, *args, **kwargs):
        if not self.qr_code:
            self.qr_code = generate_qr_code(self.code)  # Сгенерировать QR-код
        super().save(*args, **kwargs)  # Сохранить модель


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
