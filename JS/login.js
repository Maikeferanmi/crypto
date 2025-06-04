
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.login-form');
    if (form) {
        // Add responsive 'Forgot Password?' link and modal if not present
        if (!document.getElementById('forgot-password-link')) {
            const forgotLink = document.createElement('a');
            forgotLink.href = '#';
            forgotLink.id = 'forgot-password-link';
            forgotLink.textContent = 'Forgot Password?';
            forgotLink.style.display = 'block';
            forgotLink.style.textAlign = 'right';
            forgotLink.style.margin = '8px 0 0 0';
            forgotLink.style.fontSize = '1em';
            forgotLink.style.color = '#1976d2';
            forgotLink.style.textDecoration = 'underline';
            forgotLink.style.cursor = 'pointer';
            forgotLink.style.transition = 'color 0.2s';
            forgotLink.addEventListener('mouseover', function() {
                forgotLink.style.color = '#125ea2';
            });
            forgotLink.addEventListener('mouseout', function() {
                forgotLink.style.color = '#1976d2';
            });
            // Responsive: shrink font on small screens
            function updateForgotLinkFont() {
                if (window.innerWidth < 500) {
                    forgotLink.style.fontSize = '0.95em';
                } else {
                    forgotLink.style.fontSize = '1em';
                }
            }
            window.addEventListener('resize', updateForgotLinkFont);
            updateForgotLinkFont();
            // Insert after password input
            const passwordInput = document.getElementById('login-password');
            if (passwordInput && passwordInput.parentNode) {
                passwordInput.parentNode.insertBefore(forgotLink, passwordInput.nextSibling);
            } else {
                form.appendChild(forgotLink);
            }

            // Create password reset modal and overlay
            if (!document.getElementById('reset-modal')) {
                const overlay = document.createElement('div');
                overlay.id = 'reset-modal-overlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100vw';
                overlay.style.height = '100vh';
                overlay.style.background = 'rgba(0,0,0,0.32)';
                overlay.style.display = 'none';
                overlay.style.zIndex = '10000';

                const modal = document.createElement('div');
                modal.id = 'reset-modal';
                modal.style.position = 'fixed';
                modal.style.top = '50%';
                modal.style.left = '50%';
                modal.style.transform = 'translate(-50%, -50%)';
                modal.style.background = '#fff';
                modal.style.borderRadius = '10px';
                modal.style.boxShadow = '0 2px 16px rgba(25,118,210,0.18)';
                modal.style.padding = '28px 22px 18px 22px';
                modal.style.width = '80vw';
                modal.style.maxWidth = '350px';
                modal.style.display = 'flex';
                modal.style.flexDirection = 'column';
                modal.style.alignItems = 'center';
                modal.style.zIndex = '10001';

                const title = document.createElement('div');
                title.textContent = 'Reset Password';
                title.style.fontWeight = '700';
                title.style.fontSize = '1.18em';
                title.style.marginBottom = '12px';
                title.style.color = '#1976d2';

                const desc = document.createElement('div');
                desc.textContent = 'Enter your registered email to reset your password.';
                desc.style.fontSize = '0.98em';
                desc.style.marginBottom = '14px';
                desc.style.textAlign = 'center';

                const emailInput = document.createElement('input');
                emailInput.type = 'email';
                emailInput.placeholder = 'Email address';
                emailInput.style.width = '100%';
                emailInput.style.marginBottom = '12px';
                emailInput.style.padding = '8px 10px';
                emailInput.style.border = '1px solid #bdbdbd';
                emailInput.style.borderRadius = '5px';
                emailInput.style.fontSize = '1em';

                const newPasswordInput = document.createElement('input');
                newPasswordInput.type = 'password';
                newPasswordInput.placeholder = 'New password';
                newPasswordInput.style.width = '100%';
                newPasswordInput.style.marginBottom = '12px';
                newPasswordInput.style.padding = '8px 10px';
                newPasswordInput.style.border = '1px solid #bdbdbd';
                newPasswordInput.style.borderRadius = '5px';
                newPasswordInput.style.fontSize = '1em';

                const confirmPasswordInput = document.createElement('input');
                confirmPasswordInput.type = 'password';
                confirmPasswordInput.placeholder = 'Confirm new password';
                confirmPasswordInput.style.width = '100%';
                confirmPasswordInput.style.marginBottom = '12px';
                confirmPasswordInput.style.padding = '8px 10px';
                confirmPasswordInput.style.border = '1px solid #bdbdbd';
                confirmPasswordInput.style.borderRadius = '5px';
                confirmPasswordInput.style.fontSize = '1em';

                const submitBtn = document.createElement('button');
                submitBtn.textContent = 'Reset Password';
                submitBtn.style.background = 'linear-gradient(90deg, #1976d2 60%, #21cbf3 100%)';
                submitBtn.style.color = '#fff';
                submitBtn.style.fontWeight = '600';
                submitBtn.style.fontSize = '1em';
                submitBtn.style.border = 'none';
                submitBtn.style.borderRadius = '5px';
                submitBtn.style.padding = '10px 0';
                submitBtn.style.width = '100%';
                submitBtn.style.marginTop = '4px';
                submitBtn.style.cursor = 'pointer';

                const closeBtn = document.createElement('span');
                closeBtn.textContent = '×';
                closeBtn.style.position = 'absolute';
                closeBtn.style.top = '10px';
                closeBtn.style.right = '18px';
                closeBtn.style.fontSize = '1.5em';
                closeBtn.style.cursor = 'pointer';
                closeBtn.style.color = '#888';
                closeBtn.title = 'Close';

                modal.appendChild(closeBtn);
                modal.appendChild(title);
                modal.appendChild(desc);
                modal.appendChild(emailInput);
                modal.appendChild(newPasswordInput);
                modal.appendChild(confirmPasswordInput);
                modal.appendChild(submitBtn);
                overlay.appendChild(modal);
                document.body.appendChild(overlay);

                // Show/hide modal logic
                function showResetModal() {
                    overlay.style.display = 'block';
                }
                function hideResetModal() {
                    overlay.style.display = 'none';
                    emailInput.value = '';
                    newPasswordInput.value = '';
                    confirmPasswordInput.value = '';
                }
                closeBtn.onclick = hideResetModal;
                overlay.onclick = function(e) {
                    if (e.target === overlay) hideResetModal();
                };

                // Password reset logic
                submitBtn.onclick = function(e) {
                    e.preventDefault();
                    const email = emailInput.value.trim();
                    const newPass = newPasswordInput.value;
                    const confirmPass = confirmPasswordInput.value;
                    if (!email) {
                        showCustomNotification('Please enter your email.', 'error');
                        return;
                    }
                    if (!newPass || !confirmPass) {
                        showCustomNotification('Please enter and confirm your new password.', 'error');
                        return;
                    }
                    if (newPass !== confirmPass) {
                        showCustomNotification('Passwords do not match.', 'error');
                        return;
                    }
                    // Password requirements: min 8 chars, upper, lower, number, special
                    const passReq = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
                    if (!passReq.test(newPass)) {
                        showCustomNotification('Password must be 8+ chars, upper, lower, number, special.', 'error');
                        return;
                    }
                    // Find user and update password
                    let users = JSON.parse(localStorage.getItem('cryptonest_users') || '[]');
                    const idx = users.findIndex(u => u.email === email);
                    if (idx === -1) {
                        showCustomNotification('No user found with that email.', 'error');
                        return;
                    }
                    users[idx].password = newPass;
                    localStorage.setItem('cryptonest_users', JSON.stringify(users));
                    showCustomNotification('Password reset successful! You can now log in.', 'success');
                    setTimeout(hideResetModal, 1200);
                };

                // Expose showResetModal to the link
                forgotLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showResetModal();
                });
            }
        }
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showLoadingSpinner();
            const emailInput = document.getElementById('login-email').value.trim();
            const passwordInput = document.getElementById('login-password').value;
            // Firebase Auth login
            firebase.auth().signInWithEmailAndPassword(emailInput, passwordInput)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // Retrieve user profile from Firestore
                    (window.db || firebase.firestore()).collection('users').doc(user.uid).get().then((doc) => {
                        hideLoadingSpinner();
                        if (doc.exists) {
                            localStorage.setItem('cryptonest_current_user', JSON.stringify(doc.data()));
                        } else {
                            localStorage.setItem('cryptonest_current_user', JSON.stringify({ email: user.email }));
                        }
                        showCustomNotification('Login successful!', 'success', function() {
                            window.location.href = 'plans.html';
                        });
                    }).catch((error) => {
                        hideLoadingSpinner();
                        showCustomNotification('Login succeeded, but failed to load profile: ' + error.message, 'error');
                    });
                })
                .catch((error) => {
                    hideLoadingSpinner();
                    let msg = error.message;
                    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                        msg = 'Invalid email or password. Please try again.';
                    }
                    showCustomNotification(msg, 'error');
                });
