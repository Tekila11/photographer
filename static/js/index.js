// Enhanced Mobile-Compatible JavaScript with Advanced Motion Effects

// Smooth scrolling and navigation with enhanced mobile support
document.addEventListener('DOMContentLoaded', function() {
    initServiceCardBackgrounds();
    initAdvancedEffects();
    
    // Enhanced Navigation with touch support
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');
    
    // Optimized scroll handler with throttling
    let scrollTimeout;
    const updateActiveNav = () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
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
                    // Add ripple effect for active state
                    createRipple(dot);
                }
            });
            
            scrollTimeout = null;
        }, 10);
    };
    
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    
    // Enhanced smooth scroll with mobile optimization
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById(this.getAttribute('data-section'));
            if (targetSection) {
                smoothScrollTo(targetSection.offsetTop, 800);
                // Add visual feedback
                this.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
        
        // Touch feedback
        dot.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.2)';
        }, { passive: true });
        
        dot.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
    });
    
    // Enhanced CTA button smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                smoothScrollTo(target.offsetTop, 1000);
                createButtonRipple(this, e);
            }
        });
    });
    
    // Enhanced form handling with better mobile UX
    const contactForm = document.getElementById('styledContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Enhanced loading state with spinner
            submitBtn.innerHTML = '<span class="loading-spinner"></span>Sending...';
            submitBtn.disabled = true;
            submitBtn.style.transform = 'scale(0.98)';
            
            // Form validation with smooth animations
            const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    animateInputError(input);
                }
            });
            
            if (isValid) {
                // Submit the form (already has Formspree action)
                fetch(this.action, {
                    method: this.method,
                    body: new FormData(this)
                }).then(response => {
                    if (response.ok) {
                        submitBtn.innerHTML = '✓ Message Sent!';
                        submitBtn.style.background = '#22c55e';
                        submitBtn.style.transform = 'scale(1.02)';
                        
                        // Reset form with animation
                        setTimeout(() => {
                            this.reset();
                            animateFormReset(inputs);
                        }, 1000);
                        
                        // Reset button after 3 seconds
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            submitBtn.style.background = '';
                            submitBtn.style.transform = '';
                        }, 3000);
                    }
                }).catch(error => {
                    submitBtn.innerHTML = 'Try Again';
                    submitBtn.disabled = false;
                    submitBtn.style.background = '#ef4444';
                    submitBtn.style.transform = '';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                    }, 3000);
                });
            } else {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.transform = '';
            }
        });
        
        // Enhanced input focus effects
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                createInputGlow(this);
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = '';
            });
        });
    }
    
    // Enhanced intersection observer with stagger animations
    const createStaggerObserver = (elements, animationClass, delay = 100) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = `${animationClass} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                    }, index * delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(element => observer.observe(element));
    };
    
    // Service cards stagger animation - simplified approach
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        // Ensure cards are visible
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        
        // Add entrance animation observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'serviceCardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(card);
    });
    
    // Gallery items stagger animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    createStaggerObserver(galleryItems, 'serviceCardEntry', 100);
    
    // Stats animation with enhanced counter effect
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach((counter, index) => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 60; // Smoother animation
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current) + suffix;
                    
                    // Add pulse effect
                    if (Math.floor(current) % 10 === 0) {
                        counter.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            counter.style.transform = '';
                        }, 100);
                    }
                    
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                    // Final celebration effect
                    counter.style.animation = 'numberPulse 0.5s ease-out';
                }
            };
            
            // Delay each counter start
            setTimeout(updateCounter, index * 200);
        });
    };
    
    // Stats section observer
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stat items first
                const statItems = entry.target.querySelectorAll('.stat-item');
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = 'statReveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                    }, index * 100);
                });
                
                // Then animate counters
                setTimeout(animateCounters, 400);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Enhanced parallax with mobile optimization
    let parallaxElements = [];
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground) {
        parallaxElements.push({ element: heroBackground, speed: 0.5 });
    }
    
    const handleParallax = () => {
        if (window.innerWidth > 768) { // Only on desktop
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(({ element, speed }) => {
                const yPos = scrolled * speed;
                element.style.transform = `translateY(${yPos}px)`;
            });
        }
    };
    
    window.addEventListener('scroll', handleParallax, { passive: true });
    
    // Enhanced button ripple effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            createButtonRipple(this, e);
        });
        
        // Touch feedback
        btn.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        btn.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
    });
    
    // Mobile-specific optimizations
    const handleMobileView = () => {
        const isMobile = window.innerWidth <= 768;
        const floatingNav = document.querySelector('.floating-nav');
        
        if (floatingNav) {
            if (isMobile) {
                floatingNav.style.flexDirection = 'row';
                floatingNav.style.bottom = '1.5rem';
                floatingNav.style.right = 'auto';
                floatingNav.style.left = '50%';
                floatingNav.style.transform = 'translateX(-50%)';
                floatingNav.style.top = 'auto';
            } else {
                floatingNav.style.flexDirection = 'column';
                floatingNav.style.bottom = 'auto';
                floatingNav.style.right = '2rem';
                floatingNav.style.left = 'auto';
                floatingNav.style.transform = 'translateY(-50%)';
                floatingNav.style.top = '50%';
            }
        }
        
        // Disable heavy animations on mobile
        if (isMobile) {
            document.body.classList.add('mobile-device');
        } else {
            document.body.classList.remove('mobile-device');
        }
    };
    
    // Call on load and resize with debouncing
    handleMobileView();
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleMobileView, 150);
    });
    
    // Enhanced gallery modal functionality
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            createImageModal(this);
            createRipple(this, e);
        });
        
        // Enhanced hover effects with mobile fallback
        if (window.innerWidth > 768) {
            item.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
                this.style.transform = 'scale(1.03) translateY(-5px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
                this.style.transform = '';
            });
        }
    });
    
    // Preload critical images for better performance
    const preloadImages = () => {
        const criticalImages = [
            'static/img/gallery/Gemini_Generate.png',
            'static/img/services/mm.jpg',
            'static/img/services/am.jpg',
            'static/img/services/4-.jpg',
            'static/img/services/3-.jpg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    };
    
    preloadImages();
    
    // Enhanced scroll progress indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.classList.add('scroll-progress');
        document.body.appendChild(progressBar);
        
        let scrollProgressTimeout;
        const updateScrollProgress = () => {
            if (scrollProgressTimeout) return;
            scrollProgressTimeout = setTimeout(() => {
                const scrollTop = window.pageYOffset;
                const docHeight = document.body.offsetHeight - window.innerHeight;
                const scrollPercent = Math.max(0, Math.min(100, (scrollTop / docHeight) * 100));
                progressBar.style.width = scrollPercent + '%';
                
                // Add glow effect at milestones
                if (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 100) {
                    progressBar.style.boxShadow = '0 0 20px rgba(184,134,11,0.8)';
                    setTimeout(() => {
                        progressBar.style.boxShadow = '0 0 15px rgba(184,134,11,0.6)';
                    }, 500);
                }
                
                scrollProgressTimeout = null;
            }, 5);
        };
        
        window.addEventListener('scroll', updateScrollProgress, { passive: true });
    };
    
    createScrollProgress();
    
    // Initialize advanced visual effects
    initAdvancedEffects();
});

// Advanced visual effects initialization
function initAdvancedEffects() {
    // Only initialize resource-intensive effects on desktop
    if (window.innerWidth > 768 && !isMobileDevice()) {
        createParticleSystem();
        createMouseTrail();
        initAdvancedCursor();
        initBackgroundMorphing();
    }
    
    // Initialize lighter effects for all devices
    init3DTiltEffects();
    initMagneticButtons();
    initTextRevealAnimations();
}

// Enhanced service card background initialization with better error handling
function initServiceCardBackgrounds() {
    document.querySelectorAll('.service-card').forEach((card, index) => {
        // Make cards visible immediately with attractive styling
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        
        const bgImage = card.getAttribute('data-bg');
        if (bgImage) {
            // Create a test image to check if the path exists
            const img = new Image();
            img.onload = () => {
                // Image loaded successfully
                card.style.setProperty('--bg-image', `url(${bgImage})`);
                card.classList.add('bg-loaded');
                card.style.background = `
                    linear-gradient(135deg, 
                        rgba(17,17,17,0.85) 0%, 
                        rgba(184,134,11,0.05) 50%, 
                        rgba(17,17,17,0.85) 100%
                    ),
                    url(${bgImage})
                `;
                card.style.backgroundSize = 'cover';
                card.style.backgroundPosition = 'center';
                card.style.backgroundRepeat = 'no-repeat';
            };
            img.onerror = () => {
                // Image failed to load, use enhanced gradient
                console.log(`Background image failed to load: ${bgImage}`);
                card.style.setProperty('--bg-image', 'none');
                card.style.background = `
                    linear-gradient(135deg, 
                        rgba(17,17,17,0.95) 0%, 
                        rgba(184,134,11,0.15) 30%,
                        rgba(212,175,55,0.1) 70%,
                        rgba(17,17,17,0.95) 100%
                    )
                `;
                card.classList.add('bg-fallback');
            };
            img.src = bgImage;
        } else {
            // No background image specified, use attractive gradient
            card.style.background = `
                linear-gradient(135deg, 
                    rgba(17,17,17,0.95) 0%, 
                    rgba(184,134,11,0.1) 50%, 
                    rgba(17,17,17,0.95) 100%
                )
            `;
            card.classList.add('bg-fallback');
        }
        
        // Add staggered entrance animation
        setTimeout(() => {
            card.style.animation = `serviceCardEntry 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`;
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
    });
}

// Mobile device detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768) ||
           ('ontouchstart' in window);
}

// Enhanced smooth scroll function
function smoothScrollTo(target, duration = 800) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    }
    
    requestAnimationFrame(animation);
}

// Enhanced ripple effect
function createRipple(element, event = null) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    
    const rect = element.getBoundingClientRect();
    let x, y;
    
    if (event) {
        x = (event.clientX || event.touches[0].clientX) - rect.left;
        y = (event.clientY || event.touches[0].clientY) - rect.top;
    } else {
        x = rect.width / 2;
        y = rect.height / 2;
    }
    
    const size = Math.max(rect.width, rect.height) * 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(184, 134, 11, 0.3);
        transform: translate(-50%, -50%) scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        z-index: 1000;
    `;
    
    element.style.position = element.style.position || 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Enhanced button ripple effect
