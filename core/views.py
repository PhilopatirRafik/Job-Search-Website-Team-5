from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User 

def home(request):
    return render(request, 'index.html')

# Admin
def admin_dashboard(request):
    return render(request, 'admin_dashboard.html')

def admin_jobs_list(request):
    return render(request, 'admin_jobs_list.html')

def add_job(request):
    return render(request, 'add_job.html')

def edit_job(request):
    return render(request, 'edit_job.html')

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
        p_pass = request.POST.get('password')
        u_type = request.POST.get('user-type')
        
        if u_name and p_pass:
            user = User.objects.create_user(username=u_name, password=p_pass)
            
            if u_type == 'Employer':
                user.is_staff = True
                user.save()
                
            return redirect('login') 
            
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