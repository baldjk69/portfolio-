from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Project, Profile
from .serializers import ProjectSerializer, ContactMessageSerializer, ProfileSerializer

# Create your views here.
@api_view(['GET'])
def hello(request):
  return Response({
    "message": "Hello from Django!",
    "status": "Backend is working",
  })

@api_view(['GET'])
def project_list(request):
  projects = Project.objects.all()
  serializer = ProjectSerializer(projects, many=True)
  return Response(serializer.data)

@api_view(['POST'])
def contact_create(request):
  serializer = ContactMessageSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(
      {"success": True, "message": "Message sent successfully!"},
      status=status.HTTP_201_CREATED
    )
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def profile_detail(request):
  profile = Profile.objects.first()
  if not profile:
    return Response({"detail": "No profile found"}, status.HTTP_404_NOT_FOUND)
  serializer = ProfileSerializer(profile)
  return Response(serializer.data)