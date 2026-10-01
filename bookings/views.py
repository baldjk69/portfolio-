from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Service, Booking
from .serializers import ServiceSerializer, BookingSerializer
from datetime import  date as date_cls

# Create your views here.
@api_view(['GET'])
def service_list(request):
  services = Service.objects.all()
  serializer = ServiceSerializer(services, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def booking_list(request):
  bookings = Booking.objects.all()
  serializer = BookingSerializer(bookings, many=True)
  return Response(serializer.data)

@api_view(['POST'])
def booking_create(request):
  date = request.data.get('date')
  start_time = request.data.get('start_time')

  booking_date = request.data.get('date')
  if booking_date and booking_date < str(date_cls.today()):
    return Response(
      {"success": False, "message": "Cannot book a date in the past."},
      status=status.HTTP_400_BAD_REQUEST
    )

  slot_taken = Booking.objects.filter(
    date=date,
    start_time=start_time,
    status__in = ["pending", "confirmed"]
  ).exists()

  if slot_taken:
    return Response(
      {"success": False, "message": "That time slot is already booked."},
      status=status.HTTP_409_CONFLICT
    )

  serializer = BookingSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(
       {"success": True, "message": "Booking created successfully!"},
       status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)