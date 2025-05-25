// On profile modal open, fill in name, email, and account address from localStorage if available
document.addEventListener('DOMContentLoaded', function() {
    const profileIcon = document.getElementById('profile-icon');
    const nameSpan = document.querySelector('.profile-info-row .profile-info-value');
    const emailSpan = document.querySelectorAll('.profile-info-row .profile-info-value')[2];
    const addressSpan = document.querySelectorAll('.profile-info-row .profile-info-value')[3];
    if (profileIcon && nameSpan && emailSpan && addressSpan) {
        profileIcon.addEventListener('click', function() {
            const name = localStorage.getItem('cryptonest_name');
            const email = localStorage.getItem('cryptonest_email');
            const address = localStorage.getItem('cryptonest_address');
            if (name) nameSpan.textContent = name;
            if (email) emailSpan.textContent = email;
            if (address) addressSpan.textContent = address;
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
