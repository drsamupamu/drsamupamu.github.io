// Variables globales
let isMobile = window.innerWidth < 768;
let scrollPosition = window.scrollY;
const header = document.querySelector('.header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav__menu');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section');
const preloader = document.querySelector('.preloader');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contact-form');
const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
const textElements = document.querySelectorAll('.typing-text, .fade-in-up');

// Inicialización de componentes
function init() {
  // Inicializar partículas si está en la sección de inicio
  if (document.getElementById('particles-js')) {
    initParticles();
  }
  
  // Configurar eventos
  setupEventListeners();
  
  // Cargar animaciones iniciales
  animateOnScroll();
  
  // Configurar animación de escritura
  if (document.querySelector('.typing-text')) {
    initTypingEffect();
  }
  
  // Ocultar preloader después de cargar todo
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 1000);
  });
}

// Configurar event listeners
function setupEventListeners() {
  // Menú móvil
  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }
  
  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Scroll para actualizar header y animaciones
  window.addEventListener('scroll', () => {
    updateHeaderOnScroll();
    animateOnScroll();
    toggleBackToTop();
  });
  
  // Validación de formulario
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Efecto de etiquetas flotantes en los inputs
  inputs.forEach(input => {
    input.addEventListener('focus', handleInputFocus);
    input.addEventListener('blur', handleInputBlur);
    
    // Establecer estado inicial para campos con valor
    if (input.value.trim() !== '') {
      input.parentNode.classList.add('focused');
    }
  });
  
  // Botón volver arriba
  if (backToTop) {
    backToTop.addEventListener('click', scrollToTop);
  }
  
  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
  });
}

// Inicializar partículas
function initParticles() {
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#3B82F6'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#3B82F6',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
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
            opacity: 0.5
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
}

// Efecto de escritura
function initTypingEffect() {
  const texts = [
    'a medida',
    'innovadoras',
    'escalables',
    'eficientes'
  ];
  
  let count = 0;
  let index = 0;
  let currentText = '';
  let letter = '';
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;
  
  function type() {
    const typingElement = document.querySelector('.typing-text');
    
    if (isDeleting) {
      currentText = texts[count].substring(0, index - 1);
      index--;
      typingElement.textContent = currentText;
      
      if (index === 0) {
        isDeleting = false;
        count = (count + 1) % texts.length;
        setTimeout(type, typingSpeed);
        return;
      }
      
      setTimeout(type, deletingSpeed);
    } else {
      currentText = texts[count].substring(0, index + 1);
      index++;
      typingElement.textContent = currentText;
      
      if (currentText.length === texts[count].length) {
        isDeleting = true;
        setTimeout(type, pauseTime);
        return;
      }
      
      setTimeout(type, typingSpeed);
    }
  }
  
  // Iniciar efecto después de un breve retraso
  setTimeout(type, 1000);
}

// Animaciones al hacer scroll
function animateOnScroll() {
  textElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
  
  // Resaltar enlace activo en el menú
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      document
        .querySelector(`.nav__link[href*=${sectionId}]`)
        ?.classList.add('active');
    } else {
      document
        .querySelector(`.nav__link[href*=${sectionId}]`)
        ?.classList.remove('active');
    }
  });
}

// Actualizar header al hacer scroll
function updateHeaderOnScroll() {
  const currentScrollPosition = window.scrollY;
  
  if (currentScrollPosition > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  scrollPosition = currentScrollPosition;
}

// Mostrar/ocultar botón de volver arriba
function toggleBackToTop() {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
}

// Desplazamiento suave
function smoothScroll(e) {
  e.preventDefault();
  
  const targetId = this.getAttribute('href');
  if (targetId === '#') return;
  
  const targetElement = document.querySelector(targetId);
  if (!targetElement) return;
  
  const headerHeight = header.offsetHeight;
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// Manejar el envío del formulario
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const formValues = Object.fromEntries(formData.entries());
  
  // Aquí iría la lógica para enviar el formulario
  console.log('Datos del formulario:', formValues);
  
  // Mostrar mensaje de éxito
  alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
  contactForm.reset();
  
  // Restablecer estilos de los campos
  inputs.forEach(input => {
    input.parentNode.classList.remove('focused');
  });
}

// Manejar el foco en los inputs
function handleInputFocus(e) {
  this.parentNode.classList.add('focused');
}

function handleInputBlur(e) {
  if (this.value.trim() === '') {
    this.parentNode.classList.remove('focused');
  }
}

// Menú móvil
function toggleMenu() {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
}

function closeMenu() {
  navToggle.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

// Volver al principio de la página
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Inicializar la aplicación
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
