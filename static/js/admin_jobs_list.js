let table = document.querySelector("table");

fetch("/api/jobs/")
    .then(res => res.json())
    .then(jobs => {

        if (jobs.length === 0) {
            table.innerHTML = "<p>No jobs available.</p>";
            return;
        }

        table.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Salary</th>
        <th>Company</th>
        <th>Experience</th>
        <th>Status</th>
        <th>Actions</th>
      </thead>
    `;

        jobs.forEach(job => {
            let row = `
        <tr>
          <td>${job.id}</td>
          <td>${job.title}</td>
          <td>${job.salary || "-"}</td>
          <td>${job.company}</td>
          <td>${job.years || "-"}</td>
          <td>
            <span class="status ${job.status === "open" ? "open" : "closed"}">
              ${job.status}
            </span>
          </td>
          <td class="actions">
            <a href="/edit-job/${job.id}/" class="edit">Edit</a>
            <button onclick="deleteJob(${job.id})" class="delete">Delete</button>
          </td>
        </tr>
      `;
            table.innerHTML += row;
        });

    })
    .catch(err => console.log(err));

// ❌ Delete job
function deleteJob(id) {
    if (!confirm("Are you sure you want to delete this job?")) return;

    fetch(`/api/jobs/${id}/`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            alert(data.message || "Deleted");
            location.reload();
        })
        .catch(err => console.log(err));
}
