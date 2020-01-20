from django.contrib import admin
from .models import Submission,  SubmissionDetails, Verdict
# Register your models here.


admin.site.register(Submission)

admin.site.register(SubmissionDetails)
admin.site.register(Verdict)
