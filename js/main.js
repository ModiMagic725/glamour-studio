// AOS
AOS.init({
    duration: window.innerWidth < 768 ? 600 : 800,
    once: true,
    easing: 'ease-out-cubic',
    offset: window.innerWidth < 768 ? 30 : 60,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
});

// Preloader
window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    setTimeout(() => { pre.classList.add('hidden'); }, 500);
});

// Sticky Navbar + scroll-to-top (passive + one update per frame = smooth scrolling)
(function () {
    const nav = document.querySelector('.navbar-glamour');
    const st  = document.getElementById('scrollTop');
    let ticking = false;
    function update() {
        const y = window.scrollY;
        if (nav) nav.classList.toggle('scrolled', y > 50);
        if (st)  st.classList.toggle('show', y > 400);
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
})();

// Scroll to top
document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Touch: Flip Cards
(function() {
    var isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice) {
        document.querySelectorAll('.flip-card').forEach(function(card) {
            card.addEventListener('click', function() { this.classList.toggle('flipped'); });
        });
        var style = document.createElement('style');
        style.textContent = '.flip-card.flipped .flip-card-inner { transform: rotateY(180deg); } @media (hover: none) { .flip-card:hover .flip-card-inner { transform: none; } }';
        document.head.appendChild(style);
    }
})();

// iOS: Fix background-attachment fixed
(function() {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
        var style = document.createElement('style');
        style.textContent = '.why-section, .cta-section, .booking-section, .mv-section { background-attachment: scroll !important; }';
        document.head.appendChild(style);
    }
})();

// Animated counters
function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current).toLocaleString('en-IN');
    }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { animateCounter(e.target); counterObserver.unobserve(e.target); }
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ================================================================
// AUTH MODAL FUNCTIONS
// ================================================================

function openAuthModal(tab) {
    document.getElementById('authBackdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
    switchAuthTab(tab || 'login');
}

function closeAuthModal() {
    document.getElementById('authBackdrop').classList.remove('open');
    document.body.style.overflow = '';
    // Clear messages
    clearAuthMsg('login');
    clearAuthMsg('register');
}

// Close on ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeAuthModal();
});

function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));

    if (tab === 'login') {
        document.getElementById('loginTabBtn').classList.add('active');
        document.getElementById('loginPanel').classList.add('active');
        document.getElementById('authModalTitle').textContent = 'Welcome Back';
        document.getElementById('authModalSub').textContent = 'Sign in to book & manage your appointments';
    } else {
        document.getElementById('registerTabBtn').classList.add('active');
        document.getElementById('registerPanel').classList.add('active');
        document.getElementById('authModalTitle').textContent = 'Join Glamour';
        document.getElementById('authModalSub').textContent = 'Create your account to start your beauty journey';
    }
}

function showAuthMsg(panel, type, msg) {
    const el = document.getElementById(panel + 'Msg');
    el.className = 'auth-msg ' + type + ' show';
    el.textContent = msg;
}
function clearAuthMsg(panel) {
    const el = document.getElementById(panel + 'Msg');
    if (el) { el.className = 'auth-msg'; el.textContent = ''; }
}

function setAuthLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    btn.disabled = loading;
    btn.querySelector('span').textContent = loading ? 'Please wait...' : (btnId === 'loginBtn' ? 'Sign In to Glamour' : 'Create My Account');
}

// ---- LOGIN SUBMIT ----
function submitLogin() {
    clearAuthMsg('login');
    const mobile   = document.getElementById('loginMobile').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!mobile || !password) {
        showAuthMsg('login', 'error', 'Mobile aur password dono zaroori hain.');
        return;
    }

    setAuthLoading('loginBtn', true);

    
    GlamourAuth.login(mobile, password)
        .then(data => {
            setAuthLoading('loginBtn', false);
            if (data.success) {
                showAuthMsg('login', 'success', '✓ Login successful! Welcome back, ' + data.customer_name + '!');
                setTimeout(() => { window.location.reload(); }, 900);
            } else {
                showAuthMsg('login', 'error', data.error || 'Kuch galat ho gaya. Dobara try karein.');
            }
        })
        .catch(() => {
            setAuthLoading('loginBtn', false);
            showAuthMsg('login', 'error', 'Network error. Dobara try karein.');
        });
}

// ---- REGISTER SUBMIT ----
function submitRegister() {
    clearAuthMsg('register');
    const name     = document.getElementById('regName').value.trim();
    const mobile   = document.getElementById('regMobile').value.trim();
    const email    = document.getElementById('regEmail').value.trim();
    const pwd      = document.getElementById('regPassword').value.trim();
    const cpwd     = document.getElementById('regConfirmPassword').value.trim();

    if (!name || !mobile || !pwd) {
        showAuthMsg('register', 'error', 'Naam, mobile aur password zaroori hain.');
        return;
    }

    setAuthLoading('registerBtn', true);

    
    GlamourAuth.register({ full_name: name, mobile: mobile, email: email, password: pwd, confirm_password: cpwd })
        .then(data => {
            setAuthLoading('registerBtn', false);
            if (data.success) {
                showAuthMsg('register', 'success', '✓ Account created! Welcome to Glamour, ' + data.customer_name + '!');
                setTimeout(() => { window.location.reload(); }, 900);
            } else {
                showAuthMsg('register', 'error', data.error || 'Kuch galat ho gaya. Dobara try karein.');
            }
        })
        .catch(() => {
            setAuthLoading('registerBtn', false);
            showAuthMsg('register', 'error', 'Network error. Dobara try karein.');
        });
}

// Enter key for login
document.addEventListener('DOMContentLoaded', function() {
    ['loginMobile', 'loginPassword'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('keydown', function(e) { if (e.key === 'Enter') submitLogin(); });
    });
    ['regName','regMobile','regEmail','regPassword','regConfirmPassword'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('keydown', function(e) { if (e.key === 'Enter') submitRegister(); });
    });

    // Auto-open modal if login_required param
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login_required') === '1') {
        setTimeout(() => openAuthModal('login'), 500);
    }
});

// Customer dropdown toggle
function toggleCustomerMenu() {
    const menu = document.getElementById('customerNavMenu');
    if (menu) menu.classList.toggle('open');
}
// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const navItem = document.getElementById('customerNavItem');
    if (navItem && !navItem.contains(e.target)) {
        const menu = document.getElementById('customerNavMenu');
        if (menu) menu.classList.remove('open');
    }
});

// Auth-aware UI (navbar, footer, year)
function applyAuthUI() {
    const c = GlamourAuth.current();
    document.body.classList.toggle('logged-in', !!c);
    if (c) {
        const n = c.full_name;
        const a = document.getElementById('navCustomerName'); if (a) a.textContent = n.length > 14 ? n.slice(0, 13) + '…' : n;
        const m = document.getElementById('menuCustomerName'); if (m) m.textContent = n;
    }
    const y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
}
function logoutCustomer() {
    GlamourAuth.logout();
    if (/booking/.test(location.pathname)) location.href = 'index.html'; else location.reload();
}
applyAuthUI();
