fetch("/api/dashboard/")
  .then(res => res.json())
  .then(data => {

    let container = document.querySelector(".dashboard-container");

    let totalJobs = document.createElement("p");
    totalJobs.innerText = "Total Jobs: " + data.total;

    let openJobs = document.createElement("p");
    openJobs.innerText = "Open Jobs: " + data.open;

    let closedJobs = document.createElement("p");
    closedJobs.innerText = "Closed Jobs: " + data.closed;

    container.appendChild(totalJobs);
    container.appendChild(openJobs);
    container.appendChild(closedJobs);

    [totalJobs, openJobs, closedJobs].forEach(el => {
      el.style.marginTop = "10px";
    });

  })
  .catch(err => console.log(err));
