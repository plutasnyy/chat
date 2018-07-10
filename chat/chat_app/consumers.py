from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message, Room
from datetime import datetime
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'room_%s' % self.room_id

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        room = Room.objects.get(pk=self.room_id)
        user = self.scope['user']
        print(user, user.username, room, room.title)
        Message.objects.create(content=message, room=room, user=user)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': self.scope['user'].username,
                'time': datetime.now().strftime('%H:%M'),
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message,
            'username': event['username'],
            'time': event['time'],
        }))