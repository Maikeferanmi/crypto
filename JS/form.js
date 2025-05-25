// On form submit, save name, email, and account address to localStorage
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.signup-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const address = document.getElementById('account-address').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Basic password match validation
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }

            // Save to localStorage
            localStorage.setItem('cryptonest_name', name);
            localStorage.setItem('cryptonest_email', email);
            localStorage.setItem('cryptonest_address', address);
            localStorage.setItem('cryptonest_password', password);

            // Redirect to login page after successful sign up
            window.location.href = 'login.html';
        });
    }
});
