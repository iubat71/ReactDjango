from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Users,Auctions
from .serializers import UsersSerializer, AuctionSerializer,BidSerializer
from django.contrib.auth.models import User
from rest_framework import generics
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import user_logged_out

#List all stocks or creates new ones

# /users
class UsersList(APIView):

    def get(self, request):
        users = Users.objects.all()
        serializer = UsersSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# /auctions
class AuctionList(APIView):

    def get(self, request):
        auctions = Auctions.objects.all()
        serializer = AuctionSerializer(auctions, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AuctionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) \


class AuctionBid(APIView):


    def get(self, request, id):
        auction = Auctions.objects.filter(id=id)
        serializer = AuctionSerializer(auction, many=True)
        return Response(serializer.data)

    def put(self, request, id, format=None):
        auction = Auctions.objects.get(id=id)
        serializer = BidSerializer(auction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Logout(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        request._auth.delete()
        user_logged_out.send(sender=request.user.__class__, request=request, user=request.user)
        return Response(None, status=status.HTTP_204_NO_CONTENT)

class UpdateBid(generics.UpdateAPIView):
    queryset = Auctions.objects.all()
    serializer_class = AuctionSerializer

    def update(self, request, *args, **kwargs):
        instance = self.filter(request.data.ger("id"))
        instance.highest_bid = request.data.get("highest_bid")
        instance.save()

        serializer = self.get_serializer(instance)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)