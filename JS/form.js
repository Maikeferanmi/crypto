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

            showCustomNotification('Sign up successful! Please login.', 'success', function() {
                window.location.href = 'login.html';
            });
        });
    }
});

// Custom notification for signup/login success
function showCustomNotification(message, type, callback) {
    const notif = document.createElement('div');
    notif.className = 'custom-notification ' + (type === 'success' ? 'notif-success' : 'notif-error');
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => { notif.classList.add('show'); }, 10);
    setTimeout(() => {
        notif.classList.remove('show');
        setTimeout(() => {
            notif.remove();
            if (typeof callback === 'function') callback();
        }, 400);
    }, 1600);
}
// Show/hide password logic
document.addEventListener('DOMContentLoaded', function() {
    const pw = document.getElementById('password');
    const pwBtn = document.getElementById('toggle-password');
    if (pw && pwBtn) {
        pwBtn.addEventListener('click', function() {
            if (pw.type === 'password') {
                pw.type = 'text';
                pwBtn.textContent = '🙈';
            } else {
                pw.type = 'password';
                pwBtn.textContent = '👁️';
            }
        });
    }
    const cpw = document.getElementById('confirm-password');
    const cpwBtn = document.getElementById('toggle-confirm-password');
    if (cpw && cpwBtn) {
        cpwBtn.addEventListener('click', function() {
            if (cpw.type === 'password') {
                cpw.type = 'text';
                cpwBtn.textContent = '🙈';
            } else {
                cpw.type = 'password';
                cpwBtn.textContent = '👁️';
            }
        });
    }
});