function createButtonRipple(button, event) {
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: translate(-50%, -50%) scale(0);
        animation: rippleAnimation 0.8s ease-out;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        z-index: 1;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 800);
}

// Enhanced image modal
function createImageModal(galleryItem) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    
    const imgSrc = galleryItem.querySelector('img')?.src || '';
    const imgAlt = galleryItem.querySelector('img')?.alt || 'Gallery Image';
    
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <img src="${imgSrc}" alt="${imgAlt}" loading="lazy">
            <button class="modal-close" aria-label="Close modal">&times;</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    
    // Animate in with delay for smooth effect
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
    
    // Close handlers
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.remove();
        }, 400);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    
    // Touch gesture support for mobile
    if (isMobileDevice()) {
        let startY = 0;
        let currentY = 0;
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        modalContent.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
            const diffY = startY - currentY;
            
            if (Math.abs(diffY) > 5) {
                const scale = Math.max(0.7, 1 - Math.abs(diffY) / 500);
                modalContent.style.transform = `translateY(${-diffY/2}px) scale(${scale})`;
                modal.style.opacity = Math.max(0.5, 1 - Math.abs(diffY) / 300);
            }
        }, { passive: true });
        
        modalContent.addEventListener('touchend', () => {
            const diffY = Math.abs(startY - currentY);
            if (diffY > 100) {
                closeModal();
            } else {
                modalContent.style.transform = '';
                modal.style.opacity = '';
            }
        }, { passive: true });
    }
    
    // ESC key handler
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}

