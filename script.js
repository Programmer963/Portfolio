// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Create loading overlay
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = `
    <div style="text-align: center;">
      <div class="loader"></div>
      <div class="loading-text">Loading Excellence...</div>
    </div>
  `;
  document.body.appendChild(loadingOverlay);

  // Hide loading overlay after page loads
  window.addEventListener('load', function() {
    setTimeout(() => {
      loadingOverlay.classList.add('hidden');
      setTimeout(() => {
        loadingOverlay.remove();
      }, 500);
    }, 1500);
  });

  // Create custom cursor
  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'cursor-follower';
  document.body.appendChild(cursorFollower);

  // Cursor movement
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

  // Cursor interactions
  const interactiveElements = document.querySelectorAll('a, button, .team-member, .project-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.transform = 'scale(1)';
    });
  });

  // Create particles
  function createParticles() {
    const particles = document.createElement('div');
    particles.className = 'particles';
    document.body.appendChild(particles);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particles.appendChild(particle);
    }
  }
  createParticles();

  // Create morphing background
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

  // Add text reveal animation to hero title
  const titleLines = document.querySelectorAll('.title-line');
  titleLines.forEach(line => {
    const text = line.textContent;
    line.innerHTML = `<span>${text}</span>`;
  });

  // Navigation functionality
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  // Smooth scrolling
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active navigation highlighting
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
  
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navLinksContainer.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Navbar background on scroll
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
  
  // Hero CTA buttons functionality
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
  
  // Intersection Observer for animations
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
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll('.team-member, .project-card, .section-header, .contact-title, .contact-subtitle, .contact-item, .contact-form');
  animateElements.forEach(el => {
    observer.observe(el);
  });
  
  // Advanced scroll animations
  function handleScrollAnimations() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for hero elements
    const heroPattern = document.querySelector('.hero-pattern');
    if (heroPattern && scrolled < window.innerHeight) {
      heroPattern.style.transform = `translateY(${rate}px)`;
    }
    
    // Morphing shapes movement
    const morphShapes = document.querySelectorAll('.morph-shape');
    morphShapes.forEach((shape, index) => {
      const speed = 0.1 + (index * 0.05);
      shape.style.transform += ` translateY(${scrolled * speed}px)`;
    });
  }
  
  window.addEventListener('scroll', handleScrollAnimations);

  // Form submission
  const contactForm = document.querySelector('.form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      // Simulate form submission
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
  
  // Counter animation for stats
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
  
  // Trigger counter animation when stats section is visible
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
  
  // Advanced 3D tilt effect for cards
  function addTiltEffect(elements) {
    elements.forEach(element => {
      element.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      element.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }
  
  // Apply tilt effect to cards
  const tiltElements = document.querySelectorAll('.team-member, .project-card, .stat');
  addTiltEffect(tiltElements);
  
  // Magnetic effect for buttons
  const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary');
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });
  

  
  // Floating elements animation
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
    
    for (let i = 0; i < 20; i++) {
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
  
  // Smooth reveal for sections
  const revealElements = document.querySelectorAll('.section-title, .section-subtitle');
  revealElements.forEach(element => {
    const text = element.textContent;
    element.innerHTML = text.split('').map(char => 
      `<span style="display: inline-block; opacity: 0; transform: translateY(20px); transition: all 0.5s ease;">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
    
    const spans = element.querySelectorAll('span');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          spans.forEach((span, index) => {
            setTimeout(() => {
              span.style.opacity = '1';
              span.style.transform = 'translateY(0)';
            }, index * 50);
          });
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    revealObserver.observe(element);
  });
});

// Add CSS for mobile navigation
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      top: 80px;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(20px);
      flex-direction: column;
      padding: 2rem;
      transform: translateY(-100%);
      opacity: 0;
      transition: all 0.3s ease;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .nav-links.active {
      display: flex;
      transform: translateY(0);
      opacity: 1;
    }
    
    .nav-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .cursor, .cursor-follower {
      display: none;
    }
    
    body {
      cursor: auto;
    }
  }
`;
document.head.appendChild(style);