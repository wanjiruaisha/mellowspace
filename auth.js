const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    const users = JSON.parse(localStorage.getItem("mellowspaceUsers")) || [];

    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      alert("An account with this email already exists.");
      return;
    }

    const newUser = {
      name,
      email,
      password
    };

    users.push(newUser);
    localStorage.setItem("mellowspaceUsers", JSON.stringify(users));

    alert("Account created successfully. You can now log in.");
    window.location.href = "login.html";
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    const users = JSON.parse(localStorage.getItem("mellowspaceUsers")) || [];

    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!validUser) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem("mellowspaceLoggedInUser", JSON.stringify(validUser));

    alert(`Welcome back, ${validUser.name}.`);
    window.location.href = "index.html";
  });
}