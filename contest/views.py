from django.shortcuts import render
from rest_framework import generics
from .serializers import ContestSerializer,LeaderboardSerializer
from .models import Contest,Leaderboard
class ContestListView(generics.ListCreateAPIView):
    queryset=Contest.objects.all()
    serializer_class = ContestSerializer

class LeaderboardListView(generics.ListCreateAPIView):
    queryset=Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer