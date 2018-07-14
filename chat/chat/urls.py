from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic.base import RedirectView


urlpatterns = [
    url(r'^', include('chat_app.urls')),
    url(r'^api/', include('api.urls')),
    url(r'^accounts/', include('account.urls')),
    url(r'^admin/', admin.site.urls),
    #url(r'^$', RedirectView.as_view(url='/chat/', permanent=False), name='home')
]
