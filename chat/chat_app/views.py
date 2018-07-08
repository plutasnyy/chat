import json

from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.utils.safestring import mark_safe

from .models import Room


@login_required()
def index(request):
    rooms = Room.objects.order_by("title")
    return render(request, 'chat_app/index.html', {
        'rooms':rooms,
    })


@login_required()
def roomView(request, room_id):
    room = Room.objects.get(pk=room_id)
    if room is None:
        redirect('/')

    return render(request, 'chat_app/room.html', {
        'room_id_json': mark_safe(json.dumps(room_id))
    })

