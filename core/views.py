from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User 
from django.db import IntegrityError
from django.http import JsonResponse
from .models import Job, Application
from django.views.decorators.csrf import csrf_exempt 
from django.shortcuts import get_object_or_404    
import json 


def home(request):
    return render(request, 'index.html')

# Admin
def admin_dashboard(request):
    return render(request, 'admin_dashboard.html')

def admin_jobs_list(request):
    return render(request, 'admin_jobs_list.html')

def add_job(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        salary = request.POST.get('salary')
        company = request.POST.get('company')
        status = request.POST.get('status')
        years = request.POST.get('years')
        description = request.POST.get('description')

        Job.objects.create(
            title=title,
            salary=salary,
            company=company,
            status=status,
            years=years,
            description=description
        )
        return redirect('admin_jobs_list')
    return render(request, 'add_job.html')

def edit_job(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    if request.method == 'POST':
        job.title = request.POST.get('title')
        job.salary = request.POST.get('salary')
        job.company = request.POST.get('company')
        job.status = request.POST.get('status')
        job.years = request.POST.get('years')
        job.description = request.POST.get('description')
        job.save()
        return redirect('admin_jobs_list')
    return render(request, 'edit_job.html', {'job': job})

# User
def search_jobs(request):
    return render(request, 'search_jobs.html')

def job_details(request):
    return render(request, 'job_details.html')

def job_results(request):
    return render(request, 'job_results.html')

def apply_job(request):
    return render(request, 'apply_job.html')

def user_applied_jobs(request):
    return render(request, 'user_applied_jobs.html')

# Auth

def signup(request):
    if request.method == 'POST':
        u_name = request.POST.get('username')
        u_email = request.POST.get('email')
        p_pass = request.POST.get('password')
        confirm_p = request.POST.get('confirm_password')
        u_type = request.POST.get('user-type')
        
        if u_name and u_email and p_pass and confirm_p:
            if p_pass == confirm_p:
                try:
                    user = User.objects.create_user(username=u_name, email=u_email, password=p_pass)
                except IntegrityError:
                    return render(request, 'signup.html', {'error': 'Username or email already exists'})

                if u_type == 'Employer':
                    user.is_staff = True
                    user.save()
                return redirect('login')
            else:
                return render(request, 'signup.html', {'error': 'Passwords do not match'})
        else:
            return render(request, 'signup.html', {'error': 'Please fill in all fields'})
                         
    return render(request, 'signup.html')


def login_view(request):
    if request.method == 'POST':
        u_name = request.POST.get('username')
        p_pass = request.POST.get('password')
        
        user = authenticate(request, username=u_name, password=p_pass)
        
        if user is not None:
            auth_login(request, user)
            if user.is_staff:
                return redirect('admin_dashboard')
            else:
                return redirect('search_jobs')
        else:
            return render(request, 'login.html', {'error': 'Invalid Username or Password'})
            
    return render(request, 'login.html')

    # Dashboard API (for add job persone replace Job variable with the actual variable name)
def dashboard_stats(request):
    jobs = Job.objects.all()

    total = jobs.count()
    open_jobs = jobs.filter(status='open').count()
    closed_jobs = jobs.filter(status='closed').count()

    return JsonResponse({
        "total": total,
        "open": open_jobs,
        "closed": closed_jobs
    })

# Job list API (for add job replace persone Job variable with the actual variable name)
def get_jobs(request):
    jobs = list(Job.objects.values())
    return JsonResponse(jobs, safe=False)


@csrf_exempt
def delete_job(request, job_id):
    if request.method == "DELETE":
        try:
            job = Job.objects.get(id=job_id)
            job.delete()
            return JsonResponse({"message": "Job deleted"})
        except Job.DoesNotExist:
            return JsonResponse({"error": "Job not found"}, status=404)

    return JsonResponse({"error": "Invalid request"}, status=400)


def search_jobs_api(request): 
    title = request.GET.get('title')
    exp = request.GET.get('experience')
    jobs = Job.objects.filter(status='open')
    if title:
        jobs = jobs.filter(title__icontains=title)
    if exp:
        jobs = jobs.filter(years__lte=exp)
    jobs_data = list(jobs.values())
    return JsonResponse(jobs_data, safe=False)


def job_details_api(request , job_id): 
    job = get_object_or_404(Job, id=job_id)
    data = {
        "id": job.id,
        "title": job.title,
        "salary": job.salary,
        "company": job.company,
        "status": job.status,
        "years": job.years,
        "description": job.description
    }
    return JsonResponse(data)
# ================= APPLICATION APIs =================

@csrf_exempt
def submit_application(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            job = Job.objects.get(id=data.get("jobId"))

            application = Application.objects.create(
                job=job,
                fullname=data.get("fullname"),
                email=data.get("email"),
                phone=data.get("phone"),
                experience=data.get("experience") or 0,
                cv=data.get("cv"),
                cover_letter=data.get("cover_letter")
            )

            return JsonResponse({
                "message": "Application submitted successfully",
                "id": application.id
            })

        except Job.DoesNotExist:
            return JsonResponse({"error": "Job not found"}, status=404)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)


def get_applications(request):
    applications = Application.objects.all().select_related('job')

    data = []

    for app in applications:
        data.append({
            "id": app.id,
            "job_title": app.job.title,
            "company": app.job.company,
            "fullname": app.fullname,
            "email": app.email,
            "experience": app.experience,
            "date": app.date
        })

    return JsonResponse(data, safe=False)


@csrf_exempt
def delete_application(request, app_id):
    if request.method == "DELETE":
        try:
            application = Application.objects.get(id=app_id)
            application.delete()
            return JsonResponse({"message": "Application deleted successfully"})

        except Application.DoesNotExist:
            return JsonResponse({"error": "Application not found"}, status=404)

    return JsonResponse({"error": "Invalid request"}, status=400)
