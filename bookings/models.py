from django.db import models

# Create your models here.
class Service(models.Model):
  name = models.CharField(max_length=100)
  duration_minutes = models.IntegerField()
  price = models.FloatField()
  active = models.BooleanField()

  def __str__(self):
    return self.name

class Booking(models.Model):
  service = models.ForeignKey(
    Service,
    on_delete=models.CASCADE
  )

  customer_name = models.CharField(max_length=100)
  customer_email = models.EmailField(blank=True, null=True)
  date = models.DateField()
  start_time = models.TimeField()
  status = models.CharField(
    choices=[
      ("pending", "Pending"), 
      ("confirmed", "Confirmed"), ("cancelled", "Cancelled")
    ],
    default="pending"
  )
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.status

  class Meta:
    unique_together = ('date', 'start_time')