// Display Error
const registrationForm = document.getElementById('registration');
const loginForm = document.getElementById('login');
const errorDisplay = document.getElementById('errorDisplay');

function displayError(message) {
    errorDisplay.style.display = 'block';
    errorDisplay.textContent = message;
}

function clearError() {
    errorDisplay.style.display = 'none';
    errorDisplay.textContent = '';
}