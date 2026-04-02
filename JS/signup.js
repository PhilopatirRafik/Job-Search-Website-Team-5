document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;

  // validation
  if (password !== confirmPassword) {
    alert("No passwords matching");
    return;
  }

  // get existing users
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // check if user exists
  let userExists = users.find((user) => user.email === email);

  if (userExists) {
    alert("User already exists");
    return;
  }

  // save user
  users.push({ username, email, password });

  localStorage.setItem("users", JSON.stringify(users));

  // redirect to login
  window.location.href = "../index.html";
});
