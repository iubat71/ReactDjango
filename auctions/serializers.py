from rest_framework import serializers

from .models import Users, Auctions
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auctions
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auctions
        fields = ('id', 'highest_bid', 'winner_id')