// Enhanced 3D tilt effects with mobile optimization
function init3DTiltEffects() {
    if (isMobileDevice()) return; // Skip on mobile for performance
    
    document.querySelectorAll('.service-card, .gallery-item').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.02, 1.02, 1.02)
                translateZ(10px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    });
}

// Enhanced magnetic buttons
function initMagneticButtons() {
    if (isMobileDevice()) return; // Skip on mobile
    
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                btn.style.transition = '';
            }, 300);
        });
    });
}

// Form animation helpers
function animateInputError(input) {
    input.style.animation = 'shake 0.5s ease-in-out';
    input.style.borderColor = '#ef4444';
    
    setTimeout(() => {
        input.style.animation = '';
        input.style.borderColor = '';
    }, 500);
}

function animateFormReset(inputs) {
    inputs.forEach((input, index) => {
        setTimeout(() => {
            input.style.animation = 'fadeInUp 0.3s ease-out';
            setTimeout(() => {
                input.style.animation = '';
            }, 300);
        }, index * 50);
    });
}

function createInputGlow(input) {
    const glow = document.createElement('div');
    glow.className = 'input-glow';
    glow.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(184, 134, 11, 0.1), transparent);
        border-radius: 10px;
        opacity: 0;
        animation: inputGlowEffect 1.5s ease-in-out;
        pointer-events: none;
        z-index: -1;
    `;
    
    input.parentElement.appendChild(glow);
    
    setTimeout(() => {
        glow.remove();
    }, 1500);
}

// Particle system for desktop only
// Complete particle system - add this to your index.js

// Particle system for desktop only
function createParticleSystem() {
    console.log('Creating particle system...');
    
    // Check if mobile
    if (window.innerWidth <= 768 || isMobileDevice()) {
        console.log('Mobile device detected - skipping particles');
        return;
    }
    
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 2;
        opacity: 1;
    `;
    
    document.body.appendChild(canvas);
    console.log('Canvas added to DOM');
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log(`Canvas resized to: ${canvas.width}x${canvas.height}`);
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 1;
            this.vy = (Math.random() - 0.5) * 1;
            this.size = Math.random() * 4 + 2; // 2-6px
            this.opacity = Math.random() * 0.8 + 0.2; // 0.2-1.0
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
            if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
            
            // Keep in bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#b8860b'; // Your accent color
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add glow
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#b8860b';
            ctx.fill();
            ctx.restore();
        }
    }
    
    function init() {
        particles = [];
        const particleCount = 40; // Fixed number for testing
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        console.log(`Initialized ${particles.length} particles`);
    }
    
    function animate() {
        // Clear with semi-transparent background for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.save();
                    ctx.globalAlpha = 0.3 * (1 - distance / 100);
                    ctx.strokeStyle = '#b8860b';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Initialize
    resizeCanvas();
    init();
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        init();
    });
    
    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
            console.log('Animation paused');
        } else {
            animate();
            console.log('Animation resumed');
        }
    });
    
    console.log('Particle system fully initialized');
}

