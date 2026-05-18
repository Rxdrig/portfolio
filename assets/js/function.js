function descargarCV() {
    const link = document.createElement('a');
    link.href = 'archivos/cv rodrigo mella.pdf';
    link.download = 'cv rodrigo mella.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
}

function createSkillCard(skill) {
    const article = document.createElement('article');
    article.className = 'skill-card reveal';
    article.innerHTML = `
        <div class="skill-card-head">
            <div class="skill-icon"><i class="bi ${skill.icon}"></i></div>
            <h3>${skill.title}</h3>
        </div>
        <ul class="skill-list">
            ${skill.items.map((item) => `<li>${item}</li>`).join('')}
        </ul>
    `;
    return article;
}

function createProjectCard(project, index) {
    const carouselId = `carousel-${index}`;
    const modalId = `imageModal-${index}`;
    const article = document.createElement('article');
    article.className = 'project-card reveal';
    
    const hasMultipleImages = project.images && project.images.length > 1;
    
    article.innerHTML = `
        <div class="project-surface">
            <div class="project-visual">
                <span class="project-badge">${project.badge}</span>
                
                <!-- Carrusel Mini -->
                <div class="project-carousel" data-carousel-id="${carouselId}">
                    <div class="carousel-images">
                        ${project.images.map((img, i) => `
                            <img 
                                src="${img}" 
                                alt="${project.title} - Imagen ${i + 1}"
                                class="carousel-image ${i === 0 ? 'active' : ''}"
                                data-image-index="${i}"
                                data-modal-id="${modalId}"
                                style="cursor: pointer;"
                            >
                        `).join('')}
                    </div>
                    
                    ${hasMultipleImages ? `
                        <button class="carousel-nav carousel-prev" data-carousel-id="${carouselId}" aria-label="Imagen anterior">
                            <i class="bi bi-chevron-left"></i>
                        </button>
                        <button class="carousel-nav carousel-next" data-carousel-id="${carouselId}" aria-label="Imagen siguiente">
                            <i class="bi bi-chevron-right"></i>
                        </button>
                        
                        <div class="carousel-indicators">
                            ${project.images.map((_, i) => `
                                <button 
                                    class="indicator ${i === 0 ? 'active' : ''}" 
                                    data-carousel-id="${carouselId}"
                                    data-slide="${i}"
                                    aria-label="Ir a imagen ${i + 1}"
                                ></button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="project-actions">
                    <a class="project-action-btn" href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="Ver código de ${project.title}"><i class="bi bi-github"></i></a>
                    <a class="project-action-btn" href="${project.demo}" target="_blank" rel="noopener noreferrer" aria-label="Ver demo de ${project.title}"><i class="bi bi-box-arrow-up-right"></i></a>
                </div>
            </div>
            
            <div class="project-copy">
                <div class="project-meta-row">
                    <span class="project-index">${project.metric}</span>
                    <span class="project-status">${project.status}</span>
                </div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p class="project-summary">${project.summary}</p>
                <div class="project-tech">
                    ${project.technologies.map((technology) => `<span>${technology}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    return article;
}

function renderSkills() {
    const container = document.getElementById('skills-grid');
    if (!container) return;
    container.innerHTML = '';
    cardsData.skills.forEach((skill, index) => {
        const card = createSkillCard(skill);
        card.style.setProperty('--reveal-delay', `${index * 120}ms`);
        container.appendChild(card);
    });
}

function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    container.innerHTML = '';
    // Mostrar solo las primeras 2 proyectos
    cardsData.projects.slice(0, 2).forEach((project, index) => {
        const card = createProjectCard(project, index);
        card.style.setProperty('--reveal-delay', `${index * 140}ms`);
        container.appendChild(card);
    });
}

function setupDownloadButton() {
    const downloadButton = document.querySelector('[data-download-cv]');
    if (!downloadButton) return;

    downloadButton.addEventListener('click', descargarCV);
}

let contactStatusHideTimer = null;
let contactStatusClearTimer = null;

function showContactStatus(message, isError = false) {
    const status = document.getElementById('contact-status');
    if (!status) return;

    window.clearTimeout(contactStatusHideTimer);
    window.clearTimeout(contactStatusClearTimer);

    status.textContent = message;
    status.classList.add('is-visible');
    status.classList.toggle('is-error', isError);

    contactStatusHideTimer = window.setTimeout(() => {
        status.classList.remove('is-visible', 'is-error');
        contactStatusClearTimer = window.setTimeout(() => {
            status.textContent = '';
        }, 280);
    }, 6000);
}

function setupContactStatus() {
    const params = new URLSearchParams(window.location.search);
    const sent = params.get('contact') === 'success';

    if (sent) {
        showContactStatus('Mensaje enviado. Te responderé pronto.');
    }
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton ? submitButton.textContent : '';

        try {
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
            }

            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('No se pudo enviar el mensaje.');
            }

            form.reset();
            showContactStatus('Mensaje enviado con éxito.');
        } catch (error) {
            showContactStatus('No se pudo enviar el mensaje. Intenta de nuevo.', true);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }
    });
}

