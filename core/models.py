from django.db import models

# Create your models here.

class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    company = models.CharField(max_length=255)
    years = models.IntegerField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    STATUS_CHOICES = [
    ('open', 'Open'),    
    ('closed', 'Closed'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='open')
    def __str__(self):
        return self.title