// Mobile device detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768) ||
           ('ontouchstart' in window);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking for particles...');
    
    // Add a delay to ensure everything is loaded
    setTimeout(() => {
        createParticleSystem();
    }, 1000);
});

// Mouse trail effect for desktop
function createMouseTrail() {
    if (isMobileDevice()) return;
    
    const trail = [];
    const maxTrailLength = 15;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ 
            x: e.clientX, 
            y: e.clientY, 
            opacity: 1,
            timestamp: Date.now()
        });
        
        if (trail.length > maxTrailLength) {
            trail.shift();
        }
        
        trail.forEach((point, index) => {
            const age = Date.now() - point.timestamp;
            if (age > 500) return;
            
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: ${(index + 1) * 1.5}px;
                height: ${(index + 1) * 1.5}px;
                background: radial-gradient(circle, rgba(184,134,11,${point.opacity * 0.5}), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transform: translate(-50%, -50%);
                animation: trailFade 0.5s ease-out forwards;
            `;
            
            document.body.appendChild(trailElement);
            
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.remove();
                }
            }, 500);
            
            point.opacity *= 0.95;
        });
    });
}

// Advanced cursor for desktop
function initAdvancedCursor() {
    if (isMobileDevice()) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'advanced-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursor.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Interactive elements
    document.querySelectorAll('a, button, .gallery-item, .service-card, .nav-dot').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

// Background morphing effect
function initBackgroundMorphing() {
    if (isMobileDevice()) return;
    
    const morphingBg = document.createElement('div');
    morphingBg.className = 'morphing-background';
    document.body.appendChild(morphingBg);
}

// Text reveal animations
function initTextRevealAnimations() {
    const textElements = document.querySelectorAll('.hero h1, .hero h2, .section-header h2');
    
    textElements.forEach(element => {
        const text = element.textContent;
        if (text.length > 50) return; // Skip very long text for performance
        
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(30px) rotateX(90deg)';
            span.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.03}s`;
            element.appendChild(span);
        });
        
        // Trigger animation when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('span').forEach((span, index) => {
                        setTimeout(() => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0) rotateX(0)';
                        }, index * 30);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(element);
    });
}

