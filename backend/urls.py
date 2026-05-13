from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('admin-db/', views.admin_dashboard, name='admin_dashboard'),
    path('api/dashboard/', views.dashboard_stats),
    path('admin-jobs/', views.admin_jobs_list, name='admin_jobs_list'),
    path('api/jobs/', views.get_jobs, name='get_jobs'),
    path('api/jobs/<int:job_id>/', views.delete_job, name='delete_job'),
    path('add-job/', views.add_job, name='add_job'),
    path('edit-job/', views.edit_job, name='edit_job'),
    path('search/', views.search_jobs, name='search_jobs'),
    path('details/', views.job_details, name='job_details'),
    path('results/', views.job_results, name='job_results'),
    path('apply/', views.apply_job, name='apply_job'),
    path('applied-jobs/', views.user_applied_jobs, name='user_applied_jobs'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup, name='signup'),
    path('api/jobs/search/', views.search_jobs_api, name='search_jobs_api'), 
    path('api/jobs/details/<int:job_id>/', views.job_details_api, name='job_details_api'), 
    path('api/apply/', views.submit_application, name='submit_application'),
    path('api/applications/', views.get_applications, name='get_applications'),
    path('api/applications/delete/<int:app_id>/', views.delete_application, name='delete_application'),
]
