// Descargar CV
function descargarCV() {
    const enlace = document.createElement("a");
    enlace.href = "archivos/cv rodrigo mella.pdf";
    enlace.download = "cv rodrigo mella.pdf";
    enlace.click();
}

function renderContactButtons() {
    const container = document.getElementById('contact-buttons');
    if (!container) return;

    const contactLinks = [
        {
            label: 'LinkedIn',
            icon: 'bi-linkedin',
            href: 'https://www.linkedin.com/in/rodrigo-mella-2369ab360',
            external: true
        },
        {
            label: 'GitHub',
            icon: 'bi-github',
            href: 'https://github.com/Rxdrig',
            external: true
        }
    ];

    container.innerHTML = '';

    contactLinks.forEach((item) => {
        const link = document.createElement('a');
        link.className = 'contact-card';
        link.href = item.href;
        link.setAttribute('aria-label', item.label);

        if (item.external) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }

        link.innerHTML = `<i class="bi ${item.icon}"></i> ${item.label}`;

        link.addEventListener('click', () => {
            link.classList.add('is-clicked');
            setTimeout(() => link.classList.remove('is-clicked'), 180);
        });

        container.appendChild(link);
    });
}

// Scroll reveal using IntersectionObserver
document.addEventListener('DOMContentLoaded', function(){
    renderContactButtons();

    document.querySelectorAll('.skill-row.reveal').forEach((row, index) => {
        row.style.setProperty('--reveal-delay', `${index * 120}ms`);
    });

    const heroReveal = document.querySelector('#home.reveal');
    if (heroReveal) {
        requestAnimationFrame(() => {
            heroReveal.classList.add('show');
        });
    }

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add('show');
                // optional: unobserve after show
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.reveal, .project-card').forEach(el=> {
        if (el !== heroReveal) {
            observer.observe(el);
        }
    });

    // Mobile nav panel toggle: slide-down panel using #primary-nav.mobile-panel
    const headerEl = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.querySelector('#primary-nav');

    function lockScroll(lock) {
        try {
            if (lock) document.body.style.overflow = 'hidden';
            else document.body.style.overflow = '';
        } catch (err) {
            if (lock) document.documentElement.style.overflow = 'hidden';
            else document.documentElement.style.overflow = '';
        }
    }

    if (navToggle && headerEl && siteNav) {
        // ensure mobile-panel class exists for mobile behavior
        siteNav.classList.add('mobile-panel');

        // create overlay if not present
        let navOverlay = document.querySelector('.nav-overlay');
        if (!navOverlay) {
            navOverlay = document.createElement('div');
            navOverlay.className = 'nav-overlay';
            document.body.appendChild(navOverlay);
        }

        // toggle handler
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = headerEl.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const icon = navToggle.querySelector('i');
            if (icon) icon.className = isOpen ? 'bi bi-x' : 'bi bi-list';
            siteNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
            lockScroll(isOpen);
            if (isOpen) {
                navOverlay.classList.add('visible');
                // focus first link for accessibility
                setTimeout(() => siteNav.querySelector('.nav-link')?.focus(), 220);
            } else {
                navOverlay.classList.remove('visible');
            }
        });

        // Close when clicking a nav link
        siteNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                headerEl.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
                siteNav.setAttribute('aria-hidden', 'true');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'bi bi-list';
                lockScroll(false);
                navOverlay.classList.remove('visible');
            });
        });

        // Close when clicking outside (overlay) or pressing Escape
        navOverlay.addEventListener('click', () => {
            if (headerEl.classList.contains('nav-open')) {
                headerEl.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
                siteNav.setAttribute('aria-hidden', 'true');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'bi bi-list';
                lockScroll(false);
                navOverlay.classList.remove('visible');
            }
        });

        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' && headerEl.classList.contains('nav-open')) {
                headerEl.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
                siteNav.setAttribute('aria-hidden', 'true');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'bi bi-list';
                lockScroll(false);
                navOverlay.classList.remove('visible');
            }
        });

        // If resizing to desktop, ensure panel closed and overlay removed
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900 && headerEl.classList.contains('nav-open')) {
                headerEl.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
                siteNav.setAttribute('aria-hidden', 'false');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'bi bi-list';
                lockScroll(false);
                navOverlay.classList.remove('visible');
            }
        });
    }
});
