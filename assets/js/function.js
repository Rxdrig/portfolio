function descargarCV() {
    const link = document.createElement('a');
    link.href = 'archivos/cv rodrigo mella.pdf';
    link.download = 'cv rodrigo mella.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
}

const skillCategoryMeta = {
    'Frontend': {
        type: 'frontend',
        badge: 'Client & UI',
        subtitle: 'Interfaces dinámicas, responsivas y accesibles'
    },
    'Backend & Database': {
        type: 'backend',
        badge: 'Server & Data',
        subtitle: 'Arquitectura de servidores, APIs y gestión de datos'
    },
    'Design & Tools': {
        type: 'tools',
        badge: 'Design & Flow',
        subtitle: 'Diseño visual, control de versiones y analítica'
    }
};

const skillTechMeta = {
    'HTML': { icon: 'bi-filetype-html', color: '#e34f26' },
    'CSS': { icon: 'bi-filetype-css', color: '#264de4' },
    'JavaScript': { icon: 'bi-filetype-js', color: '#f7df1e' },
    'React': { svg: `<svg class="tech-svg-icon" viewBox="0 0 115.3 100" width="16" height="16" fill="currentColor"><ellipse cx="57.65" cy="50" rx="16.7" ry="43.4" transform="matrix(0.866 -0.5 0.5 0.866 -17.3 35.65)" fill="none" stroke="currentColor" stroke-width="6"/><ellipse cx="57.65" cy="50" rx="16.7" ry="43.4" transform="matrix(0.866 0.5 -0.5 0.866 32.7 -20.65)" fill="none" stroke="currentColor" stroke-width="6"/><ellipse cx="57.65" cy="50" rx="43.4" ry="16.7" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="57.65" cy="50" r="7.5" fill="currentColor"/></svg>`, color: '#61dafb' },
    'Bootstrap': { icon: 'bi-bootstrap-fill', color: '#7952b3' },
    'Python': { icon: 'bi-filetype-py', color: '#3776ab' },
    'Django': { icon: 'bi-hdd-network-fill', color: '#2ba36c' },
    'Node.js': { icon: 'bi-diagram-2-fill', color: '#68a063' },
    'SQL': { icon: 'bi-filetype-sql', color: '#00758f' },
    'MongoDB': { icon: 'bi-database-fill-gear', color: '#13aa52' },
    'Adobe Photoshop': { icon: 'bi-image-fill', color: '#31a8ff' },
    'Adobe Illustrator': { icon: 'bi-vector-pen', color: '#ff9a00' },
    'Power BI': { icon: 'bi-bar-chart-fill', color: '#f2c811' },
    'Git': { icon: 'bi-git', color: '#f05032' }
};

function createSkillCard(skill) {
    const meta = skillCategoryMeta[skill.title] || {
        type: 'default',
        badge: 'Stack',
        subtitle: 'Herramientas y tecnologías'
    };
    const count = skill.items ? skill.items.length : 0;
    const article = document.createElement('article');
    article.className = `skill-card skill-card--${meta.type} reveal`;
    article.tabIndex = 0;
    article.setAttribute('role', 'region');
    article.setAttribute('aria-label', `${skill.title} - ${count} tecnologías`);
    
    article.innerHTML = `
        <div class="skill-card-top-line"></div>
        <div class="skill-card-head">
            <div class="skill-icon"><i class="bi ${skill.icon}"></i></div>
            <div class="skill-head-info">
                <span class="skill-category-badge">${meta.badge}</span>
                <h3>${skill.title}</h3>
                <p class="skill-subtitle">${meta.subtitle}</p>
            </div>
        </div>

        <div class="skill-card-footer">
            <div class="skill-dropdown-arrow" aria-hidden="true">
                <i class="bi bi-chevron-down"></i>
            </div>
        </div>

        <div class="skill-drawer">
            <div class="skill-drawer-inner">
                <div class="skill-chips-grid">
                    ${skill.items.map((item) => {
                        const tech = skillTechMeta[item];
                        let iconHtml = '<i class="bi bi-code-slash"></i>';
                        let techColor = 'var(--accent)';
                        if (tech) {
                            techColor = tech.color;
                            iconHtml = tech.svg ? tech.svg : `<i class="bi ${tech.icon}"></i>`;
                        }
                        return `
                            <div class="skill-chip" style="--tech-color: ${techColor};">
                                <span class="skill-chip-icon">${iconHtml}</span>
                                <span class="skill-chip-name">${item}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;

    // Soporte táctil en móviles para abrir con tap y soporte para accesibilidad
    article.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
            article.classList.toggle('is-open');
        }
    });

    article.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            article.classList.toggle('is-open');
        }
    });

    return article;
}

