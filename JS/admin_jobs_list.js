let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

let table = document.querySelector("table");

if (jobs.length === 0) {
  table.innerHTML = "<p>No jobs available. Please add a job.</p>";
} else {

  table.innerHTML = `
  <tr>
    <th>Job ID</th>
    <th>Job Title</th>
    <th>Salary</th>
    <th>Company Name</th>
    <th>Experience</th>
    <th>Status</th>
    <th>Actions</th>
  </tr>
  `;

  jobs.forEach((job) => {
    let row = `
      <tr>
        <td>${job.id}</td>
        <td>${job.title}</td>
        <td>${job.salary}</td>
        <td>${job.company}</td>
        <td>${job.years || "-"}</td>
        <td>
          <span class="status ${job.status === "Open" ? "open" : "closed"}">
            ${job.status}
          </span>
        </td>
        <td class="actions">
          <a href="edit_job.html?id=${job.id}" class="edit">Edit</a>
          <a href="#" class="delete" data-id="${job.id}">Delete</a>
        </td>
      </tr>
    `;

    table.innerHTML += row;
  });
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.preventDefault();

    let jobId = e.target.getAttribute("data-id");

    if (confirm("Are you sure you want to delete this job?")) {

      let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

      jobs = jobs.filter(job => job.id !== jobId);

      localStorage.setItem("jobs", JSON.stringify(jobs));

      location.reload();
    }
  }
});