// Additional CSS animations injected dynamically
const additionalAnimations = `
    @keyframes rippleAnimation {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes inputGlowEffect {
        0% {
            opacity: 0;
            transform: translateX(-100%);
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .mobile-device * {
        animation-duration: 0.3s !important;
    }
    
    .mobile-device .advanced-cursor,
    .mobile-device .mouse-trail,
    .mobile-device .morphing-background,
    .mobile-device #particle-canvas {
        display: none !important;
    }
`;

// Inject additional animations
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = additionalAnimations;
document.head.appendChild(animationStyleSheet);
// === Service Cards Hover Background ===
document.querySelectorAll('.service-card').forEach(card => {
  const bg = card.getAttribute('data-bg');
  if (bg) {
    card.addEventListener('mouseenter', () => {
      card.style.backgroundImage = `url(${bg})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';
    });
    card.addEventListener('mouseleave', () => {
      card.style.backgroundImage = '';
    });
  }
});


// Floating nav active state on scroll
const sections = document.querySelectorAll("section[id]");
const navDots = document.querySelectorAll(".floating-nav .nav-dot");

function activateNavDot() {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // offset for header spacing
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navDots.forEach(dot => {
    dot.classList.remove("active");
    if (dot.getAttribute("data-section") === current) {
      dot.classList.add("active");
    }
  });
}

window.addEventListener("scroll", activateNavDot);


// Top bar scroll effect
window.addEventListener("scroll", () => {
  const topBar = document.querySelector(".top-bar");
  if (window.scrollY > 50) {
    topBar.classList.add("scrolled");
  } else {
    topBar.classList.remove("scrolled");
  }
});

// Language translations object
const translations = {
    en: {
        hero_title: "Oussama Abiba",
        hero_subtitle: "Premium Photography in Marrakech", 
        hero_tagline: "Luxury hotels · Architecture · Portraits · Creative Direction",
        btn_view_portfolio: "View Portfolio",
        btn_book_session: "Book a Session",
        nav_services: "Services",
        nav_gallery: "Gallery", 
        nav_contact: "Contact",
        services_title: "PREMIUM SERVICES",
        services_subtitle: "Professional photography solutions for discerning clients",
        service_hotels: "Luxury Hotels",
        service_hotels_desc: "Premium hospitality photography that elevates your brand's visual identity",
        service_portraits: "Executive Portraits",
        service_portraits_desc: "Professional portraits that capture authenticity within Morocco's cultural context",
        service_architecture: "Architecture",
        service_architecture_desc: "Architectural documentation showcasing Morocco's design excellence",
        service_creative: "Creative Direction",
        service_creative_desc: "Conceptual development for sophisticated visual campaigns",
        service_cinema: "Cinematography",
        service_cinema_desc: "Dynamic video content capturing Marrakech's energy and movement",
        service_post: "Post-Production",
        service_post_desc: "Professional editing and color grading for perfect aesthetic results",
        stats_projects: "Projects Completed",
        stats_clients: "Premium Clients",
        stats_experience: "Years Experience",
        stats_satisfaction: "Client Satisfaction",
        gallery_title: "SELECTED WORK",
        gallery_subtitle: "A curated collection showcasing Marrakech's visual essence",
        contact_title: "LET'S CREATE",
        contact_subtitle: "Ready to elevate your visual presence? Let's discuss your project.",
        contact_studio: "Studio",
        contact_phone: "Phone",
        contact_email: "Email",
        form_name: "Your Name",
        form_email: "Email Address",
        form_phone: "Phone Number",
        form_service: "Select Service",
        form_message: "Project Details",
        form_send: "Send Message",
        footer_rights: "All rights reserved."
    },
    fr: {
        hero_title: "Oussama Abiba",
        hero_subtitle: "Photographie Premium à Marrakech",
        hero_tagline: "Hôtels de luxe · Architecture · Portraits · Direction créative",
        btn_view_portfolio: "Voir Portfolio",
        btn_book_session: "Réserver Session",
        nav_services: "Services",
        nav_gallery: "Galerie",
        nav_contact: "Contact",
        services_title: "SERVICES PREMIUM",
        services_subtitle: "Solutions photographiques professionnelles pour une clientèle exigeante",
        service_hotels: "Hôtels de Luxe",
        service_hotels_desc: "Photographie hôtelière premium qui élève l'identité visuelle de votre marque",
        service_portraits: "Portraits Exécutifs",
        service_portraits_desc: "Portraits professionnels capturant l'authenticité dans le contexte culturel marocain",
        service_architecture: "Architecture",
        service_architecture_desc: "Documentation architecturale mettant en valeur l'excellence du design marocain",
        service_creative: "Direction Créative",
        service_creative_desc: "Développement conceptuel pour des campagnes visuelles sophistiquées",
        service_cinema: "Cinématographie",
        service_cinema_desc: "Contenu vidéo dynamique capturant l'énergie et le mouvement de Marrakech",
        service_post: "Post-Production",
        service_post_desc: "Montage professionnel et étalonnage couleur pour des résultats esthétiques parfaits",
        stats_projects: "Projets Réalisés",
        stats_clients: "Clients Premium",
        stats_experience: "Années d'Expérience",
        stats_satisfaction: "Satisfaction Client",
        gallery_title: "ŒUVRES SÉLECTIONNÉES",
        gallery_subtitle: "Une collection organisée présentant l'essence visuelle de Marrakech",
        contact_title: "CRÉONS ENSEMBLE",
        contact_subtitle: "Prêt à élever votre présence visuelle? Discutons de votre projet.",
        contact_studio: "Studio",
        contact_phone: "Téléphone",
        contact_email: "Email",
        form_name: "Votre Nom",
        form_email: "Adresse Email",
        form_phone: "Numéro de Téléphone",
        form_service: "Sélectionner Service",
        form_message: "Détails du Projet",
        form_send: "Envoyer Message",
        footer_rights: "Tous droits réservés."
    },
    es: {
        hero_title: "Oussama Abiba", 
        hero_subtitle: "Fotografía Premium en Marrakech",
        hero_tagline: "Hoteles de lujo · Arquitectura · Retratos · Dirección creativa",
        btn_view_portfolio: "Ver Portfolio",
        btn_book_session: "Reservar Sesión",
        nav_services: "Servicios",
        nav_gallery: "Galería",
        nav_contact: "Contacto",
        services_title: "SERVICIOS PREMIUM",
        services_subtitle: "Soluciones fotográficas profesionales para clientes exigentes",
        service_hotels: "Hoteles de Lujo",
        service_hotels_desc: "Fotografía hotelera premium que eleva la identidad visual de tu marca",
        service_portraits: "Retratos Ejecutivos",
        service_portraits_desc: "Retratos profesionales que capturan autenticidad dentro del contexto cultural marroquí",
        service_architecture: "Arquitectura",
        service_architecture_desc: "Documentación arquitectónica mostrando la excelencia del diseño marroquí",
        service_creative: "Dirección Creativa",
        service_creative_desc: "Desarrollo conceptual para campañas visuales sofisticadas",
        service_cinema: "Cinematografía",
        service_cinema_desc: "Contenido de video dinámico capturando la energía y movimiento de Marrakech",
        service_post: "Post-Producción",
        service_post_desc: "Edición profesional y corrección de color para resultados estéticos perfectos",
        stats_projects: "Proyectos Completados",
        stats_clients: "Clientes Premium",
        stats_experience: "Años de Experiencia",
        stats_satisfaction: "Satisfacción del Cliente",
        gallery_title: "TRABAJO SELECCIONADO",
        gallery_subtitle: "Una colección curada mostrando la esencia visual de Marrakech",
        contact_title: "CREEMOS JUNTOS",
        contact_subtitle: "¿Listo para elevar tu presencia visual? Hablemos de tu proyecto.",
        contact_studio: "Estudio",
        contact_phone: "Teléfono",
        contact_email: "Email",
        form_name: "Tu Nombre",
        form_email: "Dirección de Email",
        form_phone: "Número de Teléfono",
        form_service: "Seleccionar Servicio",
        form_message: "Detalles del Proyecto",
        form_send: "Enviar Mensaje",
        footer_rights: "Todos los derechos reservados."
    }
};

// Language switcher functionality
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        this.createSwitcher();
        this.bindEvents();
        this.setLanguage(this.currentLang);
    }

    createSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
            <button class="lang-btn ${this.currentLang === 'fr' ? 'active' : ''}" data-lang="fr">FR</button>
            <button class="lang-btn ${this.currentLang === 'es' ? 'active' : ''}" data-lang="es">ES</button>
        `;
        document.body.appendChild(switcher);
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('lang-btn')) {
                const lang = e.target.dataset.lang;
                this.setLanguage(lang);
            }
        });
    }

    setLanguage(lang) {
        if (!translations[lang]) return;

        this.currentLang = lang;
        localStorage.setItem('language', lang);
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update content with fade effect
        document.body.classList.add('content-fade');
        
        setTimeout(() => {
            this.translateContent(lang);
            document.body.classList.remove('content-fade');
            document.body.classList.add('active');
            
            setTimeout(() => {
                document.body.classList.remove('active');
            }, 300);
        }, 150);

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    translateContent(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.dataset.translate;
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update form placeholders
        const placeholderElements = document.querySelectorAll('[data-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.dataset.placeholder;
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Update select options
        this.updateSelectOptions(lang);
    }

    updateSelectOptions(lang) {
        const serviceSelect = document.querySelector('select[name="service"]');
        if (serviceSelect) {
            const options = {
                en: [
                    { value: "", text: "Select Service" },
                    { value: "hotel", text: "Luxury Hotels" },
                    { value: "portraits", text: "Executive Portraits" },
                    { value: "architecture", text: "Architecture" },
                    { value: "events", text: "Events" },
                    { value: "other", text: "Other" }
                ],
                fr: [
                    { value: "", text: "Sélectionner Service" },
                    { value: "hotel", text: "Hôtels de Luxe" },
                    { value: "portraits", text: "Portraits Exécutifs" },
                    { value: "architecture", text: "Architecture" },
                    { value: "events", text: "Événements" },
                    { value: "other", text: "Autre" }
                ],
                es: [
                    { value: "", text: "Seleccionar Servicio" },
                    { value: "hotel", text: "Hoteles de Lujo" },
                    { value: "portraits", text: "Retratos Ejecutivos" },
                    { value: "architecture", text: "Arquitectura" },
                    { value: "events", text: "Eventos" },
                    { value: "other", text: "Otro" }
                ]
            };

            serviceSelect.innerHTML = '';
            options[lang].forEach(option => {
                const optElement = document.createElement('option');
                optElement.value = option.value;
                optElement.textContent = option.text;
                serviceSelect.appendChild(optElement);
            });
        }
    }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});