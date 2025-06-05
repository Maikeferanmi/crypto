document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.signup-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Show spinner inside the button
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn._originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="btn-spinner" style="display:inline-block;vertical-align:middle;width:22px;height:22px;"><svg style="width:22px;height:22px;" viewBox="0 0 50 50"><circle style="fill:none;stroke:#1976d2;stroke-width:5;stroke-linecap:round;" cx="25" cy="25" r="20"></circle></svg></span> Loading...';
                const style = document.createElement('style');
                style.innerHTML = `.btn-spinner svg {animation: spinBtn 1s linear infinite;}@keyframes spinBtn{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}`;
                style.id = 'btn-spinner-style';
                document.head.appendChild(style);
            }
            const name = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            // const address = document.getElementById('account-address').value.trim(); // Hidden/disabled
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Password requirements (regex hidden for production)
            // const passwordRequirements = [
            //     { regex: /.{8,}/, message: 'at least 8 characters' },
            //     { regex: /[A-Z]/, message: 'an uppercase letter' },
            //     { regex: /[a-z]/, message: 'a lowercase letter' },
            //     { regex: /[0-9]/, message: 'a number' },
            //     { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'a special character' }
            // ];
            // const failed = passwordRequirements.filter(req => !req.regex.test(password));
            // if (failed.length > 0) {
            //     showCustomNotification('Password must contain ' + failed.map(f => f.message).join(', ') + '.', 'error');
            //     return;
            // }

            // Basic password match validation
            if (password !== confirmPassword) {
                restoreSubmitBtn();
                showCustomNotification('Passwords do not match. Please try again.', 'error', null, true);
                return;
            }

            // Firebase Auth sign up
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // Store extra info in Firestore under users collection
                    (window.db || firebase.firestore()).collection('users').doc(user.uid).set({
                        name,
                        email,
                        // address, // hidden/removed
                        phone,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        restoreSubmitBtn();
                        showCustomNotification('Sign up successful! Please login.', 'success', function() {
                            window.location.href = 'login.html';
                        });
                    }).catch((error) => {
                        restoreSubmitBtn();
                        showCustomNotification('Sign up succeeded, but failed to save profile: ' + error.message, 'error');
                    });
                })
                .catch((error) => {
                    restoreSubmitBtn();
                    let msg = error.message;
                    if (error.code === 'auth/email-already-in-use') {
                        msg = 'An account with this email already exists. Please use a different email.';
                    }
                    showCustomNotification(msg, 'error');
                });
// Loading spinner logic
function restoreSubmitBtn() {
    const form = document.querySelector('.signup-form');
    if (!form) return;
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = false;
        if (submitBtn._originalText) {
            submitBtn.innerHTML = submitBtn._originalText;
        }
    }
    const style = document.getElementById('btn-spinner-style');
    if (style) style.remove();
}
        });
    }
});

