from rest_framework import serializers
from .models import Contest,Leaderboard
class ContestSerializer(serializers.ModelSerializer):
    class Meta:
        model=Contest
        fields=('contest_name','contest_description','problems','start_time','end_time','participants')

class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Leaderboard
        fields=('board_name','user','contest','score')