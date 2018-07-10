from django.conf.urls import url
from .views import LastMessagesList

urlpatterns = [
    url('^lastmessages/(?P<room_id>.+)/$', LastMessagesList.as_view()),
]