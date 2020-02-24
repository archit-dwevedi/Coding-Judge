
from django.urls import include, path
from UserDetails.views import UserRegister, UserLogin, UserAPI, UserDetailView
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework.authtoken import views

router = routers.DefaultRouter()
router.register(r'userdetails', UserDetailView)
urlpatterns = [
    path('register/', UserRegister.as_view()),
    path('login/', UserLogin.as_view()),
    path('user/', UserAPI.as_view()),
    path('token-auth/', views.obtain_auth_token),
    path('', include(router.urls)),

]
#path(r'^token-auth/$', obtain_jwt_token)
