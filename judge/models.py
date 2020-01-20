from django.db import models
from problem.models import TestCase, Problem
from django.contrib.auth.models import User


class Verdict(models.Model):
    VERDICT = (('A', 'Accepted'), ('WA', 'Wrong Answer'),
               ('CE', 'Compilation Error'), ('SF', 'Segmentation Fault'),)
    status_code = models.CharField(max_length=2, choices=VERDICT)
    message = models.CharField(max_length=100)

    def __str__(self):
        return self.status_code


class Submission(models.Model):
    #unique_slug = models.CharField(max_length=50)
    LANGUAGES = (('Python', 'Python'), ('C++', 'C++'),
                 ('Java', 'Java'), ('C', 'C'))
    verdict = models.ForeignKey(
        Verdict, on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, blank=True, null=True)
    username = models.CharField(max_length=20, blank=True, null=True)
    language = models.CharField(max_length=7, choices=LANGUAGES)
    problems = models.ForeignKey(
        Problem, on_delete=models.SET_NULL, blank=True, null=True)
    problem_name = models.CharField(max_length=50, blank=True, null=True)
    code = models.TextField(max_length=10000)


class SubmissionDetails(models.Model):
    ISCORRECT = (('P', 'Passed'), ('F', 'Failed'),)
    submission_details = models.ForeignKey(
        Submission, on_delete=models.CASCADE)
    testcase_id = models.ForeignKey(TestCase, on_delete=models.CASCADE)
    iscorrect = models.CharField(max_length=1, choices=ISCORRECT)
