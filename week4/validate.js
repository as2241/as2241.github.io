const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// Function to mark the input as successful
function markAsSuccess(inputElement) {
  const inputControl = inputElement.parentElement;
  inputControl.classList.remove("error");
  inputControl.classList.add("success");
}

// Function to mark the input as erroneous
function markAsError(inputElement, errorElement, errorMessage) {
  const inputControl = inputElement.parentElement;
  inputControl.classList.remove("success");
  inputControl.classList.add("error");
  errorElement.innerText = errorMessage;
}

// Function to validate the username
function validateUsername() {
  if (username.value.trim() === "") {
    markAsError(username, usernameError, "Username cannot be empty");
    return false;
  } else {
    usernameError.innerText = "";
    markAsSuccess(username);
    return true;
  }
}

// Function to validate the email
function validateEmail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === "") {
    markAsError(email, emailError, "Email cannot be empty");
    return false;
  } else if (!emailRegex.test(email.value)) {
    markAsError(email, emailError, "Invalid email format");
    return false;
  } else {
    emailError.innerText = "";
    markAsSuccess(email);
    return true;
  }
}

// Function to validate the password
function validatePassword() {
  if (password.value.trim() === "") {
    markAsError(password, passwordError, "Password cannot be empty");
    return false;
  } else if (password.value.length < 8) {
    markAsError(
      password,
      passwordError,
      "Password must be at least 8 characters long"
    );
    return false;
  } else {
    passwordError.innerText = "";
    markAsSuccess(password);
    return true;
  }
}

// Function to validate the confirm password
function validateConfirmPassword() {
  if (confirmPassword.value.trim() === "") {
    markAsError(
      confirmPassword,
      confirmPasswordError,
      "Password cannot be empty"
    );
    return false;
  } else if (confirmPassword.value !== password.value) {
    markAsError(
      confirmPassword,
      confirmPasswordError,
      "Passwords do not match"
    );
    return false;
  } else {
    confirmPasswordError.innerText = "";
    markAsSuccess(confirmPassword);
    return true;
  }
}

// Event listeners for input field validation on blur
username.addEventListener("blur", validateUsername);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);

// Function to validate the entire form
function validateForm() {
  const isValidUsername = validateUsername();
  const isValidEmail = validateEmail();
  const isValidPassword = validatePassword();
  const isValidConfirmPassword = validateConfirmPassword();

  return (
    isValidUsername && isValidEmail && isValidPassword && isValidConfirmPassword
  );
}

document
  .getElementById("submitBtn")
  .addEventListener("click", function (event) {
    if (validateForm()) {
      event.preventDefault();
      alert("Form submitted successfully!");
    }
  });
