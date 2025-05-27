// login.js
// Simple authentication using localStorage values set at sign up

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.login-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = document.getElementById('login-email').value.trim();
            const passwordInput = document.getElementById('login-password').value;



            // Multi-user support: check users array in localStorage
            let users = JSON.parse(localStorage.getItem('cryptonest_users') || '[]');
            const user = users.find(u => u.email === emailInput && u.password === passwordInput);
            if (!user) {
                alert('Invalid email or password. Please try again.');
                return;
            }
            // Store current user info for session
            localStorage.setItem('cryptonest_current_user', JSON.stringify(user));
            // Show login success message then redirect
            alert('Login successful!');
            window.location.href = 'plans.html';
        });
    }
});
