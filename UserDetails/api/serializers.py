
# Imports

from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

# Custom Apps Imports
from UserDetails.models import UserDetails
User = get_user_model()

# Default User Model


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, max_length=32)
    password = serializers.CharField(required=True, min_length=8)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError(
            "Unable to login with provided credentials")


class UserSignUpSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    email = serializers.EmailField(
        required=True,
        max_length=32,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8, write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
                                        validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('username', 'email', 'password')


class UserDetailsSerializer(serializers.ModelSerializer):

    user = UserSignUpSerializer()

    def create(self, data):
        validated_data = data["user"]
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        user.save()
        userDetails = UserDetails.objects.create(
            user=user,

            college=data['college']
        )
        return userDetails

    class Meta:
        model = UserDetails
        fields = ['user', 'college']


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = ('user', 'college', 'first_name',
                  'last_name', 'id')
