// login.js
// Simple authentication using localStorage values set at sign up

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.login-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = document.getElementById('login-email').value.trim();
            const passwordInput = document.getElementById('login-password').value;

            // Get stored credentials (for demo: only email is checked, password is not stored)
            const storedEmail = localStorage.getItem('cryptonest_email');
            const storedPassword = localStorage.getItem('cryptonest_password');

            // For demo: store password at sign up (update form.js to do this)
            if (!storedEmail) {
                alert('No account found. Please sign up first.');
                window.location.href = 'form.html';
                return;
            }

            if (emailInput === storedEmail && passwordInput === storedPassword) {
                // Successful login
                window.location.href = 'plans.html';
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });
    }
});
