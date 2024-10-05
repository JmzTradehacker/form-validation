// Display Error
const registrationForm = document.getElementById('registration');
const loginForm = document.getElementById('login');
const errorDisplay = document.getElementById('errorDisplay');

//Helper function
function displayError(message) {
    errorDisplay.style.display = 'block';
    errorDisplay.textContent = message;
}
//Helper function
function clearError() {
    errorDisplay.style.display = 'none';
    errorDisplay.textContent = '';
}

// Focus on the field where validation fails
function focusOnField(field) {
    field.focus();
}

//////////Registration Form Validation//////////

function validateUsername(username) {
    const uniqueChars = new Set(username);
    const validChars = /^[a-zA-Z0-9]+$/;

    if (username === '') {
        displayError('Username cannot be blank.');
        return false;
    }

    if (username.length < 4) {
        displayError('Username must be at least 4 characters long.');
        return false;
    }

    if (uniqueChars.size < 2) {
        displayError('Username must contain at least two unique characters.');
        return false;
    }

    if (!validChars.test(username)) {
        displayError('Username cannot contain special characters or whitespace.');
        return false;
    }

    clearError();
    return true;
}

//////////Email Validation//////////
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const domainPattern = /@example\.com$/;

    if (!emailPattern.test(email)) {
        displayError('Please enter a valid email address.');
        return false;
    }

    if (domainPattern.test(email)) {
        displayError('Email cannot be from example.com domain.');
        return false;
    }

    clearError();
    return true;
}

//////////Password Validation//////////
function validatePassword(password, passwordCheck, username) {
    const minLength = 12;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasNumber = /\d/;
    const hasSpecial = /[\W_]/;

    if (password.length < minLength) {
        displayError('Password must be at least 12 characters long.');
        return false;
    }

    if (!hasUppercase.test(password)) {
        displayError('Password must contain at least one uppercase letter.');
        return false;
    }

    if (!hasLowercase.test(password)) {
        displayError('Password must contain at least one lowercase letter.');
        return false;
    }

    if (!hasNumber.test(password)) {
        displayError('Password must contain at least one number.');
        return false;
    }

    if (!hasSpecial.test(password)) {
        displayError('Password must contain at least one special character.');
        return false;
    }

    if (password.toLowerCase().includes('password')) {
        displayError('Password cannot contain the word "password".');
        return false;
    }

    if (password.includes(username)) {
        displayError('Password cannot contain the username.');
        return false;
    }

    if (password !== passwordCheck) {
        displayError('Passwords do not match.');
        return false;
    }

    clearError();
    return true;
}

//////////Terms & Conditions Validation//////////
function validateTerms(terms) {
    if (!terms.checked) {
        displayError('You must accept the terms and conditions.');
        return false;
    }

    clearError();
    return true;
}

//////////Store User Data//////////
function storeUser(username, email, password) {
    const user = {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: password
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if username exists
    if (users.some(user => user.username === username.toLowerCase())) {
        displayError('That username is already taken.');
        return false;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

/////////////Event Listeners///////////

registrationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = registrationForm.username.value.trim();
    const email = registrationForm.email.value.trim();
    const password = registrationForm.password.value.trim();
    const passwordCheck = registrationForm.passwordCheck.value.trim();
    const terms = registrationForm.terms;

    if (
        validateUsername(username) &&
        validateEmail(email) &&
        validatePassword(password, passwordCheck, username) &&
        validateTerms(terms)
    ) {
        if (storeUser(username, email, password)) {
            alert('Registration successful!');
            registrationForm.reset();
            clearError();
        }
    }
});


loginForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const username = loginForm.username.value.trim().toLowerCase();
    const password = loginForm.password.value.trim();
    const persist = loginForm.persist.checked;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username);

    if (!user) {
        displayError('Username does not exist.');
        focusOnField(loginForm.username);
        return;
    }

    if (user.password !== password) {
        displayError('Incorrect password.');
        focusOnField(loginForm.password);
        return;
    }

    clearError();
    let successMessage = 'Login successful!';
    if (persist) successMessage += ' You will stay logged in.';
    alert(successMessage);
    loginForm.reset();
});