from rest_framework import serializers
from .models import Submission, SubmissionDetails, Verdict


class VerdictSerializer(serializers.ModelSerializer):
    class Meta:
        model = Verdict
        fields = ('status_code', 'message')


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ('id', 'verdict', 'username', 'problem_name',
                  'language', 'user', 'problems', 'code')


class SubmissionDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmissionDetails
        fields = ('submission_details', 'testcase_id', 'iscorrect')
