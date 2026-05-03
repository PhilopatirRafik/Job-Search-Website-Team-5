window.onload = function () {
  let applications = JSON.parse(localStorage.getItem("applications")) || [];
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  let tableBody = document.getElementById("tableBody");

  if (applications.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='5'>No applications found</td></tr>";
    return;
  }

  applications.forEach((app, index) => {
    let job = jobs.find(j => j.id === app.jobId);
    let row = `
      <tr>
        <td>${job ? job.title + " - " + job.company : "Unknown Job"}</td>
        <td>${app.fullname}</td>
        <td>${app.email}</td>
        <td>${app.experience}</td>
        <td class="actions">
          <a href="#" class="delete" onclick="deleteApplication(${index})">Delete</a>
        </td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });
};

function deleteApplication(index) {
  let applications = JSON.parse(localStorage.getItem("applications")) || [];

  if (confirm("Are you sure you want to delete this application?")) {
    applications.splice(index, 1);
    localStorage.setItem("applications", JSON.stringify(applications));
    location.reload();
  }
}