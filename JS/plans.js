// Logout button logic
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Clear user data (for demo: clear all localStorage)
            localStorage.clear();
            // Show notification before redirect
            showLogoutNotification();
        });
    }
});

// Notification function
function showLogoutNotification() {
    // Create notification element
    const notif = document.createElement('div');
    notif.textContent = 'You have been logged out.';
    notif.style.position = 'fixed';
    notif.style.top = '24px';
    notif.style.left = '50%';
    notif.style.transform = 'translateX(-50%)';
    notif.style.background = 'linear-gradient(90deg, #1976d2 60%, #21cbf3 100%)';
    notif.style.color = '#fff';
    notif.style.padding = '14px 32px';
    notif.style.borderRadius = '8px';
    notif.style.fontSize = '1.1em';
    notif.style.fontWeight = '600';
    notif.style.boxShadow = '0 2px 12px rgba(25,118,210,0.13)';
    notif.style.zIndex = '9999';
    notif.style.opacity = '0';
    notif.style.transition = 'opacity 0.3s';
    document.body.appendChild(notif);
    setTimeout(() => { notif.style.opacity = '1'; }, 10);
    setTimeout(() => {
        notif.style.opacity = '0';
        setTimeout(() => {
            notif.remove();
            window.location.href = '../index.html';
        }, 400);
    }, 1400);
}
// On profile modal open, fill in name, email, and account address from current user in localStorage
document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.getElementById('profile-icon');
    const profileInfoValues = document.querySelectorAll('.profile-info-row .profile-info-value');
    // 0: Name, 1: Account ID, 2: Email, 3: Account Address
    if (profileIcon && profileInfoValues.length >= 4) {
        profileIcon.addEventListener('click', function() {
            let user = null;
            try {
                user = JSON.parse(localStorage.getItem('cryptonest_current_user'));
            } catch (e) {}
            if (user) {
                profileInfoValues[0].textContent = user.name || '';
                // Account ID can be generated or left as is
                profileInfoValues[2].textContent = user.email || '';
                profileInfoValues[3].textContent = user.address || '';
            }
        });
    }
});
// Profile modal logic
document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.getElementById('profile-icon');
    const profileModal = document.getElementById('profile-modal');
    const profileOverlay = document.getElementById('profile-modal-overlay');
    const profileClose = document.getElementById('profile-modal-close');
    if (profileIcon && profileModal && profileOverlay && profileClose) {
        profileIcon.addEventListener('click', function() {
            profileModal.classList.add('active');
            profileOverlay.classList.add('active');
        });
        profileClose.addEventListener('click', function() {
            profileModal.classList.remove('active');
            profileOverlay.classList.remove('active');
        });
        profileOverlay.addEventListener('click', function() {
            profileModal.classList.remove('active');
            profileOverlay.classList.remove('active');
        });
    }
});
// Profile modal logic
document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.getElementById('profile-icon');
    const profileModal = document.getElementById('profile-modal');
    const profileOverlay = document.getElementById('profile-modal-overlay');
    const profileClose = document.getElementById('profile-modal-close');
    if (profileIcon && profileModal && profileOverlay && profileClose) {
        profileIcon.addEventListener('click', function() {
            profileModal.classList.add('active');
            profileOverlay.classList.add('active');
        });
        profileClose.addEventListener('click', function() {
            profileModal.classList.remove('active');
            profileOverlay.classList.remove('active');
        });
        profileOverlay.addEventListener('click', function() {
            profileModal.classList.remove('active');
            profileOverlay.classList.remove('active');
        });
    }
});
// Handles the Invest Now modal for plans page

document.addEventListener('DOMContentLoaded', function() {
    const investButtons = document.querySelectorAll('.plan-action-btn');
    const modal = document.getElementById('invest-modal');
    const modalOverlay = document.getElementById('invest-modal-overlay');
    const closeBtn = document.getElementById('invest-modal-close');
    const planNameSpan = document.getElementById('invest-plan-name');
    const planDetailsDiv = document.getElementById('invest-plan-details');

    investButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Get plan info
            const card = btn.closest('.plan-card');
            const planName = card.querySelector('h2').textContent;
            const planDesc = card.querySelector('.plan-desc').textContent;
            const planList = card.querySelector('ul').cloneNode(true);
            // Fill modal
            planNameSpan.textContent = planName;
            planDetailsDiv.innerHTML = '';
            planDetailsDiv.appendChild(planList);
            document.getElementById('invest-plan-desc').textContent = planDesc;
            // Show modal
            modal.classList.add('active');
            modalOverlay.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
    });
    modalOverlay.addEventListener('click', function() {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
    });
    // Copy BTC address button logic
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('copy-btc-btn')) {
            const btn = e.target;
            const address = btn.previousElementSibling.textContent;
            navigator.clipboard.writeText(address).then(() => {
                btn.classList.add('copied');
                btn.textContent = 'Copied!';
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.textContent = 'Copy';
                }, 1500);
            });
        }
    });
});
// Withdraw modal logic
document.addEventListener('DOMContentLoaded', function() {
    const withdrawBtn = document.getElementById('withdraw-btn');
    const withdrawModal = document.getElementById('withdraw-modal');
    const withdrawOverlay = document.getElementById('withdraw-modal-overlay');
    const withdrawClose = document.getElementById('withdraw-modal-close');
    if (withdrawBtn && withdrawModal && withdrawOverlay && withdrawClose) {
        withdrawBtn.addEventListener('click', function() {
            withdrawModal.classList.add('active');
            withdrawOverlay.classList.add('active');
        });
        withdrawClose.addEventListener('click', function() {
            withdrawModal.classList.remove('active');
            withdrawOverlay.classList.remove('active');
        });
        withdrawOverlay.addEventListener('click', function() {
            withdrawModal.classList.remove('active');
            withdrawOverlay.classList.remove('active');
        });
    }
    // Optional: handle withdraw form submit
    const withdrawForm = document.getElementById('withdraw-form');
    if (withdrawForm) {
        withdrawForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Withdrawal request submitted!');
            withdrawModal.classList.remove('active');
            withdrawOverlay.classList.remove('active');
            // Clear the form fields
            withdrawForm.reset();
        });
    }
});
