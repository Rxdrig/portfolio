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

    // Mobile nav toggle: abre/cierra menú vertical, bloquea scroll y cierra con Escape
    const headerEl = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.querySelector('#primary-nav');

    function lockScroll(lock) {
        if (lock) document.documentElement.style.overflow = 'hidden';
        else document.documentElement.style.overflow = '';
    }

    if (navToggle && headerEl) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = headerEl.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const icon = navToggle.querySelector('i');
            if (icon) icon.className = isOpen ? 'bi bi-x' : 'bi bi-list';
            lockScroll(isOpen);
        });

        siteNav?.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                headerEl.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'bi bi-list';
                lockScroll(false);
            });
        });

        document.addEventListener('click', (ev) => {
            if (!headerEl.contains(ev.target) && headerEl.classList.contains('nav-open')) {
                headerEl.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'bi bi-list';
                lockScroll(false);
            }
        });

        document.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' && headerEl.classList.contains('nav-open')) {
                headerEl.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'bi bi-list';
                lockScroll(false);
            }
        });
    }
});
