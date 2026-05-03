const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get('id');

let currentJob = null;

function showError(inputId, errorId, message) {
    document.getElementById(errorId).textContent = message;
    document.getElementById(inputId).classList.add('error');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(err => err.textContent = '');
    document.querySelectorAll('.error').forEach(inp => inp.classList.remove('error'));
}

function loadJobData() {
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    const job = jobs.find(j => j.id === jobId);

    if (job) {
        currentJob = job;

        document.getElementById('jobId').value = job.id;
        document.getElementById('jobTitle').value = job.title;
        document.getElementById('salary').value = job.salary;
        document.getElementById('company').value = job.company;
        document.getElementById('status').value = job.status;
        document.getElementById('years').value = job.years;
        document.getElementById('description').value = job.description;

    } else {
        alert('Job not found');
        window.location.href = '/admin-jobs/';
    }
}

if (!jobId) {
    alert('No job specified');
    window.location.href = '/admin-jobs/';
} else {
    loadJobData();
}

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('editJobForm');
    const successMsg = document.getElementById('successMessage');
    const deleteBtn = document.getElementById('deleteBtn');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors();

        const title = document.getElementById('jobTitle').value.trim();
        const salary = document.getElementById('salary').value;
        const company = document.getElementById('company').value.trim();
        const years = document.getElementById('years').value;
        const description = document.getElementById('description').value.trim();
        const status = document.getElementById('status').value;

        let isValid = true;

        if (title === '') {
            showError('jobTitle', 'titleError', 'Job title is required');
            isValid = false;
        } else if (title.length < 3) {
            showError('jobTitle', 'titleError', 'Job title must be at least 3 characters');
            isValid = false;
        }

        if (salary === '' || parseFloat(salary) <= 0) {
            showError('salary', 'salaryError', 'Salary must be greater than 0');
            isValid = false;
        }

        if (company === '') {
            showError('company', 'companyError', 'Company name is required');
            isValid = false;
        }

        if (years === '' || parseInt(years) < 0) {
            showError('years', 'yearsError', 'Years of experience cannot be negative');
            isValid = false;
        }

        if (description === '') {
            showError('description', 'descriptionError', 'Description is required');
            isValid = false;
        } else if (description.length < 10) {
            showError('description', 'descriptionError', 'Description must be at least 10 characters');
            isValid = false;
        }

        if (isValid) {
            let jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
            const index = jobs.findIndex(j => j.id === jobId);

            if (index !== -1) {
                jobs[index] = {
                    ...jobs[index],
                    title: title,
                    salary: parseFloat(salary),
                    company: company,
                    status: status,
                    years: parseInt(years),
                    description: description,
                    dateUpdated: new Date().toISOString()
                };

                localStorage.setItem('jobs', JSON.stringify(jobs));

                successMsg.style.display = 'block';

                setTimeout(() => {
                    successMsg.style.display = 'none';
                    window.location.href = '/admin-jobs/';
                }, 2000);
            }
        }
    });

    deleteBtn.addEventListener('click', function () {
        if (confirm('Are you sure?')) {
            let jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
            jobs = jobs.filter(job => job.id !== jobId);
            localStorage.setItem('jobs', JSON.stringify(jobs));

            alert('Deleted!');
            window.location.href = '/admin-jobs/';
        }
    });
});
