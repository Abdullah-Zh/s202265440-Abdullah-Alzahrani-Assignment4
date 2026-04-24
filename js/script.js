/* =============================================
   ASSIGNMENT 3 — PORTFOLIO JAVASCRIPT
   Abdullah Alzahrani | 202265440
   Features (A2 carried over):
     1. Theme toggle with localStorage persistence
     2. Project filter by tag
     3. Project search (live filtering)
     4. GitHub API integration with error/loading states
     5. Contact form validation with user feedback
     6. Scroll reveal animations (IntersectionObserver)
     7. Magnetic buttons & 3D tilt
     8. Interactive background canvas
   Features (A3 new):
     9.  Project sort (name A→Z / Z→A)
    10.  Visit duration timer
    11.  Visitor name storage (localStorage)
    12.  Visitor greeting in nav
   ============================================= */

'use strict';

/* ─── 0. DYNAMIC GREETING & TYPEWRITER ──────── */
(function renderGreeting() {
    const hour = new Date().getHours();
    let msg;
    if      (hour >= 5  && hour < 12) msg = '☀️ Good morning! Welcome to my portfolio.';
    else if (hour >= 12 && hour < 17) msg = '🌤️ Good afternoon! Glad you stopped by.';
    else if (hour >= 17 && hour < 21) msg = '🌆 Good evening! Take a look around.';
    else                               msg = '🌙 Late-night browsing? Welcome!';
    
    const el = document.getElementById('dynamic-greeting');
    if (!el) return;

    el.textContent = '';
    let i = 0;
    function typeWriter() {
        if (i < msg.length) {
            el.textContent += msg.charAt(i);
            i++;
            setTimeout(typeWriter, 40);
        }
    }
    setTimeout(typeWriter, 500);
})();


/* ─── 1. THEME TOGGLE ──────────────────────── */
const THEME_KEY = 'portfolio-theme';
const themeToggle = document.getElementById('theme-toggle');
const themeLabel  = document.getElementById('theme-label');
const themeIcon   = document.getElementById('theme-icon');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeLabel.textContent = 'Light';
        themeIcon.textContent  = '☾';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeLabel.textContent = 'Dark';
        themeIcon.textContent  = '☀';
    }
}

function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

applyTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.hasAttribute('data-theme');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
    if (window.updateCanvasTheme) window.updateCanvasTheme(next);
});


/* ─── 2. SCROLL REVEAL & PROGRESS ──────────── */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    if (!scrollProgress) return;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
}, { passive: true });


/* ─── 3. PROJECT FILTER, SEARCH & SORT ──────── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectGrid  = document.getElementById('project-grid');
const searchInput  = document.getElementById('project-search');
const noResults    = document.getElementById('no-results');
const sortSelect   = document.getElementById('sort-select');

let activeFilter = 'all';

function getProjectCards() {
    return Array.from(projectGrid.querySelectorAll('.project-card'));
}

function filterAndSort() {
    const query = searchInput.value.trim().toLowerCase();
    const sortVal = sortSelect.value;
    let cards = getProjectCards();

    // 1. Filter
    let visibleCards = [];
    cards.forEach(card => {
        const tags      = card.getAttribute('data-tags') || '';
        const text      = card.textContent.toLowerCase();
        const tagMatch  = activeFilter === 'all' || tags.includes(activeFilter);
        const searchMatch = query === '' || text.includes(query);

        if (tagMatch && searchMatch) {
            card.classList.remove('hidden-card');
            visibleCards.push(card);
        } else {
            card.classList.add('hidden-card');
        }
    });

    noResults.classList.toggle('hidden', visibleCards.length > 0);

    // 2. Sort visible cards
    if (sortVal !== 'default') {
        visibleCards.sort((a, b) => {
            const nameA = a.querySelector('h3')?.textContent.trim().toLowerCase() || '';
            const nameB = b.querySelector('h3')?.textContent.trim().toLowerCase() || '';
            if (sortVal === 'name-asc')  return nameA.localeCompare(nameB);
            if (sortVal === 'name-desc') return nameB.localeCompare(nameA);
            return 0;
        });

        // Re-append in sorted order (hidden cards stay but sorted ones come first)
        visibleCards.forEach(card => projectGrid.appendChild(card));
    }
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        filterAndSort();
    });
});

searchInput.addEventListener('input', filterAndSort);
sortSelect.addEventListener('change', filterAndSort);


/* ─── 4. GITHUB API ────────────────────────── */
const GITHUB_USERNAME  = 'Abdullah-Zh';
const GITHUB_API_URL   = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;

const githubLoading = document.getElementById('github-loading');
const githubError   = document.getElementById('github-error');
const githubEmpty   = document.getElementById('github-empty');
const githubGrid    = document.getElementById('github-grid');
const retryBtn      = document.getElementById('retry-github');

