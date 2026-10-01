from django.urls import path
from .views import hello, project_list, contact_create, profile_detail

urlpatterns = [
  path('hello/', hello),
  path('projects/', project_list),
  path('contact/', contact_create),
  path('profile/', profile_detail),
]