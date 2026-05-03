document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addJobForm');
    const successMsg = document.getElementById('successMessage');

    function showError(inputId, errorId, message) {
        document.getElementById(errorId).textContent = message;
        document.getElementById(inputId).classList.add('error');
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(err => err.textContent = '');
        const inputs = document.querySelectorAll('.error');
        inputs.forEach(inp => inp.classList.remove('error'));
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors();

        const title = document.getElementById('job-title').value.trim();
        const salary = document.getElementById('salary').value;
        const company = document.getElementById('company').value.trim();
        const years = document.getElementById('years').value;
        const description = document.getElementById('description').value.trim();
        const status = document.getElementById('status').value;

        let isValid = true;

        if (title === '') {
            showError('job-title', 'titleError', 'Job title is required');
            isValid = false;
        } else if (title.length < 3) {
            showError('job-title', 'titleError', 'Job title must be at least 3 characters');
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
            const newJob = {
                id: 'job_' + Date.now().toString().slice(-6),
                title: title,
                salary: parseFloat(salary),
                company: company,
                status: status,
                years: parseInt(years),
                description: description,
                dateAdded: new Date().toISOString()
            };

            let jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
            jobs.push(newJob);
            localStorage.setItem('jobs', JSON.stringify(jobs));

            successMsg.style.display = 'block';
            form.reset();
            clearErrors();

            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        }
    });
});
