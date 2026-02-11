import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
 HELPERS
**********************/

function showError(el, msg) {
  el.textContent = msg;
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

/**********************
 SIGNUP
**********************/

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = signupForm.signupName.value.trim();
  const email = signupForm.signupEmail.value.trim();
  const password = signupForm.signupPassword.value;
  const confirm = signupForm.confirmPassword.value;

  const errorEl = document.getElementById("signupError");

  if (!name || !email || !password) {
    showError(errorEl, "All fields required");
    return;
  }

  if (password !== confirm) {
    showError(errorEl, "Passwords do not match");
    return;
  }

  try {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    window.location.href = "index.html";
  } catch (err) {
    showError(errorEl, err.message);
  }
});

/**********************
 LOGIN
**********************/

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.loginEmail.value.trim();
  const password = loginForm.loginPassword.value;

  const errorEl = document.getElementById("loginError");

  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    window.location.href = "index.html";
  } catch (err) {
    showError(errorEl, err.message);
  }
});

/**********************
 AUTH STATE
**********************/

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in:", user.email);
  }
});

/**********************
 LOGOUT (FOR HEADER LATER)
**********************/

window.logoutUser = async function () {
  await signOut(auth);
  window.location.href = "auth.html";
};
