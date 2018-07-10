from rest_framework import generics

from .serializers import LastMessagesSerializer
from chat_app.models import Message


class LastMessagesList(generics.ListAPIView):
    serializer_class = LastMessagesSerializer

    def get_queryset(self):
        room_id = int(self.kwargs['room_id'])
        return Message.objects.filter(room__pk=room_id).order_by('-date')[:10:-1]