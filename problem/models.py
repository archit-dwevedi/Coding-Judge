from django.db import models
from django.contrib.auth.models import User


class Problem(models.Model):
    LEVEL = (('E', 'Easy'), ('M', 'Medium'), ('H', 'Hard'),)
    problem_name = models.CharField(max_length=100, unique=True)
# problem_id
   # author = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    problem_statement = models.TextField()
    input_format = models.TextField()
    output_format = models.TextField()
    time_limit = models.IntegerField()
    memory_limit = models.IntegerField()
    testcase_input = models.TextField(null=True)
    testcase_output = models.TextField(null=True)
    problem_level = models.CharField(max_length=1, choices=LEVEL)
    maximum_marks = models.IntegerField()

    def __str__(self):
        return self.problem_name


class TestCase(models.Model):
    test_case = models.FileField(upload_to='TestCases/', null=True, blank=True)
    uploaded_at = models.DateTimeField(
        auto_now_add=True, null=True, blank=True)
    problem = models.ForeignKey(
        Problem, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return str(self.id) + " " + str(self.problem)