// Loading spinner logic
function showLoadingSpinner() {
    let spinner = document.getElementById('firebase-loading-spinner');
    if (!spinner) {
        spinner = document.createElement('div');
        spinner.id = 'firebase-loading-spinner';
        spinner.style.position = 'fixed';
        spinner.style.top = '0';
        spinner.style.left = '0';
        spinner.style.width = '100vw';
        spinner.style.height = '100vh';
        spinner.style.background = 'rgba(255,255,255,0.6)';
        spinner.style.display = 'flex';
        spinner.style.alignItems = 'center';
        spinner.style.justifyContent = 'center';
        spinner.style.zIndex = '99999';
        spinner.innerHTML = '<div style="border: 6px solid #e0e0e0; border-top: 6px solid #1976d2; border-radius: 50%; width: 48px; height: 48px; animation: spin 1s linear infinite;"></div>' +
            '<style>@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style>';
        document.body.appendChild(spinner);
    } else {
        spinner.style.display = 'flex';
    }
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('firebase-loading-spinner');
    if (spinner) spinner.style.display = 'none';
}
        });
    }
});

// Custom notification for login/signup success
function showCustomNotification(message, type, callback) {
    const notif = document.createElement('div');
    notif.className = 'custom-notification ' + (type === 'success' ? 'notif-success' : 'notif-error');
    notif.textContent = message;
    // Custom style for password mismatch
    if (message && message.toLowerCase().includes('passwords do not match')) {
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
