// ===== RENTAPAC - Main JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== PRELOADER =====
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });
    
    // Fallback - hide preloader after 3 seconds max
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 3000);

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ===== MOBILE NAVIGATION =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // ===== PARTICLES.JS INITIALIZATION =====
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#3B82F6', '#10B981', '#8B5CF6']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#3B82F6',
                    opacity: 0.15,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.4
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }

    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    counter.classList.add('animated');
                }
            };

            updateCounter();
        });
    }

    // Trigger counter animation when metrics section is in view
    const metricsSection = document.getElementById('metricas');
    
    if (metricsSection) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };

        const metricsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        }, observerOptions);

        metricsObserver.observe(metricsSection);
    }

    // ===== DEMO TABS =====
    const demoTabs = document.querySelectorAll('.demo__tab');
    const demoPanels = document.querySelectorAll('.demo__panel');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active from all tabs and panels
            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanels.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(`panel-${targetTab}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // ===== SCROLL ANIMATIONS (AOS-like) =====
    const animatedElements = document.querySelectorAll('[data-aos]');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        // Add initial styles
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        animationObserver.observe(el);
    });

    // Add animate class styles
    const style = document.createElement('style');
    style.textContent = `
        .aos-animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ===== FORM HANDLING =====
    const demoForm = document.getElementById('demo-form');
    
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(demoForm);
            const data = Object.fromEntries(formData.entries());
            
            // Here you would normally send the data to your server
            console.log('Form submitted:', data);
            
            // Show success message (you can customize this)
            const button = demoForm.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check"></i> ¡Solicitud Enviada!';
            button.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            button.disabled = true;
            
            // Reset after 3 seconds
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.disabled = false;
                demoForm.reset();
            }, 3000);
        });
    }

    // ===== NEWSLETTER FORM =====
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = form.querySelector('input[type="email"]');
            const button = form.querySelector('button');
            
            if (input.value) {
                const originalIcon = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                input.value = '';
                
                setTimeout(() => {
                    button.innerHTML = originalIcon;
                }, 2000);
            }
        });
    });

    // ===== TYPING EFFECT (if hero has typing text) =====
    const typingText = document.querySelector('.typing-text');
    
    if (typingText) {
        const phrases = [
            'a medida',
            'innovadoras',
            'profesionales',
            'escalables'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing new word
            }

            setTimeout(type, typingSpeed);
        }

        // Start typing effect
        setTimeout(type, 1000);
    }

    // ===== CURRENT YEAR =====
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // ===== GSAP ANIMATIONS (if available) =====
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero content animation
        gsap.from('.hero__content', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });

        gsap.from('.hero__image', {
            opacity: 0,
            x: 50,
            duration: 1,
            ease: 'power3.out',
            delay: 0.8
        });

        // Feature cards stagger animation
        gsap.utils.toArray('.feature-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power2.out'
            });
        });

        // Metric cards animation
        gsap.utils.toArray('.metric-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                scale: 0.9,
                duration: 0.5,
                delay: i * 0.1,
                ease: 'back.out(1.7)'
            });
        });
    }

    // ===== LAZY LOADING IMAGES =====
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback to vanilla-lazyload if available
        if (typeof LazyLoad !== 'undefined') {
            new LazyLoad({
                elements_selector: 'img[loading="lazy"]'
            });
        }
    }

    console.log('🏠 RENTAPAC - Sistema Administrativo Inmobiliario');
    console.log('Desarrollado por Hecho en Código');
});
