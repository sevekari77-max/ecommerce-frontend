/**********************
 FORM SWITCHING
**********************/

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

document.getElementById("showSignup").onclick = () => {
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
};

document.getElementById("showLogin").onclick = () => {
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
};

/**********************
 PASSWORD TOGGLE
**********************/

document.querySelectorAll(".toggle-pass").forEach((icon) => {
  icon.addEventListener("click", () => {
    const input = document.getElementById(icon.dataset.target);

    input.type =
      input.type === "password" ? "text" : "password";
  });
});

/**********************
 VALIDATION HELPERS
**********************/

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function isStrongPassword(password) {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
}

/**********************
 LOGIN
**********************/

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.loginEmail.value;
  const password = loginForm.loginPassword.value;

  const errorEl = document.getElementById("loginError");

  if (!isValidEmail(email)) {
    errorEl.textContent = "Invalid email format";
    return;
  }

  if (!password) {
    errorEl.textContent = "Password required";
    return;
  }

  errorEl.textContent = "";

  alert("Logged in successfully (mock)");
});

/**********************
 SIGNUP
**********************/

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = signupForm.signupName.value;
  const email = signupForm.signupEmail.value;
  const password = signupForm.signupPassword.value;
  const confirm = signupForm.confirmPassword.value;

  const errorEl = document.getElementById("signupError");
  const strengthEl = document.getElementById("passwordStrength");

  if (!name) {
    errorEl.textContent = "Name required";
    return;
  }

  if (!isValidEmail(email)) {
    errorEl.textContent = "Invalid email";
    return;
  }

  if (!isStrongPassword(password)) {
    errorEl.textContent =
      "Password must include uppercase, lowercase, number (8+)";
    return;
  }

  if (password !== confirm) {
    errorEl.textContent = "Passwords do not match";
    return;
  }

  errorEl.textContent = "";
  strengthEl.textContent = "Strong password ✅";

  alert("Account created (mock)");
});
