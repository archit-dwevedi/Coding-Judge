from rest_framework import serializers
from .models import Problem, TestCase


class ProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ('problem_name', 'id', 'problem_statement', 'input_format', 'testcase_input', 'testcase_output',
                  'output_format', 'time_limit', 'memory_limit', 'problem_level', 'maximum_marks')


class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = ('test_case', 'uploaded_at', 'id')
