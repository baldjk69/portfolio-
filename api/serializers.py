from rest_framework import serializers
from .models import Project, ContactMessage, Profile

class ProjectSerializer(serializers.ModelSerializer):
  class Meta:
    model = Project
    fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
  class Meta:
    model = ContactMessage
    fields = ['name', 'email', 'message']

class ProfileSerializer(serializers.ModelSerializer):
  skills_list = serializers.SerializerMethodField()

  class Meta:
    model = Profile
    fields = [
      'name', 'title', 'bio', 'location', 'email',
      'github', 'linkedin', 'website',
      'resume', 'profile_image', 'skills', 'skills_list',
    ]

  def get_skills_list(self, obj):
    if not obj.skills:
      return []
    return [skill.strip() for skill in obj.skills.split(',') if skill.strip()]