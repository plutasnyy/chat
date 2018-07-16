from knox.models import AuthToken
from rest_framework import generics, viewsets, permissions
from rest_framework.response import Response

from .serializers import LastMessagesSerializer, RoomSerializer, CreateUserSerializer, UserSerializer, \
    LoginUserSerializer
from chat_app.models import Message, Room


class LastMessagesList(generics.ListAPIView):
    serializer_class = LastMessagesSerializer

    def get_queryset(self):
        room_id = int(self.kwargs['room_id'])
        return Message.objects.filter(room__pk=room_id).order_by('-date')[:10:-1]


class RoomViewSet(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def get_queryset(self):
        return Room.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
