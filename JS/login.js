
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
                showCustomNotification('Invalid email or password. Please try again.', 'error');
                return;
            }
            // Store current user info for session
            localStorage.setItem('cryptonest_current_user', JSON.stringify(user));
            // Show login success message then redirect
            showCustomNotification('Login successful!', 'success', function() {
                window.location.href = 'plans.html';
            });
        });
    }
});

// Custom notification for login/signup success
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
