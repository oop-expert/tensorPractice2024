from django.db import models
import string
import random
import qrcode
import base64
import io

def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code

def generate_qr_code(code):
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(code)
    qr.make(fit=True)
    #img = qr.make_image(fill_color="black", back_color="white")
    img_bytes = io.BytesIO()
    #img.save(img_bytes, format='PNG')
    return base64.b64encode(img_bytes.getvalue()).decode('utf-8')

class Room(models.Model):
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    limit_of_players = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    qr_code_base64 = models.CharField(max_length=1000, blank=True)  # Изменил имя поля

    def save(self, *args, **kwargs):
        if not self.qr_code_base64:
            self.qr_code_base64 = generate_qr_code(self.code)  # Сгенерировать QR-код
        super().save(*args, **kwargs)  # Сохранить модель