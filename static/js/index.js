// =====================================================
// PROFESSIONAL PHOTOGRAPHY PORTFOLIO - JAVASCRIPT
// ===================================================== //

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Service Card Background Images
function initServiceCardBackgrounds() {
    document.querySelectorAll('.service-card').forEach((card, index) => {
        const bgImage = card.getAttribute('data-bg');

        if (bgImage) {
            const img = new Image();
            img.onload = () => {
                // Set CSS variable
                card.style.setProperty('--bg-image', `url("${bgImage}")`);

                // Also set inline background as backup
                const isDarkMode = !document.body.classList.contains('light-mode');
                if (isDarkMode) {
                    card.style.backgroundImage = `linear-gradient(180deg, rgba(15, 15, 15, 0.4) 0%, rgba(15, 15, 15, 0.95) 100%), url("${bgImage}")`;
                } else {
                    card.style.backgroundImage = `linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.95) 100%), url("${bgImage}")`;
                }
                card.style.backgroundSize = 'cover';
                card.style.backgroundPosition = 'center';
                card.classList.add('bg-loaded');
            };
            img.onerror = () => {
                card.classList.add('bg-fallback');
            };
            img.src = bgImage;
        } else {
            card.classList.add('bg-fallback');
        }
    });
}

// Smooth Scroll Navigation
function initSmoothScroll() {
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');

    // Update active navigation on scroll
    const updateActiveNav = () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // Smooth scroll on nav click
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById(this.getAttribute('data-section'));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // CTA button smooth scroll
    const ctaButtons = document.querySelectorAll('.cta-group a');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Top Bar Scroll Effect
function initTopBarScroll() {
    const topBar = document.querySelector('.top-bar');

    const handleScroll = () => {
        if (window.scrollY > 100) {
            topBar.classList.add('scrolled');
        } else {
            topBar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Image Gallery Modal
function initImageModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const serviceCards = document.querySelectorAll('.service-card');

    // Create modal if doesn't exist
    let modal = document.querySelector('.image-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img src="" alt="">
            </div>
        `;
        document.body.appendChild(modal);
    }

    const modalImg = modal.querySelector('.modal-content img');
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    const openModal = (imgSrc, imgAlt) => {
        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openModal(img.src, img.alt);
            }
        });
    });

    // Service cards
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('.service-bg-img');
            if (img) {
                openModal(img.src, img.alt);
            }
        });
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Scroll Progress Bar
function initScrollProgress() {
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }

    const updateProgress = () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
}

// Contact Form Submission
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitBtn.disabled = true;

        fetch(this.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Message sent successfully!');
                this.reset();
            } else {
                alert('Failed to send message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Language Switcher
const translations = {
    en: {
        nav: {
            services: "Services",
            gallery: "Gallery",
            contact: "Contact"
        },
        hero: {
            title: "PHOTOGRAPHY",
            subtitle: "OUSSAMA ABIBA",
            tagline: "Capturing Moments, Creating Memories",
            cta1: "View Portfolio",
            cta2: "Get in Touch"
        },
        services: {
            title: "Our Services",
            subtitle: "Professional photography services tailored to your needs",
            wedding: {
                title: "Wedding Photography",
                desc: "Capturing your special day with artistry and emotion"
            },
            portrait: {
                title: "Portrait Sessions",
                desc: "Professional portraits that capture your unique personality"
            },
            event: {
                title: "Event Coverage",
                desc: "Comprehensive coverage of your special events"
            },
            commercial: {
                title: "Commercial Photography",
                desc: "High-quality images for your business needs"
            },
            food: {
                title: "Food Photography",
                desc: "Delicious visuals that make your dishes irresistible"
            },
            product: {
                title: "Product Photography",
                desc: "Stunning product images that drive sales"
            },
            real_estate: {
                title: "Real Estate Photography",
                desc: "Professional property photography that sells"
            },
            fashion: {
                title: "Fashion Photography",
                desc: "Editorial and commercial fashion photography"
            },
            aerial: {
                title: "Aerial/Drone Photography",
                desc: "Unique perspectives from above"
            }
        },
        stats: {
            projects: "Projects Completed",
            clients: "Happy Clients",
            awards: "Awards Won",
            experience: "Years Experience"
        },
        gallery: {
            title: "Portfolio",
            subtitle: "A showcase of our finest work"
        },
        contact: {
            title: "Get In Touch",
            subtitle: "Let's create something amazing together",
            phone: "Phone",
            email: "Email",
            location: "Location",
            service: "Select Service",
            name: "Your Name",
            emailLabel: "Your Email",
            message: "Your Message",
            submit: "Send Message"
        },
        footer: {
            copyright: "© 2024 Oussama Abiba Photography. All rights reserved."
        }
    },
    fr: {
        nav: {
            services: "Services",
            gallery: "Galerie",
            contact: "Contact"
        },
        hero: {
            title: "PHOTOGRAPHIE",
            subtitle: "OUSSAMA ABIBA",
            tagline: "Capturer des moments, créer des souvenirs",
            cta1: "Voir le Portfolio",
            cta2: "Nous Contacter"
        },
        services: {
            title: "Nos Services",
            subtitle: "Services de photographie professionnels adaptés à vos besoins",
            wedding: {
                title: "Photographie de Mariage",
                desc: "Capturer votre jour spécial avec art et émotion"
            },
            portrait: {
                title: "Séances Portrait",
                desc: "Portraits professionnels qui capturent votre personnalité unique"
            },
            event: {
                title: "Couverture d'Événements",
                desc: "Couverture complète de vos événements spéciaux"
            },
            commercial: {
                title: "Photographie Commerciale",
                desc: "Images de haute qualité pour vos besoins professionnels"
            },
            food: {
                title: "Photographie Culinaire",
                desc: "Des visuels délicieux qui rendent vos plats irrésistibles"
            },
            product: {
                title: "Photographie de Produits",
                desc: "Images de produits époustouflantes qui stimulent les ventes"
            },
            real_estate: {
                title: "Photographie Immobilière",
                desc: "Photographie professionnelle de propriétés qui vend"
            },
            fashion: {
                title: "Photographie de Mode",
                desc: "Photographie de mode éditoriale et commerciale"
            },
            aerial: {
                title: "Photographie Aérienne/Drone",
                desc: "Perspectives uniques d'en haut"
            }
        },
        stats: {
            projects: "Projets Réalisés",
            clients: "Clients Satisfaits",
            awards: "Prix Gagnés",
            experience: "Ans d'Expérience"
        },
        gallery: {
            title: "Portfolio",
            subtitle: "Une vitrine de nos meilleurs travaux"
        },
        contact: {
            title: "Contactez-Nous",
            subtitle: "Créons quelque chose d'incroyable ensemble",
            phone: "Téléphone",
            email: "Email",
            location: "Localisation",
            service: "Sélectionner un Service",
            name: "Votre Nom",
            emailLabel: "Votre Email",
            message: "Votre Message",
            submit: "Envoyer le Message"
        },
        footer: {
            copyright: "© 2024 Oussama Abiba Photographie. Tous droits réservés."
        }
    },
    es: {
        nav: {
            services: "Servicios",
            gallery: "Galería",
            contact: "Contacto"
        },
        hero: {
            title: "FOTOGRAFÍA",
            subtitle: "OUSSAMA ABIBA",
            tagline: "Capturando momentos, creando recuerdos",
            cta1: "Ver Portafolio",
            cta2: "Contáctanos"
        },
        services: {
            title: "Nuestros Servicios",
            subtitle: "Servicios de fotografía profesional adaptados a sus necesidades",
            wedding: {
                title: "Fotografía de Bodas",
                desc: "Capturando tu día especial con arte y emoción"
            },
            portrait: {
                title: "Sesiones de Retrato",
                desc: "Retratos profesionales que capturan tu personalidad única"
            },
            event: {
                title: "Cobertura de Eventos",
                desc: "Cobertura completa de sus eventos especiales"
            },
            commercial: {
                title: "Fotografía Comercial",
                desc: "Imágenes de alta calidad para sus necesidades comerciales"
            },
            food: {
                title: "Fotografía de Alimentos",
                desc: "Visuales deliciosos que hacen tus platos irresistibles"
            },
            product: {
                title: "Fotografía de Productos",
                desc: "Impresionantes imágenes de productos que impulsan las ventas"
            },
            real_estate: {
                title: "Fotografía Inmobiliaria",
                desc: "Fotografía profesional de propiedades que vende"
            },
            fashion: {
                title: "Fotografía de Moda",
                desc: "Fotografía de moda editorial y comercial"
            },
            aerial: {
                title: "Fotografía Aérea/Drone",
                desc: "Perspectivas únicas desde arriba"
            }
        },
        stats: {
            projects: "Proyectos Completados",
            clients: "Clientes Felices",
            awards: "Premios Ganados",
            experience: "Años de Experiencia"
        },
        gallery: {
            title: "Portafolio",
            subtitle: "Una muestra de nuestro mejor trabajo"
        },
        contact: {
            title: "Póngase en Contacto",
            subtitle: "Creemos algo increíble juntos",
            phone: "Teléfono",
            email: "Email",
            location: "Ubicación",
            service: "Seleccionar Servicio",
            name: "Tu Nombre",
            emailLabel: "Tu Email",
            message: "Tu Mensaje",
            submit: "Enviar Mensaje"
        },
        footer: {
            copyright: "© 2024 Oussama Abiba Fotografía. Todos los derechos reservados."
        }
    }
};

function initLanguageSwitcher() {
    const languageSwitcher = document.querySelector('.language-switcher');
    const langDropdown = document.querySelector('.lang-dropdown');
    const currentLang = localStorage.getItem('language') || 'en';

    // Function to move selected language to top
    function updateLanguageDisplay(selectedLang) {
        const allButtons = document.querySelectorAll('.lang-btn');
        let selectedButton = null;

        // Find the selected button
        allButtons.forEach(btn => {
            if (btn.dataset.lang === selectedLang) {
                selectedButton = btn;
            }
        });

        if (selectedButton) {
            // Remove all buttons from both containers
            allButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.remove();
            });

            // Add active class to selected button
            selectedButton.classList.add('active');

            // Place selected button at top
            languageSwitcher.insertBefore(selectedButton, langDropdown);

            // Place other buttons in dropdown
            allButtons.forEach(btn => {
                if (btn.dataset.lang !== selectedLang) {
                    langDropdown.appendChild(btn);
                }
            });
        }
    }

    // Set initial language
    updateLanguageDisplay(currentLang);
    applyTranslations(currentLang);

    // Language switch event - use event delegation
    languageSwitcher.addEventListener('click', function(e) {
        if (e.target.classList.contains('lang-btn')) {
            const lang = e.target.dataset.lang;

            localStorage.setItem('language', lang);
            updateLanguageDisplay(lang);
            applyTranslations(lang);
        }
    });
}

function applyTranslations(lang) {
    const trans = translations[lang];

    // Helper function to safely update text content
    const updateText = (selector, text) => {
        const element = document.querySelector(selector);
        if (element) element.textContent = text;
    };

    // Update navigation
    updateText('[data-translate="nav_services"]', trans.nav.services);
    updateText('[data-translate="nav_gallery"]', trans.nav.gallery);
    updateText('[data-translate="nav_contact"]', trans.nav.contact);

    // Update hero section
    updateText('[data-translate="hero_title"]', trans.hero.title);
    updateText('[data-translate="hero_subtitle"]', trans.hero.subtitle);
    updateText('[data-translate="hero_tagline"]', trans.hero.tagline);
    updateText('[data-translate="btn_view_portfolio"]', trans.hero.cta1);
    updateText('[data-translate="btn_book_session"]', trans.hero.cta2);

    // Update services section
    updateText('[data-translate="services_title"]', trans.services.title);
    updateText('[data-translate="services_subtitle"]', trans.services.subtitle);

    // Update stats
    updateText('[data-translate="stats_projects"]', trans.stats.projects);
    updateText('[data-translate="stats_clients"]', trans.stats.clients);
    updateText('[data-translate="stats_experience"]', trans.stats.experience);
    updateText('[data-translate="stats_satisfaction"]', trans.stats.satisfaction);

    // Update gallery
    updateText('[data-translate="gallery_title"]', trans.gallery.title);
    updateText('[data-translate="gallery_subtitle"]', trans.gallery.subtitle);

    // Update contact section
    updateText('[data-translate="contact_title"]', trans.contact.title);
    updateText('[data-translate="contact_subtitle"]', trans.contact.subtitle);
    updateText('[data-translate="contact_studio"]', trans.contact.location);
    updateText('[data-translate="contact_phone"]', trans.contact.phone);
    updateText('[data-translate="contact_email"]', trans.contact.email);

    // Update form placeholders
    const updatePlaceholder = (selector, text) => {
        const element = document.querySelector(selector);
        if (element) element.placeholder = text;
    };

    updatePlaceholder('[data-placeholder="form_name"]', trans.contact.name);
    updatePlaceholder('[data-placeholder="form_email"]', trans.contact.emailLabel);
    updatePlaceholder('[data-placeholder="form_message"]', trans.contact.message);

    // Update form button
    updateText('[data-translate="form_send"]', trans.contact.submit);

    // Update footer
    updateText('[data-translate="footer_rights"]', 'All rights reserved.');
}

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initServiceCardBackgrounds();
    initSmoothScroll();
    initTopBarScroll();
    initImageModal();
    initScrollProgress();
    initContactForm();
    initLanguageSwitcher();
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Add any resize-specific logic here
    }, 250);
}, { passive: true });
