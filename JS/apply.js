// ================= LOAD JOBS =================
window.onload = function () {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  let select = document.getElementById("jobSelect");

  // لو مفيش jobs
  if (jobs.length === 0) {
    let option = document.createElement("option");
    option.textContent = "No jobs available";
    option.disabled = true;
    select.appendChild(option);
    return;
  }

  jobs.forEach((job, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = job.title + " - " + job.company;
    select.appendChild(option);
  });
};

// ================= FORM SUBMIT =================
document.getElementById("applyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // values
  let jobIndex = document.getElementById("jobSelect").value;
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

  if (jobIndex === "") {
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
    jobIndex: jobIndex,
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
    window.location.href = "user_applied_jobs.html";
  }, 1500);
});