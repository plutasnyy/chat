from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic.base import RedirectView

urlpatterns = [
    url(r'^', include('chat_app.urls')),
    url(r'^api/', include('api.urls')),
    url(r'^api/auth/', include('knox.urls')),
    url(r'^admin/', admin.site.urls),
]
