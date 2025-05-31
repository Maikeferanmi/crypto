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

        // Set dashboard balance and status for new investor
        let user = null;
        try {
            user = JSON.parse(localStorage.getItem('cryptonest_current_user'));
        } catch (e) {}
        // You can store investments in localStorage as 'cryptonest_investments' (array of {email, amount, status, ...})
        let investments = [];
        try {
            investments = JSON.parse(localStorage.getItem('cryptonest_investments')) || [];
        } catch (e) { investments = []; }
        let userInvestments = [];
        if (user && user.email) {
            userInvestments = investments.filter(inv => inv.email === user.email && inv.status === 'active');
        }
        const balanceAmount = document.getElementById('balance-amount');
        const balanceCurrency = document.getElementById('balance-currency');
        const balanceStatus = document.getElementById('balance-status');
        const withdrawBtn = document.getElementById('withdraw-btn');
        let totalBalance = 0;
        let totalBTC = 0;
        // Always show as active and enable buttons
        totalBalance = userInvestments.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0);
        totalBTC = totalBalance / 69000;
        if (balanceAmount) balanceAmount.textContent = `$${totalBalance.toFixed(2)}`;
        if (balanceCurrency) balanceCurrency.textContent = `BTC: ${totalBTC.toFixed(5)}`;
        if (balanceStatus) {
            if (userInvestments.length > 0 && totalBalance > 0) {
                balanceStatus.textContent = '\u25CF Active';
                balanceStatus.style.color = '#00e676';
            } else {
                balanceStatus.textContent = '\u25CF Inactive';
                balanceStatus.style.color = '#ff5252';
            }
        }
        if (withdrawBtn) withdrawBtn.disabled = false;

        // Update profile modal progress bar and title
        const progressTitle = document.querySelector('.profile-dashboard-progress .progress-title');
        const progressBarFill = document.querySelector('.profile-dashboard-progress .progress-bar-fill');
        const progressBarLabel = document.querySelector('.profile-dashboard-progress .progress-bar-label');
        if (progressTitle) {
            if (userInvestments.length > 0 && totalBalance > 0) {
                // Use the first active investment's plan name if available
                const planName = userInvestments[0]?.plan || 'Your Plan';
                progressTitle.textContent = `Investment Progress (${planName})`;
                // Optionally update progress bar and label for active investment (not changed here)
            } else {
                progressTitle.textContent = 'No investment yet';
                if (progressBarFill) progressBarFill.style.width = '0%';
                if (progressBarLabel) progressBarLabel.textContent = 'Day 0 / 0';
            }
        }

        // Listen for investment creation and update dashboard live
        document.addEventListener('investmentCreated', function() {
            // Re-run the dashboard update logic
            let user = null;
            try {
                user = JSON.parse(localStorage.getItem('cryptonest_current_user'));
            } catch (e) {}
            let investments = [];
            try {
                investments = JSON.parse(localStorage.getItem('cryptonest_investments')) || [];
            } catch (e) { investments = []; }
            let userInvestments = [];
            if (user && user.email) {
                userInvestments = investments.filter(inv => inv.email === user.email && inv.status === 'active');
            }
            let totalBalance = 0;
            let totalBTC = 0;
            // Always show as active and enable buttons
            if (userInvestments.length > 0) {
                totalBalance = userInvestments.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0);
                totalBTC = totalBalance / 69000;
                if (balanceAmount) balanceAmount.textContent = `$${totalBalance.toFixed(2)}`;
                if (balanceCurrency) balanceCurrency.textContent = `BTC: ${totalBTC.toFixed(5)}`;
            } else {
                if (balanceAmount) balanceAmount.textContent = `$0.00`;
                if (balanceCurrency) balanceCurrency.textContent = `BTC: 0.00000`;
            }
            if (balanceStatus) {
                if (userInvestments.length > 0 && totalBalance > 0) {
                    balanceStatus.textContent = '\u25CF Active';
                    balanceStatus.style.color = '#00e676';
                } else {
                    balanceStatus.textContent = '\u25CF Inactive';
                    balanceStatus.style.color = '#ff5252';
                }
            }
            if (withdrawBtn) withdrawBtn.disabled = false;

            // Update profile modal progress bar and title on dashboard update
            const progressTitle = document.querySelector('.profile-dashboard-progress .progress-title');
            const progressBarFill = document.querySelector('.profile-dashboard-progress .progress-bar-fill');
            const progressBarLabel = document.querySelector('.profile-dashboard-progress .progress-bar-label');
            if (progressTitle) {
                if (userInvestments.length > 0 && totalBalance > 0) {
                    const planName = userInvestments[0]?.plan || 'Your Plan';
                    progressTitle.textContent = `Investment Progress (${planName})`;
                    // Optionally update progress bar and label for active investment (not changed here)
                } else {
                    progressTitle.textContent = 'No investment yet';
                    if (progressBarFill) progressBarFill.style.width = '0%';
                    if (progressBarLabel) progressBarLabel.textContent = 'Day 0 / 0';
                }
            }
        });
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
    const modalOverlay = document.getElementById('invest-overlay');
    const closeBtn = document.getElementById('invest-modal-close');
    const planNameSpan = document.getElementById('invest-plan-name');
    const planDetailsDiv = document.getElementById('invest-plan-details');
    const depositBtn = document.getElementById('deposit-btn');
    const depositModal = document.getElementById('deposit-modal');
    const depositOverlay = document.getElementById('deposit-overlay');
    const depositClose = document.getElementById('deposit-modal-close');


    investButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Get plan info
            const card = btn.closest('.plan-card');
            const planName = card.querySelector('h2').textContent;
            const planDesc = card.querySelector('.plan-desc').textContent;
            const planList = card.querySelectorAll('ul li');
            // Extract plan details
            let duration = '', roi = '', days = '';
            let allDetails = '';
            planList.forEach(li => {
                allDetails += `<div>${li.textContent}</div>`;
                if (li.textContent.toLowerCase().includes('duration')) {
                    duration = li.textContent.replace('Duration:', '').trim();
                    days = duration.replace(/[^0-9]/g, '');
                }
                if (li.textContent.toLowerCase().includes('roi')) {
                    roi = li.textContent.replace('Daily ROI:', '').trim();
                }
            });
            // Fill modal fields
            document.getElementById('invest-plan-name').textContent = planName;
            document.getElementById('invest-plan-desc').textContent = planDesc;
            // Show all plan details
            const planDetailsDiv = document.getElementById('invest-plan-details');
            planDetailsDiv.innerHTML = allDetails;
            // Fill new invest form fields
            const planSummary = document.getElementById('invest-plan-summary');
            const planDuration = document.getElementById('invest-plan-duration');
            const planRoi = document.getElementById('invest-plan-roi');
            const planDays = document.getElementById('invest-plan-days');
            if (planSummary) planSummary.textContent = planName;
            if (planDuration) planDuration.textContent = duration;
            if (planRoi) planRoi.textContent = roi;
            if (planDays) planDays.textContent = days ? days + ' days' : '';
            // Show modal and overlay (use unique invest classes)
            document.getElementById('invest-modal').classList.add('active');
            document.getElementById('invest-overlay').classList.add('active');
        });
    });
