from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('admin-db/', views.admin_dashboard, name='admin_dashboard'),
    path('admin-jobs/', views.admin_jobs_list, name='admin_jobs_list'),
    path('add-job/', views.add_job, name='add_job'),
    path('edit-job/', views.edit_job, name='edit_job'),
    path('search/', views.search_jobs, name='search_jobs'),
    path('details/', views.job_details, name='job_details'),
    path('results/', views.job_results, name='job_results'),
    path('apply/', views.apply_job, name='apply_job'),
    path('applied-jobs/', views.user_applied_jobs, name='user_applied_jobs'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup, name='signup'),
]