window.onload = async function () {
  let tableBody = document.getElementById("tableBody");

  try {
    const response = await fetch("/api/applications/");
    const applications = await response.json();

    if (applications.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='5'>No applications found</td></tr>";
      return;
    }

    applications.forEach((app) => {
      let row = `
        <tr>
          <td>${app.job_title} - ${app.company}</td>
          <td>${app.fullname}</td>
          <td>${app.email}</td>
          <td>${app.experience}</td>
          <td class="actions">
            <a href="#" class="delete" onclick="deleteApplication(${app.id})">Delete</a>
          </td>
        </tr>
      `;

      tableBody.innerHTML += row;
    });

  } catch (error) {
    tableBody.innerHTML = "<tr><td colspan='5'>Error loading applications</td></tr>";
  }
};


async function deleteApplication(appId) {
  if (confirm("Are you sure you want to delete this application?")) {
    try {
      const response = await fetch(`/api/applications/delete/${appId}/`, {
        method: "DELETE"
      });

      if (response.ok) {
        location.reload();
      } else {
        alert("Failed to delete application");
      }

    } catch (error) {
      alert("Server error");
    }
  }
}
