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
class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    experience = models.IntegerField(default=0)
    cv = models.URLField(blank=True)
    cover_letter = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.fullname
