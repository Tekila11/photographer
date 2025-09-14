// Advanced Visual Effects Functions

function createParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.3';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = `hsl(${Math.random() * 60 + 30}, 70%, 60%)`;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    function init() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.save();
                    ctx.globalAlpha = 0.1 * (1 - distance / 100);
                    ctx.strokeStyle = '#b8860b';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                    ctx.restore();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    init();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        init();
    });
}

function createMouseTrail() {
    const trail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY, opacity: 1 });
        
        if (trail.length > maxTrailLength) {
            trail.shift();
        }
        
        trail.forEach((point, index) => {
            const trailElement = document.createElement('div');
            trailElement.className = 'mouse-trail';
            trailElement.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: ${(index + 1) * 2}px;
                height: ${(index + 1) * 2}px;
                background: radial-gradient(circle, rgba(184,134,11,${point.opacity}), transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
            `;
            
            document.body.appendChild(trailElement);
            
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.remove();
                }
            }, 500);
            
            point.opacity *= 0.9;
        });
    });
}

function init3DTiltEffects() {
    document.querySelectorAll('.service-card, .gallery-item').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

function initMagneticButtons() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

function initAdvancedCursor() {
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
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Interactive elements
    document.querySelectorAll('a, button, .gallery-item, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuart(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutQuart(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t*t + b;
        t -= 2;
        return -c/2 * (t*t*t*t - 2) + b;
    }
    
    requestAnimationFrame(animation);
}

function createImageModal(galleryItem) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <img src="${galleryItem.querySelector('img')?.src || ''}" alt="Gallery Image">
            <button class="modal-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
    
    // Close handlers
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
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

function initTextRevealAnimations() {
    const textElements = document.querySelectorAll('h1, h2, .hero-subtitle, .section-header p');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(50px) rotateX(90deg)';
            span.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.02}s`;
            element.appendChild(span);
        });
        
        // Trigger animation when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('span').forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0) rotateX(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

function initBackgroundMorphing() {
    const morphingBg = document.createElement('div');
    morphingBg.className = 'morphing-background';
    document.body.appendChild(morphingBg);
    
    let morphIndex = 0;
    const morphShapes = [
        'circle(20% at 20% 20%)',
        'ellipse(40% 30% at 70% 80%)',
        'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        'circle(30% at 80% 30%)',
        'ellipse(50% 40% at 30% 70%)'
    ];
    
    setInterval(() => {
        morphIndex = (morphIndex + 1) % morphShapes.length;
        morphingBg.style.clipPath = morphShapes[morphIndex];
    }, 3000);
}

// Add CSS for additional effects
const additionalEffectStyles = `
    .advanced-cursor {
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid var(--accent);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
        z-index: 9999;
        mix-blend-mode: difference;
    }
    
    .cursor-dot {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 4px;
        height: 4px;
        background: var(--accent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
    }
    
    .advanced-cursor.cursor-hover {
        width: 60px;
        height: 60px;
        background: rgba(184,134,11,0.1);
        border-color: #ffd700;
    }
    
    .morphing-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(184,134,11,0.03), rgba(78,205,196,0.03));
        clip-path: circle(20% at 20% 20%);
        transition: clip-path 2s ease-in-out;
        pointer-events: none;
        z-index: -1;
    }
    
    .gallery-ripple {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(184,134,11,0.3), transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: rippleExpand 1s ease-out forwards;
        pointer-events: none;
    }
    
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .image-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        backdrop-filter: blur(10px);
    }
    
    .modal-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .image-modal.active .modal-content {
        transform: scale(1);
    }
    
    .modal-content img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
    }
    
    .modal-close {
        position: absolute;
        top: -50px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 40px;
        cursor: pointer;
        padding: 10px;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        transform: scale(1.2);
        color: var(--accent);
    }
    
    .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 10px;
    }
    
    @keyframes serviceCardEntry {
        0% {
            opacity: 0;
            transform: translateY(50px) scale(0.8) rotateX(45deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0);
        }
    }
    
    @keyframes statsReveal {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes rippleExpand {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: var(--gradient);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(184,134,11,0.5);
    }
`;

// Inject the additional styles
const effectsStyleSheet = document.createElement('style');
effectsStyleSheet.textContent = additionalEffectStyles;
document.head.appendChild(effectsStyleSheet);// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', function() {
    initServiceCardBackgrounds();
  
    // Navigation dots functionality
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');
    
    // Update active nav dot on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    });
    
    // Smooth scroll to sections
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById(this.getAttribute('data-section'));
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // CTA button smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#22c55e';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 2000);
        });
    }
    
    // Gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Service cards stagger animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe service cards for stagger animation
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/[0-9]/g, '');
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            updateCounter();
        });
    };
    
    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) return;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Mobile menu handling (if needed for smaller screens)
    const handleMobileView = () => {
        if (window.innerWidth <= 768) {
            const floatingNav = document.querySelector('.floating-nav');
            if (floatingNav) {
                floatingNav.style.flexDirection = 'row';
                floatingNav.style.bottom = '2rem';
                floatingNav.style.right = '50%';
                floatingNav.style.transform = 'translateX(50%)';
                floatingNav.style.top = 'auto';
            }
        } else {
            const floatingNav = document.querySelector('.floating-nav');
            if (floatingNav) {
                floatingNav.style.flexDirection = 'column';
                floatingNav.style.bottom = 'auto';
                floatingNav.style.right = '2rem';
                floatingNav.style.transform = 'translateY(-50%)';
                floatingNav.style.top = '50%';
            }
        }
    };
    
    // Call on load and resize
    handleMobileView();
    window.addEventListener('resize', handleMobileView);
    
    // Add custom cursor effect (optional)
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Cursor hover effects
    document.querySelectorAll('a, button, .gallery-item, .service-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Preload images for better performance
    const preloadImages = () => {
        const images = [
            'static/img/placeholder-1.jpg',
            'static/img/placeholder-2.jpg',
            'static/img/placeholder-3.jpg',
            'static/img/placeholder-4.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };
    
    preloadImages();
    
    // Add scroll progress indicator
    const createScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.classList.add('scroll-progress');
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    };
    
    createScrollProgress();
});
function initServiceCardBackgrounds() {
    document.querySelectorAll('.service-card').forEach(card => {
        const bgImage = card.getAttribute('data-bg');
        if (bgImage) {
            card.style.setProperty('--bg-image', `url(${bgImage})`);
        }
    });
}
// Add CSS for additional effects
const additionalStyles = `
    .custom-cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: all 0.1s ease;
        z-index: 9999;
        opacity: 0;
    }
    
    .custom-cursor.hover {
        width: 40px;
        height: 40px;
        background: rgba(184, 134, 11, 0.1);
        opacity: 1;
    }
    
    @media (hover: hover) {
        .custom-cursor {
            opacity: 1;
        }
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient);
        z-index: 9999;
        transition: width 0.1s ease;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .service-card:nth-child(even) {
        transform: translateY(20px);
    }
    
    .gallery-item:nth-child(2),
    .gallery-item:nth-child(4) {
        transform: translateY(30px);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);