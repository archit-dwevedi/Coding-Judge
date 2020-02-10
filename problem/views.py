from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProblemSerializer, TestCaseSerializer
from .models import Problem, TestCase
from rest_framework.pagination import PageNumberPagination
from judge.models import Submission


class TestCaseListView(viewsets.ModelViewSet):

    serializer_class = TestCaseSerializer

    def get_queryset(self, request):
        return TestCase.objects.filter(problem=self.request.data["problem"])


class ProblemListView(viewsets.ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    pagination_class = PageNumberPagination
