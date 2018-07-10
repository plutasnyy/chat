from rest_framework import serializers
from chat_app.models import Message

class LastMessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'