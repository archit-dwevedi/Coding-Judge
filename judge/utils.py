from celery.app import task
from .models import Submission
import requests, os, base64


CREATE_SUBMISSION_URL = "https://judge0-ce.p.rapidapi.com/submissions"
LANGUAGE_MAPPER = {
    "Python": 71,
    "C++": 76,
    "Java": 62,
    "C": 48
}

@task
def run_program(submission_id):
    submission = Submission.objects.filter(id=submission_id).first()
    if not submission:
        return
    headers = {
        'content-type': 'application/json',
        'x-rapidapi-key': os.environ.get("X_RAPID_API_KEY", ""),
        'x-rapidapi-host': "judge0-ce.p.rapidapi.com"
    }
    querystring = {"base64_encoded": "true", "fields": "*", "wait": "true"}
    payload = {
        "language_id": LANGUAGE_MAPPER[submission.language] if submission.language in LANGUAGE_MAPPER else 71,
        "source_code": base64.b64encode(submission.code.encode('ascii')),
        "stdin": ""
    }

    response = requests.request("POST", CREATE_SUBMISSION_URL, data=payload, headers=headers, params=querystring)
    return response