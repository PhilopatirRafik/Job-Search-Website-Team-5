
const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");

const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
const job = jobs.find(j => j.id === jobId);

const container = document.querySelector(".job-details-container");

if (!job || job.status !== "open") {

    container.innerHTML = `
        <p style="color:red; font-size:18px;">
            This job is not available or does not exist.
        </p>
    `;

} else {

    container.innerHTML = `
        <div class="job-card">
            <h2>${job.title}</h2>

            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Experience:</strong> ${job.years} years</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
            <p><strong>Status:</strong> ${job.status}</p>

            <p>${job.description}</p>

            <button id="applyBtn" class="apply-btn">
                Apply Now
            </button>
        </div>
    `;

    document.getElementById("applyBtn").addEventListener("click", function () {
        localStorage.setItem("selectedJobId", job.id);
        window.location.href = "apply_job.html";
    });
}
