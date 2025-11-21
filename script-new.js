'use strict';

/**
 * Modern Video Editing Agency JavaScript
 * Enhanced with animations, 3D elements, and smooth interactions
 */

/*-----------------------------------*\
  #UTILITY FUNCTIONS
\*-----------------------------------*/

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

const throttle = function (func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

/*-----------------------------------*\
  #LOADING SCREEN
\*-----------------------------------*/

window.addEventListener('load', function() {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.classList.remove('loading');
      
      // Initialize other components after loading
      initLottieAnimations();
      initCounterAnimation();
    }, 2000);
  }
});

/*-----------------------------------*\
  #NAVBAR FUNCTIONALITY
\*-----------------------------------*/

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("nav-open");
}

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("nav-open");
}

if (navToggler) {
  addEventOnElem(navToggler, "click", toggleNavbar);
}

if (navbarLinks.length > 0) {
  addEventOnElem(navbarLinks, "click", closeNavbar);
}

/*-----------------------------------*\
  #HEADER SCROLL EFFECT
\*-----------------------------------*/

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerScrollEffect = throttle(function() {
  if (window.scrollY >= 100) {
    header?.classList.add("active");
    backTopBtn?.classList.add("active");
  } else {
    header?.classList.remove("active");
    backTopBtn?.classList.remove("active");
  }
}, 100);

window.addEventListener("scroll", headerScrollEffect);

/*-----------------------------------*\
  #SMOOTH SCROLLING
\*-----------------------------------*/

const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = header?.offsetHeight || 0;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/*-----------------------------------*\
  #LOTTIE ANIMATIONS
\*-----------------------------------*/

function initLottieAnimations() {
  // Initialize hero Lottie animation
  const heroLottie = document.getElementById('hero-social-media-lottie');
  if (heroLottie) {
    // Add interaction on hover
    heroLottie.addEventListener('mouseenter', () => {
      try {
        heroLottie.setSpeed(1.5);
      } catch (error) {
        console.warn('Hero Lottie interaction error:', error);
      }
    });
    
    heroLottie.addEventListener('mouseleave', () => {
      try {
        heroLottie.setSpeed(1);
      } catch (error) {
        console.warn('Hero Lottie interaction error:', error);
      }
    });
  }

  // Pause Lottie animations when not in view for performance
  const lottieElements = document.querySelectorAll('lottie-player');
  
  if ('IntersectionObserver' in window) {
    const lottieObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const lottie = entry.target;
        try {
          if (entry.isIntersecting) {
            lottie.play();
          } else {
            // Keep playing but reduce speed when out of view
            lottie.setSpeed(0.5);
          }
        } catch (error) {
          console.warn('Lottie intersection error:', error);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    lottieElements.forEach(lottie => {
      lottieObserver.observe(lottie);
    });
  }
}

/*-----------------------------------*\
  #COUNTER ANIMATION
\*-----------------------------------*/

function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

/*-----------------------------------*\
  #PORTFOLIO FILTER
\*-----------------------------------*/

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const filterValue = this.getAttribute('data-filter');
    
    // Update active button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    
    // Filter portfolio items
    portfolioItems.forEach(item => {
      const category = item.getAttribute('data-category');
      
      if (filterValue === 'all' || category === filterValue) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

/*-----------------------------------*\
  #FORM HANDLING
\*-----------------------------------*/

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading state
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Message Sent!</span>';
      submitBtn.classList.add('success');
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('success');
        contactForm.reset();
      }, 3000);
    }, 2000);
  });
}

/*-----------------------------------*\
  #SCROLL ANIMATIONS
\*-----------------------------------*/

// Parallax effect for floating elements
const floatingElements = document.querySelectorAll('.float-element');

const parallaxEffect = throttle(function() {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  floatingElements.forEach((element, index) => {
    const speed = (index + 1) * 0.1;
    element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * speed}deg)`;
  });
}, 16);

window.addEventListener('scroll', parallaxEffect);

/*-----------------------------------*\
  #VIDEO PLAY BUTTONS
\*-----------------------------------*/

const playBtns = document.querySelectorAll('.play-btn-large, .play-btn-floating');

playBtns.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Add click animation
    this.style.transform = 'translate(-50%, -50%) scale(0.9)';
    setTimeout(() => {
      this.style.transform = 'translate(-50%, -50%) scale(1.1)';
    }, 150);
    setTimeout(() => {
      this.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 300);
    
    // Here you would typically open a video modal or start video playback
    console.log('Video play button clicked');
  });
});

/*-----------------------------------*\
  #PARTICLE SYSTEM (Optional Enhancement)
\*-----------------------------------*/

function createParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particles';
  particleContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  `;
  
  document.body.appendChild(particleContainer);
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(99, 102, 241, 0.5);
      animation: particleFloat ${10 + Math.random() * 10}s linear infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 10}s;
    `;
    
    particleContainer.appendChild(particle);
  }
}

// Add particle animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

/*-----------------------------------*\
  #INTERSECTION OBSERVER FOR ANIMATIONS
\*-----------------------------------*/

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('[data-aos]').forEach(el => {
  observer.observe(el);
});

/*-----------------------------------*\
  #CURSOR EFFECTS
\*-----------------------------------*/

const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
  position: fixed;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #66f65c, #48d9ecff);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease;
  opacity: 0;
`;

document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
});

// Cursor interactions
document.querySelectorAll('a, button, .btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

/*-----------------------------------*\
  #PERFORMANCE OPTIMIZATION
\*-----------------------------------*/

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// Preload critical resources
const preloadLinks = [
  './assets/css/style-new.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap'
];

preloadLinks.forEach(href => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  document.head.appendChild(link);
});

console.log('🎬 Elegance Edge - Video Editing Agency website loaded successfully!');
