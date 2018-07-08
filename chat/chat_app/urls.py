from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<room_id>[^/]+)/$', views.roomView, name='room'),
]