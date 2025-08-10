document.addEventListener('DOMContentLoaded', function() {
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = `
    <div class="loading-content">
      <div class="loader"></div>
      <div class="loading-text">Загружаем Ваше решение...</div>
    </div>
  `;
  document.body.appendChild(loadingOverlay);

  window.addEventListener('load', function() {
    setTimeout(() => {
      loadingOverlay.classList.add('hidden');
      setTimeout(() => {
        loadingOverlay.remove();
      }, 500);
    }, 1500);
  });

  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'cursor-follower';
  document.body.appendChild(cursorFollower);

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    followerX += (mouseX - followerX) * 0.05;
    followerY += (mouseY - followerY) * 0.05;

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const interactiveElements = document.querySelectorAll('a, button, .team-member, .project-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.transform = 'scale(1)';
    });
  });

  function createParticles() {
    const particles = document.createElement('div');
    particles.className = 'particles';
    document.body.appendChild(particles);

    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
      particles.appendChild(particle);
    }
  }
  createParticles();

  function createMorphingBg() {
    const morphingBg = document.createElement('div');
    morphingBg.className = 'morphing-bg';
    
    for (let i = 0; i < 3; i++) {
      const shape = document.createElement('div');
      shape.className = 'morph-shape';
      morphingBg.appendChild(shape);
    }
    
    document.body.appendChild(morphingBg);
  }
  createMorphingBg();

  const titleLines = document.querySelectorAll('.title-line');
  titleLines.forEach(line => {
    const text = line.textContent;
    line.innerHTML = `<span>${text}</span>`;
  });

  function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
    
    window.addEventListener('scroll', updateActiveNav);
  }
  
  initNavigation();
  
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', function() {
      navLinksContainer.classList.toggle('active');
      this.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navLinksContainer.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
        navLinksContainer.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        navLinksContainer.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }
  
  const nav = document.querySelector('.nav');
  function updateNavBackground() {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(255, 255, 255, 0.98)';
      nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.95)';
      nav.style.boxShadow = 'none';
    }
  }
  
  window.addEventListener('scroll', updateNavBackground);
  
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navLinksContainer.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
  
  const exploreCTA = document.querySelector('.btn-primary');
  const teamCTA = document.querySelector('.btn-secondary');
  
  if (exploreCTA) {
    exploreCTA.addEventListener('click', function() {
      document.querySelector('#projects').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
  
  if (teamCTA) {
    teamCTA.addEventListener('click', function() {
      document.querySelector('#team').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);
  
  const animateElements = document.querySelectorAll('.team-member, .project-card, .section-header, .contact-title, .contact-subtitle, .contact-item, .contact-form, .projects-show-more, .process-step');
  animateElements.forEach(el => {
    observer.observe(el);
  });
  
  const showMoreBtn = document.getElementById('showMoreBtn');
  const hiddenProjects = document.querySelector('.projects-grid-hidden');
  let isExpanded = false;
  
  if (showMoreBtn && hiddenProjects) {
    showMoreBtn.addEventListener('click', function() {
      if (!isExpanded) {
        hiddenProjects.style.display = 'grid';
        setTimeout(() => {
          hiddenProjects.classList.add('show');
        }, 10);
        
        this.querySelector('.btn-text').textContent = 'Скрыть';
        this.querySelector('.btn-icon').textContent = '↑';
        this.classList.add('loading');
        
        setTimeout(() => {
          this.classList.remove('loading');
        }, 600);
        
        isExpanded = true;
      } else {
        hiddenProjects.classList.remove('show');
        
        this.querySelector('.btn-text').textContent = 'Показать еще';
        this.querySelector('.btn-icon').textContent = '↓';
        this.classList.add('loading');
        
        setTimeout(() => {
          this.classList.remove('loading');
          hiddenProjects.style.display = 'none';
        }, 600);
        
        isExpanded = false;
      }
    });
  }
  
  function handleScrollAnimations() {
    const scrolled = window.pageYOffset;
    
    const heroPattern = document.querySelector('.hero-pattern');
    if (heroPattern && scrolled < window.innerHeight) {
      heroPattern.style.transform = `translateY(${scrolled * -0.3}px)`;
    }
  }
  
  window.addEventListener('scroll', handleScrollAnimations);

  const contactForm = document.querySelector('.form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      const submitBtn = this.querySelector('.btn-primary');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        submitBtn.style.transform = 'scale(1)';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
          this.reset();
        }, 2000);
      }, 1500);
    });
  }
  
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
      const suffix = counter.textContent.replace(/[\d]/g, '');
      let current = 0;
      const increment = target / 100;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + suffix;
        }
      }, 20);
    });
  }
  
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }
  
  const hoverElements = document.querySelectorAll('.stat, .btn-show-more');
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  const buttonElements = document.querySelectorAll('.btn-primary, .btn-secondary');
  buttonElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  function createFloatingElements() {
    const floatingContainer = document.createElement('div');
    floatingContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    `;
    
    for (let i = 0; i < 12; i++) {
      const element = document.createElement('div');
      element.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
      `;
      floatingContainer.appendChild(element);
    }
    
    document.body.appendChild(floatingContainer);
  }
  createFloatingElements();
  
  const logoTrack = document.querySelector('.logo-track');
  if (logoTrack) {
    function updateCarouselAnimation() {
      const trackWidth = logoTrack.scrollWidth;
      const containerWidth = logoTrack.parentElement.offsetWidth;
      
      if (window.innerWidth <= 480) {
        logoTrack.style.animation = 'scroll 12s linear infinite';
      } else if (window.innerWidth <= 768) {
        logoTrack.style.animation = 'scroll 15s linear infinite';
      } else {
        const duration = Math.max(20, (trackWidth / 100) * 2);
        logoTrack.style.animation = `scroll ${duration}s linear infinite`;
      }
    }
    
    updateCarouselAnimation();
    
    if (window.innerWidth > 768) {
      logoTrack.parentElement.addEventListener('mouseenter', () => {
        logoTrack.style.animationPlayState = 'paused';
      });
      
      logoTrack.parentElement.addEventListener('mouseleave', () => {
        logoTrack.style.animationPlayState = 'running';
      });
    }
    
    window.addEventListener('resize', updateCarouselAnimation);
  }

  const revealElements = document.querySelectorAll('.section-title, .section-subtitle');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'all 0.4s ease';
    revealObserver.observe(el);
  });
  
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    img.addEventListener('error', function() {
      console.warn('Image failed to load:', this.src);
      this.style.display = 'none';
    });
    
    img.addEventListener('load', function() {
      console.log('Image loaded successfully:', this.src);
    });
  });
});

const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .cursor, .cursor-follower {
      display: none;
    }
    
    body {
      cursor: auto;
    }
  }
`;
document.head.appendChild(style);