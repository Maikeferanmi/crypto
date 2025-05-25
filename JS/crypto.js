// crypto.js
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('main-nav');
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    hamburger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            nav.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', nav.classList.contains('open'));
        }
    });
});