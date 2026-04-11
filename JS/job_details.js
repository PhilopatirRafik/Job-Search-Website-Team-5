// const params = new URLSearchParams(window.location.search);
// const jobId = params.get("id");

// const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
// const job = jobs.find(j => j.id === jobId);

// const container = document.querySelector(".job-details-container");

// if(job){
//     container.innerHTML = `
//     <div class="job-card">
//         <h2 class="job-title">${job.title}</h2>

//         <div class="job-info">
//             <p><strong>Company:</strong> ${job.company}</p>
//             <p><strong>Experience:</strong> ${job.years}+ years</p>
//             <p><strong>Salary:</strong> $${job.salary}</p>
//             <p><strong>Status:</strong> ${job.status}</p>
//         </div>

//         <p class="job-description">
//             ${job.description}
//         </p>

//         <div class="job-actions">
//             <a href="apply_jop.html" class="apply-btn">Apply for jop</a>
//             <a href="search_jops.html" class="back-btn">Back to search results</a>
//         </div>
//     </div>
//     `;
// }else{
//     container.innerHTML = "<p>Job not found</p>";
// }



const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");

const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
const job = jobs.find(j => j.id === jobId);

const container = document.querySelector(".job-details-container");

// لو الوظيفة مش موجودة أو مقفولة
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