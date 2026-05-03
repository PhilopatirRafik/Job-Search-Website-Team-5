
window.onload = function () {

    const searchData = JSON.parse(localStorage.getItem("searchData")) || {
        title: "",
        years: 0
    };

    const titleParam = searchData.title.toLowerCase();
    const yearsParam = parseInt(searchData.years) || 0;

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const tableBody = document.getElementById("tableBody");

    let filteredJobs = jobs.filter(job =>
        job.status === "open" &&
        job.title.toLowerCase().includes(titleParam) &&
        job.years >= yearsParam
    );

    
    if (filteredJobs.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6">No jobs found or not available</td>
            </tr>
        `;
        return;
    }

    filteredJobs.forEach(job => {
        tableBody.innerHTML += `
            <tr>
                <td>${job.title}</td>
                <td>${job.company}</td>
                <td>${job.years}</td>
                <td>${job.salary}</td>
                <td>${job.status}</td>
                <td>
                    <a href="job_details.html?id=${job.id}">
                        View Details
                    </a>
                </td>
            </tr>
        `;
    });
};
