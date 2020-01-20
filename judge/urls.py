from django.urls import path, include
from .views import VerdictListView, SubmissionDetailsListView, SubmissionListView
from rest_framework import routers

router = routers.DefaultRouter()

router.register(r'verdict', VerdictListView)
#router.register(r'submissions', SubmissionListView, basename='SubmissionList')
router.register(r'submissionsdetails', SubmissionDetailsListView)
urlpatterns = [
    path('', include(router.urls)),
    path('submissions/', SubmissionListView.as_view()),
]
'''
       path('programminglanguage/',ProgrammingLanguageListView.as_view()),
       path('verdict/',VerdictListView.as_view()),
       path('submissions/',SubmissionListView.as_view()),
       path('submissionsdetails/',SubmissionDetailsListView.as_view()),
   '''
