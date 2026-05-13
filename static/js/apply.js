// ================= URL PARAM =================
const urlParams = new URLSearchParams(window.location.search);
const preSelectedId = urlParams.get('id');

function resetForm() {
  let jobValue = document.getElementById("jobSelect").value;
  document.getElementById("applyForm").reset();
  document.getElementById("jobSelect").value = jobValue;
}


// ================= LOAD JOB =================
window.onload = async function () {
  let select = document.getElementById("jobSelect");

  if (!preSelectedId) {
    select.value = "No job selected";
    return;
  }

  try {
    const response = await fetch(`/api/jobs/details/${preSelectedId}/`);
    const job = await response.json();

    if (job.id) {
      select.value = job.title + " - " + job.company;
    } else {
      select.value = "No job selected";
    }

  } catch (error) {
    select.value = "Error loading job";
  }
};


// ================= FORM SUBMIT =================
document.getElementById("applyForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  let fullname = document.getElementById("fullname").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let experience = document.getElementById("experience").value;
  let cv = document.getElementById("cv").value.trim();
  let cover = document.getElementById("cover_letter").value.trim();

  let nameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");

  nameError.textContent = "";
  emailError.textContent = "";

  // validation
  if (!preSelectedId) {
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

  // send to django backend
  try {
    const response = await fetch("/api/apply/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jobId: preSelectedId,
        fullname: fullname,
        email: email,
        phone: phone,
        experience: experience,
        cv: cv,
        cover_letter: cover
      })
    });

    const result = await response.json();

    if (response.ok) {
      let successMsg = document.getElementById("successMsg");
      successMsg.style.display = "block";

      document.getElementById("applyForm").reset();

      setTimeout(() => {
        window.location.href = "/applied-jobs/";
      }, 1500);

    } else {
      alert(result.error || "Something went wrong");
    }

  } catch (error) {
    alert("Server error");
  }
});
