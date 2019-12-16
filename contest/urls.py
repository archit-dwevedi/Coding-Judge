from django.urls import path
from .views import ContestListView,LeaderboardListView


urlpatterns = [
    path('contest/',ContestListView.as_view()),
    path('leaderboard/',LeaderboardListView.as_view()),
]