from django.db import models
from problem.models import Problem
from django.contrib.auth.models import User


class Contest(models.Model):
    contest_name = models.CharField(
        max_length=100, unique=True, default='Contest')
    contest_description = models.TextField()
    problems = models.ManyToManyField(Problem)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    participants = models.ManyToManyField(User, through='LeaderBoard')

    def __str__(self):
        return self.contest_name


class Leaderboard(models.Model):
    board_name = models.CharField(max_length=70, null=True)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    contest = models.ForeignKey(Contest, null=True, on_delete=models.CASCADE)
    score = models.IntegerField(null=True, blank=True)

    class Meta:
        unique_together = [['user', 'contest'], ['board_name', 'user']]

    def __str__(self):
        return self.board_name
