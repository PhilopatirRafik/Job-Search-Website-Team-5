document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (user) {
    // save current user
    localStorage.setItem("currentUser", JSON.stringify(user));

    // redirect
    window.location.href = "../index.html";
  } else {
    alert("Invalid username or password");
  }
});
