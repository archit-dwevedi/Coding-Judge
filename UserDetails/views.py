
# Imports
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework import status
from UserDetails.api.serializers import UserSignUpSerializer, UserDetailsSerializer, LoginSerializer, UserLoginSerializer
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from django.http import QueryDict
from UserDetails.models import UserDetails


# Put the logging info within your django view


class UserAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserLoginSerializer

    def get_queryset(self):
        return UserDetails.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        Y = list(UserDetails.objects.filter(user=self.request.user.id))
        data = {"user": Y[0].user.id, "college": Y[0].college}
        serializer = UserLoginSerializer(data=data)

        if serializer.is_valid():
            data["email"] = Y[0].user.email
            data["username"] = Y[0].user.username
            data["first_name"] = Y[0].first_name
            data["last_name"] = Y[0].last_name

            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(viewsets.ModelViewSet):
    permissions_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserLoginSerializer
    queryset = UserDetails.objects.all()


'''

# UserLogin is not needed as login request is beign sent to USERAPI for token authentication


class UserLogin(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, format='json'):
        serializer = self.get_serializer(data=request.data)
        # serializer = LoginSerializer(data=request.data)
        # if not serializer.is_valid():
        #   return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.is_valid(raise_exception=True)
        if serializer.is_valid():
            user = serializer.validated_data
            token = Token.objects.get(user=user).key
            return Response({
                "user": UserLoginSerializer(user, context=self.get_serializer_context()).data,
                "token": token
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        return Response(request.data)


'''


class UserLogin(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, format='json'):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": user,
            "token": Token.objects.create(user),
        })


class UserRegister(APIView):
    """
    Creates the User
    """

    def post(self, request, format='json'):
        data = {}
        userSerializer = UserSignUpSerializer(data=request.data)
        if not userSerializer.is_valid():
            return Response(userSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
        data["user"] = userSerializer.data
        data["user"]["password"] = request.data["password"]
        data["college"] = request.data.get("college")
        serializer = UserDetailsSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user.user)
            json = serializer.data
            json['token'] = token.key
            return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        return Response('Hello')