function formatCardLabel(value) {
    if (!value) return '';

    return value
        .toString()
        .trim()
        .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getProjectStatusTone(status) {
    const normalized = (status || '').toString().toLowerCase();

    if (normalized.includes('live') || normalized.includes('activo')) {
        return 'live';
    }

    if (normalized.includes('complete') || normalized.includes('complet')) {
        return 'complete';
    }

    if (normalized.includes('develop') || normalized.includes('desarrollo')) {
        return 'development';
    }

    return 'default';
}

function createProjectCard(project, index) {
    const carouselId = `carousel-${index}`;
    const modalId = `imageModal-${index}`;
    const article = document.createElement('article');
    article.className = 'project-card reveal';
    const statusLabel = formatCardLabel(project.status || 'En progreso');
    const statusTone = getProjectStatusTone(project.status);
    
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
                    <a class="project-action-btn" href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="Ver código de ${project.title}">
                        <i class="bi bi-github" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
            
            <div class="project-copy">
                <div class="project-meta-row">
                    <span class="project-index">${project.metric}</span>
                    <span class="project-status project-status--${statusTone}">${statusLabel}</span>
                </div>
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <p class="project-summary">${project.summary}</p>
                <div class="project-tech">
                    ${project.technologies.map((technology) => `<span>${technology}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
    
    return article;
}

function createAboutCard(item) {
    const article = document.createElement('article');
    article.className = 'about-card glass-card reveal';
    article.innerHTML = `
        <div class="about-card-head">
            <div class="about-icon"><i class="bi ${item.icon}"></i></div>
            <h3>${item.title}</h3>
        </div>
        <p>${item.text}</p>
    `;
    return article;
}

function renderAbout() {
    const container = document.getElementById('about-grid');
    if (!container) return;
    container.innerHTML = '';
    if (!Array.isArray(cardsData.about)) return;
    cardsData.about.forEach((it, index) => {
        const card = createAboutCard(it);
        card.style.setProperty('--reveal-delay', `${index * 80}ms`);
        container.appendChild(card);
    });
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
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.reset();
                showContactStatus('Mensaje enviado con éxito. Te responderé pronto.');
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        } catch (error) {
            console.error('Error al enviar:', error);
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
    const nav = document.getElementById('primary-nav');
    if (!nav) return;

    const sections = ['sobre-mi', 'proyectos', 'skills', 'contacto']
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    const navLinks = nav.querySelectorAll('.nav-link');

    const updateActiveNav = () => {
        const scrollPosition = window.scrollY + 160;
        let currentSectionId = '';

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
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
    renderAbout();
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

document.addEventListener('DOMContentLoaded', () => {
  const jsonTrigger = document.getElementById('json-trigger');
  const jsonOverlay = document.getElementById('json-overlay');
  const closeBtn = document.getElementById('close-json-btn');
  const closeX = document.getElementById('close-json-x');

  if (jsonTrigger && jsonOverlay) {
    // Abrir panel
    jsonTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      jsonOverlay.classList.toggle('is-active');
    });

    // Cerrar desde los botones de la tarjeta
    [closeBtn, closeX].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          jsonOverlay.classList.remove('is-active');
        });
      }
    });

    // Cerrar si se hace clic fuera del panel
    document.addEventListener('click', (e) => {
      if (!jsonOverlay.contains(e.target) && !jsonTrigger.contains(e.target)) {
        jsonOverlay.classList.remove('is-active');
      }
    });
  }
});
