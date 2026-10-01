from django.contrib import admin
from .models import Service, Booking

# Register your models here.
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
  list_display = ["name", "duration_minutes", "price", "active"]
  list_filter = ["duration_minutes", "active"]

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
  list_display = ["service", "customer_name", "date", "start_time", "status"]
  list_filter = ["date", "start_time"]