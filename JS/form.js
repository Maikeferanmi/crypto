// On form submit, save name, email, and account address to localStorage
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.signup-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const address = document.getElementById('account-address').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Basic password match validation
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }

            // Multi-user support: store users as array in localStorage
            let users = JSON.parse(localStorage.getItem('cryptonest_users') || '[]');
            // Prevent duplicate email
            if (users.some(u => u.email === email)) {
                alert('An account with this email already exists. Please use a different email.');
                return;
            }
            const user = {
                name,
                email,
                address,
                phone,
                password
            };
            users.push(user);
            localStorage.setItem('cryptonest_users', JSON.stringify(users));

            alert('Sign up successful, please login.');
            window.location.href = 'login.html';
        });
    }
});
