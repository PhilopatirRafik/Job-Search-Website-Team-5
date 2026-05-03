let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

let totalJobs = document.createElement("p");
totalJobs.innerText = "Total Jobs: " + jobs.length;

let openJobs = document.createElement("p");
let openCount = jobs.filter(job => job.status === "open").length;
openJobs.innerText = "Open Jobs: " + openCount;

let closedJobs = document.createElement("p");
let closedCount = jobs.filter(job => job.status === "closed").length;
closedJobs.innerText = "Closed Jobs: " + closedCount;

let container = document.querySelector(".dashboard-container");

container.appendChild(totalJobs);
container.appendChild(openJobs);
container.appendChild(closedJobs);

[totalJobs, openJobs, closedJobs].forEach(el => {
  el.style.marginTop = "10px";
});
