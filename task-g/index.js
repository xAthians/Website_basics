// index.js
// Author: Aleksi Maunumäki 
// Date: 06/11/2025
// Handles user registration and appending rows to timetable

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const timestampInput = document.getElementById("timestamp");
  const tableBody = document.querySelector("#timetable tbody");

  // Clear error messages helper
  function clearErrors() {
    document.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = "";
    });
  }

  // Custom validators
  function validateName(name) {
    return name.trim().length >= 3;
  }

  function validateEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }

  function validatePhone(phone) {
    return /^\+?\d{7,15}$/.test(phone);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    // Fill timestamp automatically
    const timestamp = new Date().toLocaleString();
    timestampInput.value = timestamp;

    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const birthDate = form.birthDate.value;
    const termsAccepted = form.terms.checked;

    let valid = true;

    // Validate name
    if (!validateName(fullName)) {
      document.getElementById("nameError").textContent =
        "Full name must be at least 3 characters.";
      valid = false;
    }

    // Validate email
    if (!validateEmail(email)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address.";
      valid = false;
    }

    // Validate phone
    if (!validatePhone(phone)) {
      document.getElementById("phoneError").textContent =
        "Phone number must be 7–15 digits (numbers only).";
      valid = false;
    }

    // Validate date
    if (!birthDate) {
      document.getElementById("dateError").textContent =
        "Please select your birth date.";
      valid = false;
    }

    // Validate terms checkbox
    if (!termsAccepted) {
      document.getElementById("termsError").textContent =
        "You must accept the terms and conditions.";
      valid = false;
    }

    // Stop if invalid
    if (!valid) return;

    // Create and append new table row
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${timestamp}</td>
      <td>${fullName}</td>
      <td>${email}</td>
      <td>${phone}</td>
      <td>${birthDate}</td>
    `;
    tableBody.appendChild(row);

    // Reset form
    form.reset();
  });

  // Clear error messages on reset
  form.addEventListener("reset", clearErrors);
});
