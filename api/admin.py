from django.contrib import admin
from .models import Project, ContactMessage, Profile

# Register your models here.
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
  list_display = ('title', 'technology', 'featured', 'order', 'created_at')
  list_filter = ('featured', 'technology')
  search_fields = ('title', 'description')
  list_editable = ('featured', 'order')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
  list_display = ('name', 'email', 'is_read', 'created_at')
  list_filter = ('is_read', 'created_at')
  search_fields = ('name', 'email', 'message')
  readonly_fields = ('name', 'email', 'message', 'created_at')

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
  list_display = ('name', 'title', 'email')