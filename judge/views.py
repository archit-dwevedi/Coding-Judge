from django.shortcuts import render
from rest_framework import generics, permissions, viewsets
from .models import Verdict, Submission, SubmissionDetails
from .serializers import VerdictSerializer, SubmissionSerializer, SubmissionDetailsSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from problem.models import Problem
from django.http import JsonResponse


class VerdictListView(viewsets.ModelViewSet):
    queryset = Verdict.objects.all()
    serializer_class = VerdictSerializer


class SubmissionListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = SubmissionSerializer

    def get_queryset(self):
        return Submission.objects.filter(user=self.request.user)

    def post(self, request, format='json'):
       # data["user"] = self.request.user
        if(request.data["ProblemFilter"] == True):
            ProblemSubmissions = []
            ProblemSubmissions = Submission.objects.filter(
                problems=self.request.data["problem_id"]).values('id', 'code')

            return JsonResponse(list(ProblemSubmissions), safe=False)

        serialzier = SubmissionSerializer(data=request.data)
        error = "Error in post submissions user= " + self.request.user.username
        if serialzier.is_valid():
            data = serialzier.data
            data["user"] = self.request.user.id
            name = str(self.request.user.username)
            i = name.find('@')
            data["username"] = name[:(i)]
            problems = list(Problem.objects.filter(
                id=request.data["problems"]))
            data["problem_name"] = str(problems[0].problem_name)

            serialzier = SubmissionSerializer(data=data)
            if serialzier.is_valid():
                serialzier.save()
                return Response(data, status=status.HTTP_201_CREATED)
        return Response(error, status=status.HTTP_400_BAD_REQUEST)


class SubmissionDetailsListView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = SubmissionDetails.objects.all()
    serializer_class = SubmissionDetailsSerializer
