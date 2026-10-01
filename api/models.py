from django.db import models

# Create your models here.
class Project(models.Model):
  title = models.CharField(max_length=200)
  description = models.TextField()
  technology = models.CharField(max_length=100)
  github_url = models.URLField(blank=True, null=True)
  live_url = models.URLField(blank=True, null=True)
  image = models.URLField(blank=True, null=True)
  created_at = models.DateTimeField(auto_now_add=True)
  featured = models.BooleanField(default=False)
  order = models.PositiveIntegerField(default=0)

  class Meta:
    ordering = ['order', '-created_at']

  def __str__(self):
    return self.title

class ContactMessage(models.Model):
  name = models.CharField(max_length=100)
  email = models.EmailField()
  message = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  is_read = models.BooleanField(default=False)

  class Meta:
    ordering = ['-created_at']

  def __str__(self):
    return f"Message from {self.name} ({self.email})"

class Profile(models.Model):
  name = models.CharField(max_length=100)
  title = models.CharField(max_length=200, help_text="e.g. Full-Stack Developer")
  bio = models.TextField()
  location = models.CharField(max_length=100, blank=True)
  email = models.EmailField(blank=True)
  github = models.URLField(blank=True)
  linkedin = models.URLField(blank=True)
  twitter = models.URLField(blank=True)
  website = models.URLField(blank=True)
  resume = models.URLField(blank=True, help_text="Link to your CV/Resume") 
  profile_image = models.URLField(blank=True, help_text="URL to your profile picture")
  skills = models.TextField(
    blank=True,
    help_text="Comma-separated lists of skills (e.g. React, Django, Python, Tailwind)"
  )

  def __str__(self):
    return self.name

  class Meta:
    verbose_name = "Profile"
    verbose_name_plural = "Profile"

