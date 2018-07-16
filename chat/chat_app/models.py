from django.db import models
from datetime import datetime

class Room(models.Model):
    text = models.CharField(max_length=255)
    staff_only = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

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