function renderRepos(repos) {
    githubGrid.innerHTML = '';

    if (!repos || repos.length === 0) {
        githubLoading.classList.add('hidden');
        githubEmpty.classList.remove('hidden');
        return;
    }

    repos.forEach((repo, i) => {
        const card = document.createElement('div');
        card.className = 'repo-card';
        card.style.animationDelay = `${i * 0.07}s`;

        const desc = repo.description || 'No description provided.';
        const lang = repo.language
            ? `<span class="repo-lang">${repo.language}</span>`
            : '';
        const stars = `<span>★ ${repo.stargazers_count}</span>`;

        card.innerHTML = `
            <a class="repo-name" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
            <p class="repo-desc">${desc}</p>
            <div class="repo-meta">${lang}${stars}</div>
        `;

        githubGrid.appendChild(card);
    });

    githubLoading.classList.add('hidden');
    githubGrid.classList.remove('hidden');
}

function showGithubError() {
    githubLoading.classList.add('hidden');
    githubError.classList.remove('hidden');
}

async function fetchRepos() {
    githubError.classList.add('hidden');
    githubEmpty.classList.add('hidden');
    githubGrid.classList.add('hidden');
    githubLoading.classList.remove('hidden');

    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
        const repos = await response.json();
        const ownRepos = repos.filter(r => !r.fork);
        renderRepos(ownRepos);
    } catch (err) {
        console.warn('GitHub fetch failed:', err.message);
        const fallback = [
            { name: '202265440-Abdullah-Alzahrani-assignment1', description: 'Personal portfolio website — Assignment 1 for SWE Foundation course at KFUPM.', html_url: 'https://github.com/Abdullah-Zh', language: 'HTML', stargazers_count: 0, fork: false },
            { name: '202265440-Abdullah-Alzahrani-assignment2', description: 'Interactive portfolio website — Assignment 2 with dynamic features and API integration.', html_url: 'https://github.com/Abdullah-Zh', language: 'JavaScript', stargazers_count: 0, fork: false },
            { name: '202265440-Abdullah-Alzahrani-assignment3', description: 'Advanced portfolio — Assignment 3 with sorting, state management, and performance optimizations.', html_url: 'https://github.com/Abdullah-Zh', language: 'JavaScript', stargazers_count: 0, fork: false },
        ];
        renderRepos(fallback);
    }
}

retryBtn.addEventListener('click', fetchRepos);
fetchRepos();


/* ─── 5. CONTACT FORM VALIDATION ──────────── */
const contactForm  = document.getElementById('contact-form');
const formSuccess  = document.getElementById('form-success');
const submitBtn    = document.getElementById('submit-btn');

function setError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.classList.add('error');
    error.textContent = message;
}

function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.classList.remove('error');
    error.textContent = '';
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

['name', 'email', 'message'].forEach(id => {
    const input = document.getElementById(id);
    const errorId = `${id}-error`;
    input.addEventListener('input', () => clearError(id, errorId));
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid = true;

    if (!name) {
        setError('name', 'name-error', 'Please enter your full name.');
        isValid = false;
    } else if (name.length < 2) {
        setError('name', 'name-error', 'Name must be at least 2 characters.');
        isValid = false;
    } else {
        clearError('name', 'name-error');
    }

    if (!email) {
        setError('email', 'email-error', 'Please enter your email address.');
        isValid = false;
    } else if (!validateEmail(email)) {
        setError('email', 'email-error', 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearError('email', 'email-error');
    }

    if (!message) {
        setError('message', 'message-error', 'Please write a message before sending.');
        isValid = false;
    } else if (message.length < 10) {
        setError('message', 'message-error', 'Message must be at least 10 characters.');
        isValid = false;
    } else {
        clearError('message', 'message-error');
    }

    if (!isValid) return;

    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending…';

    setTimeout(() => {
        contactForm.reset();
        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
    }, 1200);
});


/* ─── 6. SCROLL-TO-TOP BUTTON ─────────────── */
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('hidden', window.scrollY < 400);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


/* ─── 7. MAGNETIC BUTTONS ──────────────────── */
if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.btn, .social-btn').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });
}


