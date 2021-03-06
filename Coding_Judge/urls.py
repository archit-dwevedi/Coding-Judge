
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('users/', include('UserDetails.urls')),
    path('', include('contest.urls')),
    path('', include('judge.urls')),
    path('', include('problem.urls')),
]