// Custom notification for signup/login success
function showCustomNotification(message, type, callback, isPasswordMismatch) {
    const notif = document.createElement('div');
    notif.className = 'custom-notification ' + (type === 'success' ? 'notif-success' : 'notif-error');
    notif.textContent = message;
    // Custom style for password mismatch
    if (isPasswordMismatch || (message && message.toLowerCase().includes('passwords do not match'))) {
        notif.style.background = 'linear-gradient(90deg, #d32f2f 60%, #ff5252 100%)';
        notif.style.color = '#fff';
        notif.style.fontWeight = 'bold';
        notif.style.border = '2px solid #ff5252';
        notif.style.boxShadow = '0 2px 12px rgba(211,47,47,0.18)';
        notif.style.letterSpacing = '0.5px';
    }
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
        pwBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" style="vertical-align:middle;"><path fill="#757575" d="M12 6.5c-3.78 0-7.09 2.13-8.82 5.5 1.73 3.37 5.04 5.5 8.82 5.5s7.09-2.13 8.82-5.5c-1.73-3.37-5.04-5.5-8.82-5.5zm0 10c-2.76 0-5.26-1.44-6.68-3.5C6.74 10.44 9.24 9 12 9s5.26 1.44 6.68 3.5C17.26 15.06 14.76 16.5 12 16.5zm0-7c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 11 12 11s1.5.67 1.5 1.5S12.83 14.5 12 14.5z"/></svg>';
        pwBtn.addEventListener('click', function() {
            if (pw.type === 'password') {
                pw.type = 'text';
                pwBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" style="vertical-align:middle;"><path fill="#1976d2" d="M12 6.5c-3.78 0-7.09 2.13-8.82 5.5 1.73 3.37 5.04 5.5 8.82 5.5s7.09-2.13 8.82-5.5c-1.73-3.37-5.04-5.5-8.82-5.5zm0 10c-2.76 0-5.26-1.44-6.68-3.5C6.74 10.44 9.24 9 12 9s5.26 1.44 6.68 3.5C17.26 15.06 14.76 16.5 12 16.5zm0-7c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 11 12 11s1.5.67 1.5 1.5S12.83 14.5 12 14.5z"/></svg>';
            } else {
                pw.type = 'password';
                pwBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" style="vertical-align:middle;"><path fill="#757575" d="M12 6.5c-3.78 0-7.09 2.13-8.82 5.5 1.73 3.37 5.04 5.5 8.82 5.5s7.09-2.13 8.82-5.5c-1.73-3.37-5.04-5.5-8.82-5.5zm0 10c-2.76 0-5.26-1.44-6.68-3.5C6.74 10.44 9.24 9 12 9s5.26 1.44 6.68 3.5C17.26 15.06 14.76 16.5 12 16.5zm0-7c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 11 12 11s1.5.67 1.5 1.5S12.83 14.5 12 14.5z"/></svg>';
            }
        });
    }
    const cpw = document.getElementById('confirm-password');
    const cpwBtn = document.getElementById('toggle-confirm-password');
    if (cpw && cpwBtn) {
        cpwBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" style="vertical-align:middle;"><path fill="#757575" d="M12 6.5c-3.78 0-7.09 2.13-8.82 5.5 1.73 3.37 5.04 5.5 8.82 5.5s7.09-2.13 8.82-5.5c-1.73-3.37-5.04-5.5-8.82-5.5zm0 10c-2.76 0-5.26-1.44-6.68-3.5C6.74 10.44 9.24 9 12 9s5.26 1.44 6.68 3.5C17.26 15.06 14.76 16.5 12 16.5zm0-7c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 11 12 11s1.5.67 1.5 1.5S12.83 14.5 12 14.5z"/></svg>';
        cpwBtn.addEventListener('click', function() {
            if (cpw.type === 'password') {
                cpw.type = 'text';
                cpwBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" style="vertical-align:middle;"><path fill="#1976d2" d="M12 6.5c-3.78 0-7.09 2.13-8.82 5.5 1.73 3.37 5.04 5.5 8.82 5.5s7.09-2.13 8.82-5.5c-1.73-3.37-5.04-5.5-8.82-5.5zm0 10c-2.76 0-5.26-1.44-6.68-3.5C6.74 10.44 9.24 9 12 9s5.26 1.44 6.68 3.5C17.26 15.06 14.76 16.5 12 16.5zm0-7c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 11 12 11s1.5.67 1.5 1.5S12.83 14.5 12 14.5z"/></svg>';
            } else {
                cpw.type = 'password';
                cpwBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" style="vertical-align:middle;"><path fill="#757575" d="M12 6.5c-3.78 0-7.09 2.13-8.82 5.5 1.73 3.37 5.04 5.5 8.82 5.5s7.09-2.13 8.82-5.5c-1.73-3.37-5.04-5.5-8.82-5.5zm0 10c-2.76 0-5.26-1.44-6.68-3.5C6.74 10.44 9.24 9 12 9s5.26 1.44 6.68 3.5C17.26 15.06 14.76 16.5 12 16.5zm0-7c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 11 12 11s1.5.67 1.5 1.5S12.83 14.5 12 14.5z"/></svg>';
            }
        });
    }
});
