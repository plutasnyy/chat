from rest_framework import generics, viewsets, permissions
from .serializers import LastMessagesSerializer, RoomSerializer
from chat_app.models import Message, Room


class LastMessagesList(generics.ListAPIView):
    serializer_class = LastMessagesSerializer

    def get_queryset(self):
        room_id = int(self.kwargs['room_id'])
        return Message.objects.filter(room__pk=room_id).order_by('-date')[:10:-1]

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    permission_classes = [permissions.AllowAny, ]
    serializer_class = RoomSerializer