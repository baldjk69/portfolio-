from django.urls import path
from .views import service_list, booking_list, booking_create

urlpatterns = [
  path('services/', service_list),
  path('', booking_list),
  path('create/', booking_create),
]