function setHeaderState() {
    const header = document.getElementById('site-header');
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
}

function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('primary-nav');
    const header = document.getElementById('site-header');

    if (!navToggle || !nav || !header) return;

    const closeNav = () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'bi bi-list';
    };

    navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
    });

    nav.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 900) {
                closeNav();
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (window.innerWidth < 900 && nav.classList.contains('is-open')) {
            const clickedInsideNav = nav.contains(event.target);
            const clickedToggle = navToggle.contains(event.target);
            if (!clickedInsideNav && !clickedToggle) {
                closeNav();
            }
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNav();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 900) {
            closeNav();
        }
    });
}

function setupBackToTop() {
    const backToTop = document.querySelector('[data-back-to-top]');
    if (!backToTop) return;

    const updateVisibility = () => {
        backToTop.classList.toggle('is-visible', window.scrollY > 280);
    };

    backToTop.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Remover clase 'show' de todos los elementos reveal
        document.querySelectorAll('.reveal').forEach((element) => {
            element.classList.remove('show');
        });
        
        // Reiniciar observer
        setupRevealObserver();
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
}

function setupRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -12% 0px'
    });

    document.querySelectorAll('.reveal').forEach((element) => {
        observer.observe(element);
    });
}

function goToCarouselSlide(carouselId, slideIndex) {
    const carousel = document.querySelector(`[data-carousel-id="${carouselId}"]`);
    if (!carousel) return;
    
    const images = carousel.querySelectorAll('.carousel-image');
    const indicators = carousel.querySelectorAll('.indicator');
    
    // Validar índice
    slideIndex = (slideIndex + images.length) % images.length;
    
    // Actualizar imágenes
    images.forEach((img, i) => {
        img.classList.toggle('active', i === slideIndex);
    });
    
    // Actualizar indicadores
    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === slideIndex);
    });
}

function initializeCarousels() {
    // Navegación con flechas
    document.querySelectorAll('.carousel-nav').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const carouselId = btn.dataset.carouselId;
            const carousel = document.querySelector(`[data-carousel-id="${carouselId}"]`);
            const currentActive = carousel.querySelector('.carousel-image.active');
            const images = carousel.querySelectorAll('.carousel-image');
            const currentIndex = Array.from(images).indexOf(currentActive);
            
            const isNext = btn.classList.contains('carousel-next');
            const newIndex = isNext ? currentIndex + 1 : currentIndex - 1;
            
            goToCarouselSlide(carouselId, newIndex);
        });
    });
    
    // Indicadores
    document.querySelectorAll('.carousel-indicators .indicator').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const carouselId = btn.dataset.carouselId;
            const slideIndex = parseInt(btn.dataset.slide);
            goToCarouselSlide(carouselId, slideIndex);
        });
    });
    
    // Click en imagen para abrir modal
    document.querySelectorAll('.carousel-image').forEach((img) => {
        img.addEventListener('click', () => {
            const modalId = img.dataset.modalId;
            const modal = new bootstrap.Modal(document.getElementById(modalId));
            
            // Actualizar imagen del modal
            const modalImage = document.querySelector(`#${modalId} .modal-image`);
            const carouselId = img.closest('[data-carousel-id]').dataset.carouselId;
            const images = img.closest('[data-carousel-id]').querySelectorAll('.carousel-image');
            const imageIndex = Array.from(images).indexOf(img);
            
            if (modalImage) {
                modalImage.src = img.src;
                modalImage.dataset.currentIndex = imageIndex;
                modalImage.dataset.carouselId = carouselId;
            }
            
            modal.show();
        });
    });
    
    // Navegación en el modal
    document.querySelectorAll('.modal-carousel-nav').forEach((btn) => {
        btn.addEventListener('click', () => {
            const modalImage = btn.closest('.modal-body').querySelector('.modal-image');
            if (!modalImage) return;
            
            const carouselId = modalImage.dataset.carouselId;
            const carousel = document.querySelector(`[data-carousel-id="${carouselId}"]`);
            const images = carousel.querySelectorAll('.carousel-image');
            let currentIndex = parseInt(modalImage.dataset.currentIndex) || 0;
            
            const isNext = btn.classList.contains('modal-next');
            currentIndex = isNext ? currentIndex + 1 : currentIndex - 1;
            currentIndex = (currentIndex + images.length) % images.length;
            
            const newImage = images[currentIndex];
            modalImage.src = newImage.src;
            modalImage.dataset.currentIndex = currentIndex;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    renderProjects();
    initializeCarousels();
    setupDownloadButton();
    setupContactStatus();
    setupContactForm();
    setupNavigation();
    setupBackToTop();
    setupRevealObserver();
    setHeaderState();

    window.addEventListener('scroll', setHeaderState, { passive: true });

    requestAnimationFrame(() => {
        document.querySelectorAll('.hero .reveal').forEach((element) => {
            element.classList.add('show');
        });
    });
});