/* ─── 8. 3D TILT EFFECT ────────────────────── */
function applyTilt(elements) {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    elements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
            const rotateY = ((x - rect.width  / 2) / (rect.width  / 2)) *  5;
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

applyTilt(document.querySelectorAll('.profile-img'));
const tiltObserver = new MutationObserver(() => {
    applyTilt(document.querySelectorAll('.project-card, .repo-card'));
});
tiltObserver.observe(document.body, { childList: true, subtree: true });
applyTilt(document.querySelectorAll('.project-card'));


/* ─── 9. INTERACTIVE BACKGROUND CANVAS ─────── */
const canvas = document.getElementById('bg-canvas');
if (canvas && window.matchMedia('(pointer: fine)').matches) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let isDark = document.documentElement.hasAttribute('data-theme');
    const PAR_NUM = 40;
    const CONNECT_DIST = 150;
    const MOUSE_DIST = 200;
    let scrollY = window.scrollY;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
    window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

    function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.baseY = this.y;
            this.parallaxFactor = Math.random() * 0.3 + 0.1;
        }
        update() {
            this.x += this.vx;
            this.baseY += this.vy;
            this.y = this.baseY - (scrollY * this.parallaxFactor);
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.baseY < -500) this.baseY = height + 500;
            if (this.baseY > height + 500) this.baseY = -500;
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_DIST) {
                const force = (MOUSE_DIST - dist) / MOUSE_DIST;
                this.x -= (dx / dist) * force * 2;
                this.baseY -= (dy / dist) * force * 2;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(225, 29, 72, 0.15)';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < PAR_NUM; i++) particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    const opacity = 1 - (dist / CONNECT_DIST);
                    ctx.strokeStyle = isDark
                        ? `rgba(255, 255, 255, ${opacity * 0.1})`
                        : `rgba(225, 29, 72, ${opacity * 0.1})`;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => { resize(); initParticles(); });
    window.updateCanvasTheme = (theme) => { isDark = theme === 'dark'; };
    resize();
    initParticles();
    animate();
}


/* ─── 10. VISIT DURATION TIMER ─────────────── */
(function initTimer() {
    const timerEl = document.getElementById('visit-timer');
    if (!timerEl) return;

    const startTime = Date.now();

    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        if (totalSeconds < 60) return `${totalSeconds}s`;
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}m ${secs}s`;
    }

    setInterval(() => {
        timerEl.textContent = formatTime(Date.now() - startTime);
    }, 1000);
})();


/* ─── 11. VISITOR NAME STATE (localStorage) ── */
(function initVisitorName() {
    const VISITOR_KEY    = 'portfolio-visitor-name';
    const input          = document.getElementById('visitor-input');
    const saveBtn        = document.getElementById('visitor-save-btn');
    const greetingEl     = document.getElementById('visitor-greeting');
    const nameWrap       = document.getElementById('visitor-name-wrap');

    if (!input || !saveBtn || !greetingEl) return;

    function showGreeting(name) {
        greetingEl.textContent = `Hey, ${name}! 👋`;
        greetingEl.classList.remove('hidden');
        nameWrap.style.display = 'none';
    }

    // Restore saved name on page load
    const saved = localStorage.getItem(VISITOR_KEY);
    if (saved) {
        input.value = saved;
        showGreeting(saved);
    }

    saveBtn.addEventListener('click', () => {
        const name = input.value.trim();
        if (!name) {
            input.focus();
            input.style.borderColor = 'var(--accent)';
            setTimeout(() => { input.style.borderColor = ''; }, 800);
            return;
        }
        localStorage.setItem(VISITOR_KEY, name);
        showGreeting(name);
    });

    // Also allow Enter key
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveBtn.click();
    });
})();


/* ─── ASSIGNMENT 4 FEATURES ──────────────────── */

/* A. TYPEWRITER EFFECT */
(function initTypewriter() {
    const el = document.getElementById('typewriter-role');
    if (!el) return;
    const roles = ['Developer', 'Designer', 'Problem Solver', 'Team Leader', 'Intern Hunter 👀'];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const current = roles[roleIndex];
        if (!deleting) {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
        } else {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }
        setTimeout(type, deleting ? 60 : 100);
    }
    setTimeout(type, 1200);
})();


/* B. COLOR THEME SWITCHER */
(function initColorThemes() {
    const COLOR_KEY = 'portfolio-color';
    const dots = document.querySelectorAll('.color-dot');
    if (!dots.length) return;

    function applyColor(color) {
        document.documentElement.setAttribute('data-color', color === 'default' ? '' : color);
        if (color === 'default') {
            document.documentElement.removeAttribute('data-color');
        }
        dots.forEach(d => d.classList.toggle('active', d.getAttribute('data-color') === color));
        localStorage.setItem(COLOR_KEY, color);
    }

    // Restore saved color
    const saved = localStorage.getItem(COLOR_KEY) || 'default';
    applyColor(saved);

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            applyColor(dot.getAttribute('data-color'));
        });
    });
})();


/* C. ANIMATED SKILL BARS */
(function initSkillBars() {
    const fills = document.querySelectorAll('.skill-bar-fill');
    if (!fills.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const target = fill.getAttribute('data-width');
                // Small delay so reveal animation plays first
                setTimeout(() => {
                    fill.style.width = target + '%';
                }, 200);
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(fill => observer.observe(fill));
})();


/* D. TIMELINE REVEAL (uses existing revealObserver) */
// Timeline items already have .reveal class so they animate in automatically.
// Extra: add staggered delays
document.querySelectorAll('.timeline-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.1}s`;
});
