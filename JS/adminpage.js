document.addEventListener('DOMContentLoaded', function() {
    // USER MANAGEMENT
    const users = JSON.parse(localStorage.getItem('cryptonest_users') || '[]');
    const userTbody = document.querySelectorAll('.admin-table tbody')[0];
    if (userTbody) {
        userTbody.innerHTML = '';
        if (users.length === 0) {
            userTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No users found.</td></tr>';
        } else {
            users.forEach((user, idx) => {
                userTbody.innerHTML += `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.address || ''}</td>
                        <td>${user.role || 'Investor'}</td>
                        <td><span style="color: #43a047; font-weight:600;">Active</span></td>
                        <td class="admin-actions">
                            <button class="admin-btn view-user" data-idx="${idx}">View</button>
                            <button class="admin-btn delete-user" data-idx="${idx}">Delete</button>
                        </td>
                    </tr>
                `;
            });
        }
        userTbody.addEventListener('click', function(e) {
            if (e.target.classList.contains('view-user')) {
                const idx = e.target.getAttribute('data-idx');
                const user = users[idx];
                alert(`Name: ${user.name}\nEmail: ${user.email}\nAddress: ${user.address || ''}`);
            }
            if (e.target.classList.contains('delete-user')) {
                const idx = e.target.getAttribute('data-idx');
                if (confirm('Delete this user?')) {
                    users.splice(idx, 1);
                    localStorage.setItem('cryptonest_users', JSON.stringify(users));
                    location.reload();
                }
            }
        });
    }

    // INVESTMENT MANAGEMENT (Mock data for demo)
    const investments = [
        { user: 'Jane Doe', plan: 'Gold Plan', amount: '$5,000', start: '2025-05-20', end: '2025-06-10', status: 'Active' },
        { user: 'John Smith', plan: 'Starter Plan', amount: '$100', start: '2025-05-01', end: '2025-05-08', status: 'Completed' }
    ];
    const investTbody = document.querySelectorAll('.admin-table tbody')[1];
    if (investTbody) {
        investTbody.innerHTML = '';
        investments.forEach((inv, idx) => {
            investTbody.innerHTML += `
                <tr>
                    <td>${inv.user}</td>
                    <td>${inv.plan}</td>
                    <td>${inv.amount}</td>
                    <td>${inv.start}</td>
                    <td>${inv.end}</td>
                    <td><span style="color:${inv.status==='Active'?'#43a047':'#888'};font-weight:600;">${inv.status}</span></td>
                    <td class="admin-actions"><button class="admin-btn">View</button></td>
                </tr>
            `;
        });
    }

    // TRANSACTION MONITORING (Mock data for demo)
    const transactions = [
        { id: 'TX1001', user: 'Jane Doe', type: 'Deposit', amount: '$5,000', date: '2025-05-20', status: 'Confirmed' },
        { id: 'TX1002', user: 'John Smith', type: 'Withdrawal', amount: '$100', date: '2025-05-21', status: 'Pending' }
    ];
    const txTbody = document.querySelectorAll('.admin-table tbody')[2];
    if (txTbody) {
        txTbody.innerHTML = '';
        transactions.forEach(tx => {
            txTbody.innerHTML += `
                <tr>
                    <td>${tx.id}</td>
                    <td>${tx.user}</td>
                    <td>${tx.type}</td>
                    <td>${tx.amount}</td>
                    <td>${tx.date}</td>
                    <td><span style="color:${tx.status==='Confirmed'?'#43a047':'#ffa726'};font-weight:600;">${tx.status}</span></td>
                </tr>
            `;
        });
    }

    // ANALYTICS & REPORTING
    const analytics = {
        users: users.length,
        investments: investments.length,
        transactions: transactions.length,
        revenue: '$5,100'
    };
    const analyticsValues = document.querySelectorAll('.analytics-value');
    if (analyticsValues.length >= 4) {
        analyticsValues[0].textContent = analytics.users;
        analyticsValues[1].textContent = analytics.investments;
        analyticsValues[2].textContent = analytics.transactions;
        analyticsValues[3].textContent = analytics.revenue;
    }

    // CONTENT MANAGEMENT & SUPPORT BUTTONS (Demo only)
    document.querySelectorAll('.content-management-block .admin-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Content management action: ' + btn.textContent);
        });
    });
    document.querySelectorAll('.support-communication-block .admin-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Support action: ' + btn.textContent);
        });
    });
});
