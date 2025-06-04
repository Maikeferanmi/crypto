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

// Notification function for logout
function showLogoutNotification() {
    showCustomNotification('You have been logged out.', 'info', () => {
        window.location.href = '../index.html';
    });
}

// General notification function for errors, success, info
function showCustomNotification(message, type = 'info', callback) {
    // Remove any existing notification
    const existing = document.getElementById('custom-notification');
    if (existing) existing.remove();
    const notif = document.createElement('div');
    notif.id = 'custom-notification';
    notif.textContent = message;
    notif.style.position = 'fixed';
    notif.style.top = '24px';
    notif.style.left = '50%';
    notif.style.transform = 'translateX(-50%)';
    notif.style.background =
        type === 'error' ? 'linear-gradient(90deg, #d32f2f 60%, #ff5252 100%)'
        : type === 'success' ? 'linear-gradient(90deg, #388e3c 60%, #00e676 100%)'
        : 'linear-gradient(90deg, #1976d2 60%, #21cbf3 100%)';
    notif.style.color = '#fff';
    notif.style.padding = '14px 32px';
    notif.style.borderRadius = '8px';
    notif.style.fontSize = '1.1em';
    notif.style.fontWeight = '600';
    notif.style.boxShadow = '0 2px 12px rgba(25,118,210,0.13)';
    notif.style.zIndex = '9999';
    notif.style.opacity = '0';
    notif.style.transition = 'opacity 0.3s';
    notif.style.pointerEvents = 'none';
    document.body.appendChild(notif);
    setTimeout(() => { notif.style.opacity = '1'; }, 10);
    setTimeout(() => {
        notif.style.opacity = '0';
        setTimeout(() => {
            notif.remove();
            if (typeof callback === 'function') callback();
        }, 400);
    }, type === 'error' ? 2200 : 1400);
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
        // If no active investment, add a default Starter Plan investment for demo
        // if (user && user.email && userInvestments.length === 0) {
        //     const starterInvestment = {
        //         email: user.email,
        //         amount: 500,
        //         plan: 'Starter Plan',
        //         duration: '7 days',
        //         roi: '2%',
        //         days: '7 days',
        //         status: 'active',
        //         date: new Date().toISOString()
        //     };
        //     investments.push(starterInvestment);
        //     localStorage.setItem('cryptonest_investments', JSON.stringify(investments));
        //     userInvestments = [starterInvestment];
        // }
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
                // Simulate progress at Day 2
                const daysStr = userInvestments[0]?.days || '7 days';
                const totalDays = parseInt(daysStr) || 7;
                const currentDay = Math.min(2, totalDays); // Set to Day 2, but not more than total
                if (progressBarFill) progressBarFill.style.width = ((currentDay / totalDays) * 100) + '%';
                if (progressBarLabel) progressBarLabel.textContent = `Day ${currentDay} / ${totalDays}`;
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
            // Always update balance before showing modal
            let user = null;
            try { user = JSON.parse(localStorage.getItem('cryptonest_current_user')); } catch (e) {}
            let investments = [];
            try { investments = JSON.parse(localStorage.getItem('cryptonest_investments')) || []; } catch (e) { investments = []; }
            let userInvestments = [];
            if (user && user.email) {
                userInvestments = investments.filter(inv => inv.email === user.email && inv.status === 'active');
            }
            let totalBalance = userInvestments.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0);
            const balanceAmount = document.getElementById('balance-amount');
            if (balanceAmount) balanceAmount.textContent = `$${totalBalance.toFixed(2)}`;

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
        // Defensive: get invest-amount input directly
        const investAmountInput = document.getElementById('invest-amount');
        investForm.addEventListener('submit', function(e) {
            showLoadingSpinner('invest');
            e.preventDefault();
            // Defensive: check input exists
            if (!investAmountInput) {
                hideLoadingSpinner('invest');
                showCustomNotification('Investment amount input not found.', 'error');
                return;
            }
            const amount = parseFloat(investAmountInput.value);
            const plan = document.getElementById('invest-plan-summary')?.textContent || '';
            const duration = document.getElementById('invest-plan-duration')?.textContent || '';
            const roi = document.getElementById('invest-plan-roi')?.textContent || '';
            const days = document.getElementById('invest-plan-days')?.textContent || '';
            // Check against account balance
            let balance = 0;
            const balanceAmount = document.getElementById('balance-amount');
            if (balanceAmount) {
                balance = parseFloat(balanceAmount.textContent.replace(/[$,]/g, '')) || 0;
            }
            // Investment validation
            if (isNaN(amount) || amount <= 0) {
                hideLoadingSpinner('invest');
                showCustomNotification('Please enter a valid investment amount.', 'error');
                investAmountInput.value = '';
                return;
            }
            if (isNaN(balance) || balance <= 0) {
                hideLoadingSpinner('invest');
                showCustomNotification('Account balance is too small for this investment. Please deposit.', 'error');
                return;
            }
            // Balance-based validation: amount must not exceed balance
            if (amount > balance) {
                hideLoadingSpinner('invest');
                showCustomNotification('Investment amount cannot exceed your account balance.', 'error');
                investAmountInput.value = '';
                return;
            }
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
                setTimeout(() => {
                    hideLoadingSpinner('invest');
                    showCustomNotification('Investment successful!', 'success');
                }, 600);
            } else {
                hideLoadingSpinner('invest');
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
    const withdrawAmountInput = document.getElementById('withdraw-amount');
    const bankNameSelect = document.getElementById('bank-name');
    const bankNameOther = document.getElementById('bank-name-other');
    // Show/hide the 'Other' bank name input if 'Other' is selected
    if (bankNameSelect && bankNameOther) {
        bankNameSelect.addEventListener('change', function() {
            if (bankNameSelect.value === 'Other') {
                bankNameOther.style.display = '';
                bankNameOther.required = true;
            } else {
                bankNameOther.style.display = 'none';
                bankNameOther.required = false;
            }
        });
    }
    if (withdrawBtn && withdrawModal && withdrawOverlay && withdrawClose) {
        withdrawBtn.addEventListener('click', function() {
            // Set max withdrawable amount to current account balance
            let balance = 0;
            const balanceAmount = document.getElementById('balance-amount');
            if (balanceAmount) {
                // Remove $ and commas, parse as float
                balance = parseFloat(balanceAmount.textContent.replace(/[$,]/g, '')) || 0;
            }
            if (withdrawAmountInput) {
                withdrawAmountInput.max = balance;
                withdrawAmountInput.value = '';
                withdrawAmountInput.placeholder = balance > 0 ? `Max: $${balance.toFixed(2)}` : 'Enter amount';
            }
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
            showLoadingSpinner('withdraw');
            e.preventDefault();
            let balance = 0;
            const balanceAmount = document.getElementById('balance-amount');
            if (balanceAmount) {
                balance = parseFloat(balanceAmount.textContent.replace(/[$,]/g, '')) || 0;
            }
            const withdrawValue = parseFloat(withdrawAmountInput.value) || 0;
            if (withdrawValue > balance) {
                hideLoadingSpinner('withdraw');
                showCustomNotification('Withdrawal amount exceeds available balance.', 'error');
                return;
            }
            if (withdrawValue <= 0) {
                hideLoadingSpinner('withdraw');
                showCustomNotification('Please enter a valid withdrawal amount.', 'error');
                return;
            }
            setTimeout(() => {
                hideLoadingSpinner('withdraw');
                alert('Withdrawal request submitted!');
                withdrawModal.classList.remove('active');
                withdrawOverlay.classList.remove('active');
                // Clear the form fields
                withdrawForm.reset();
            }, 600);
// Loading spinner for invest/withdraw
function showLoadingSpinner(type) {
    let loading = document.getElementById('firebase-loading-text');
    if (!loading) {
        loading = document.createElement('div');
        loading.id = 'firebase-loading-text';
        loading.style.position = 'fixed';
        loading.style.top = '0';
        loading.style.left = '0';
        loading.style.width = '100vw';
        loading.style.height = '100vh';
        loading.style.background = 'rgba(255,255,255,0.6)';
        loading.style.display = 'flex';
        loading.style.alignItems = 'center';
        loading.style.justifyContent = 'center';
        loading.style.zIndex = '99999';
        loading.innerHTML = `<div style="font-size:1.3em;color:#1976d2;font-weight:600;letter-spacing:0.5px;">${type === 'withdraw' ? 'Processing withdrawal...' : 'Processing investment...'}</div>`;
        document.body.appendChild(loading);
    } else {
        loading.innerHTML = `<div style="font-size:1.3em;color:#1976d2;font-weight:600;letter-spacing:0.5px;">${type === 'withdraw' ? 'Processing withdrawal...' : 'Processing investment...'}</div>`;
        loading.style.display = 'flex';
    }
}

function hideLoadingSpinner(type) {
    const loading = document.getElementById('firebase-loading-text');
    if (loading) loading.style.display = 'none';
}
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
// Responsive update for invested amount in profile modal
document.addEventListener('DOMContentLoaded', function() {
    function updateProfileInvestedAmount() {
        const investedAmountDiv = document.getElementById('profile-invested-amount');
        let user = null;
        try { user = JSON.parse(localStorage.getItem('cryptonest_current_user')); } catch (e) {}
        let investments = [];
        try { investments = JSON.parse(localStorage.getItem('cryptonest_investments')) || []; } catch (e) { investments = []; }
        let userInvestments = [];
        if (user && user.email) {
            userInvestments = investments.filter(inv => inv.email === user.email && inv.status === 'active');
        }
        let total = userInvestments.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0);
        if (investedAmountDiv) {
            investedAmountDiv.textContent = 'Amount Invested: $' + total.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
        }
    }
    updateProfileInvestedAmount();
    document.addEventListener('investmentCreated', updateProfileInvestedAmount);
    window.addEventListener('resize', function() {
        // Optionally adjust font size or layout for responsiveness
        const investedAmountDiv = document.getElementById('profile-invested-amount');
        if (investedAmountDiv) {
            if (window.innerWidth < 500) {
                investedAmountDiv.style.fontSize = '0.98em';
            } else {
                investedAmountDiv.style.fontSize = '1.08em';
            }
        }
    });
});