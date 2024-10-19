// Sign-up form submission handler
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let isFormValid = true;
    let username = document.getElementById('username').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let confirmPassword = document.getElementById('confirmPassword').value.trim();
    
    clearErrors();

    if (username.length < 4) {
        showError('usernameError', 'Username must be at least 4 characters');
        isFormValid = false;
    }

    if (!validateEmail(email)) {
        showError('emailError', 'Invalid email address');
        isFormValid = false;
    }

    if (!validatePassword(password)) {
        showError('passwordError', 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character');
        isFormValid = false;
    }

    if (password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match');
        isFormValid = false;
    }

    if (isFormValid) {
        alert('Signup successful!');
        document.getElementById('successMessage').textContent = 'Sign up successful!';
        document.getElementById('successMessage').classList.add('success');

        window.location.reload();
    }
});

document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('forgotPasswordModal').style.display = 'flex';
});


document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
});

document.getElementById('resetPasswordButton').addEventListener('click', function() {
    const email = document.getElementById('forgotEmail').value.trim();
    const modalMessage = document.getElementById('modalMessage');

    if (validateEmail(email)) {
        modalMessage.textContent = 'Password reset link sent to ' + email;
        modalMessage.style.color = 'green';

        setTimeout(() => {
            document.getElementById('forgotPasswordModal').style.display = 'none';
        }, 2000);
    } else {
        modalMessage.textContent = 'Please enter a valid email address.';
        modalMessage.style.color = 'red';
    }
});


function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function clearErrors() {
    const errors = document.querySelectorAll('small');
    errors.forEach(error => error.textContent = '');
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return passwordPattern.test(password);
}
