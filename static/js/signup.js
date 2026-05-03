document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;
  
  let userType = document.querySelector('input[name="user-type"]:checked').value;

  if (password !== confirmPassword) {
    alert("No passwords matching");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let userExists = users.find((user) => user.email === email);

  if (userExists) {
    alert("User already exists");
    return;
  }

  users.push({ username, email, password, userType });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Account Created! Please Login.");
  window.location.href = "login.html";
});