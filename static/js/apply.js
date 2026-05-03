// ================= LOAD JOBS =================
const urlParams = new URLSearchParams(window.location.search);
const preSelectedId = urlParams.get('id');

function resetForm() {
  let jobValue = document.getElementById("jobSelect").value;
  document.getElementById("applyForm").reset();
  document.getElementById("jobSelect").value = jobValue;
  }
  
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const preSelectedId = urlParams.get('id');  
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  let applications = JSON.parse(localStorage.getItem("applications")) || [];
  let select = document.getElementById("jobSelect");

  if (jobs.length === 0) {
    let option = document.createElement("option");
    option.textContent = "No jobs available";
    option.disabled = true;
    select.appendChild(option);
    return;
  }

    let job = jobs.find(j => j.id === preSelectedId);
    if (job) {
    select.value = job.title + " - " + job.company;
    } else {
    select.value = "No job selected";
    }
  jobs.forEach((job, index) => {
    let option = document.createElement("option");
    option.value = job.id;
    let isApplied = applications.some(app => String(app.jobIndex) === String(index));
    
    let isClosed = (job.status === "Closed" || job.status === "closed");

    if (isApplied) {
        option.textContent = job.title + " - " + job.company + " (Already Applied)";
        option.disabled = true;
    } else if (isClosed) {
        option.textContent = job.title + " - " + job.company + " (Closed)";
        option.disabled = true;
    } else {
        option.textContent = job.title + " - " + job.company;
    }

    select.appendChild(option);
  });
};

// ================= FORM SUBMIT =================
document.getElementById("applyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // values
  let jobId = preSelectedId;
  let fullname = document.getElementById("fullname").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let experience = document.getElementById("experience").value;
  let cv = document.getElementById("cv").value.trim();
  let cover = document.getElementById("cover_letter").value.trim();

  // error elements
  let nameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");

  // reset errors
  nameError.textContent = "";
  emailError.textContent = "";

  // ================= VALIDATION =================

  if (!jobId) {
    alert("Please select a job!");
    return;
  }

  if (fullname.length < 3) {
    nameError.textContent = "Name must be at least 3 characters";
    return;
  }

  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    emailError.textContent = "Enter a valid email";
    return;
  }

  if (experience < 0) {
    alert("Experience cannot be negative");
    return;
  }

  // ================= SAVE =================

  let applications = JSON.parse(localStorage.getItem("applications")) || [];

  applications.push({
    jobId: jobId,
    fullname: fullname,
    email: email,
    phone: phone,
    experience: experience,
    cv: cv,
    cover_letter: cover,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("applications", JSON.stringify(applications));

  // ================= SUCCESS =================

  let successMsg = document.getElementById("successMsg");
  successMsg.style.display = "block";

  // reset form
  document.getElementById("applyForm").reset();

  // redirect
  setTimeout(() => {
    window.location.href = window.location.origin + "/applied-jobs/";
  }, 1500);
});