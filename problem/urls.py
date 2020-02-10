from django.urls import path, include
from .views import ProblemListView, TestCaseListView
from rest_framework import routers

router = routers.DefaultRouter()                      # add this
router.register(r'problem', ProblemListView)
router.register(r'test', TestCaseListView, basename='TestCase')
urlpatterns = [
    path('', include(router.urls)),
    # path('problems/',ProblemListView.as_view()),
    # path('testcase/',TestCaseListView.as_view()),
]
