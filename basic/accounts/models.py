
from django.db import models

class Token(models.Model):
    email = models.TextField()
    token = models.CharField(max_length=40)
