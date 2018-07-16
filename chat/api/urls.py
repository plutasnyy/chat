from django.conf.urls import url
from django.urls import include
from rest_framework.routers import DefaultRouter

from .views import LastMessagesList, RoomViewSet, RegistrationAPI, LoginAPI, UserAPI

router = DefaultRouter()
router.register('rooms', RoomViewSet, 'rooms')

urlpatterns = [
    url('^lastmessages/(?P<room_id>.+)/$', LastMessagesList.as_view()),
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
]
