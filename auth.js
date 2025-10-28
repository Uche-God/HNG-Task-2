const form = document.getElementById("login-form");

// Test user
const testUser = { username: "admin", password: "12345" };

form.addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (username === testUser.username && password === testUser.password) {
    localStorage.setItem("ticketapp_session", "loggedin");
    window.location.href = "ticket-management.html";
  } else {
    alert("Invalid username or password");
  }
});