// Handle invest form submit
document.addEventListener('DOMContentLoaded', function() {
    const investForm = document.getElementById('invest-form');
    if (investForm) {
        investForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = document.getElementById('invest-amount').value;
            const plan = document.getElementById('invest-plan-summary').textContent;
            const duration = document.getElementById('invest-plan-duration').textContent;
            const roi = document.getElementById('invest-plan-roi').textContent;
            const days = document.getElementById('invest-plan-days').textContent;
            // Save investment (demo: localStorage)
            let user = null;
            try { user = JSON.parse(localStorage.getItem('cryptonest_current_user')); } catch (e) {}
            let investments = [];
            try { investments = JSON.parse(localStorage.getItem('cryptonest_investments')) || []; } catch (e) { investments = []; }
            if (user && amount && plan) {
                investments.push({
                    email: user.email,
                    amount,
                    plan,
                    duration,
                    roi,
                    days,
                    status: 'active',
                    date: new Date().toISOString()
                });
                localStorage.setItem('cryptonest_investments', JSON.stringify(investments));
                // Optionally update dashboard, close modal, show notification
                document.getElementById('invest-modal').classList.remove('active');
                document.getElementById('invest-overlay').classList.remove('active');
                // Dispatch event to update dashboard
                document.dispatchEvent(new Event('investmentCreated'));
                showCustomNotification('Investment successful!', 'success');
            }
        });
    }
});

    // Deposit button logic (right side of dashboard)
    if (depositBtn && depositModal && depositOverlay && depositClose) {
        depositBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            depositModal.classList.add('active');
            depositOverlay.classList.add('active');
        });
        depositClose.addEventListener('click', function() {
            depositModal.classList.remove('active');
            depositOverlay.classList.remove('active');
        });
        depositOverlay.addEventListener('click', function(e) {
            if (e.target === depositOverlay) {
                depositModal.classList.remove('active');
                depositOverlay.classList.remove('active');
            }
        });
    }

    // (Removed redundant invest modal close logic here. Invest modal close is handled above with correct overlay click logic.)
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
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('invest-modal-close').addEventListener('click', function() {
        document.getElementById('invest-overlay').classList.remove('active');
        document.getElementById('invest-modal').classList.remove('active');
    });

    document.getElementById('invest-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            document.getElementById('invest-overlay').classList.remove('active');
            document.getElementById('invest-modal').classList.remove('active');
        }
    });
});