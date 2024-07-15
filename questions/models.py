from django.db import models


class Question(models.Model):
    text = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.text
