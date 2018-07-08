from django.contrib.auth.models import User
from django.db import models
from django.conf import settings
from datetime import datetime

class Room(models.Model):
    title = models.CharField(max_length=255)
    staff_only = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    @property
    def group_name(self):
        return 'room_%s' % self.id

class Message(models.Model):
    room = models.ForeignKey(Room,on_delete=models.CASCADE)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE,)
    date = models.DateTimeField(default=datetime.now, blank=True)
    content = models.TextField(null=True)

    def __str__(self):
        return self.content