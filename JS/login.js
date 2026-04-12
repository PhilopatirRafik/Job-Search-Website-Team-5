document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.userType === "Employer") {
        window.location.href = "admin_dashboard.html";
    } else {
        window.location.href = "search_jobs.html";
    }
  } else {
    alert("Invalid username or password");
  }
});