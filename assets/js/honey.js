/**
 * House of Honey Interactive Engine
 * Handles themes, animations, smooth marquee, mobile navigation drawer, lightbox, and form submissions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Seasonal Theme System
  const themes = ['neutral', 'spring', 'summer', 'fall', 'winter'];
  let currentThemeIndex = 0;
  
  const savedTheme = localStorage.getItem('honey-theme');
  if (savedTheme && themes.includes(savedTheme)) {
    currentThemeIndex = themes.indexOf(savedTheme);
  }
  
  function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('honey-theme', themeName);
    
    const pill = document.querySelector('.theme-switch-pill .theme-name');
    if (pill) {
      pill.textContent = 'Theme: ' + themeName.charAt(0).toUpperCase() + themeName.slice(1);
    }
  }

  applyTheme(themes[currentThemeIndex]);

  // Create floating theme toggle button
  let themePill = document.querySelector('.theme-switch-pill');
  if (!themePill) {
    themePill = document.createElement('button');
    themePill.className = 'theme-switch-pill';
    themePill.setAttribute('aria-label', 'Change seasonal color theme');
    themePill.innerHTML = `
      <span class="theme-dot"></span>
      <span class="theme-name">Theme: ${themes[currentThemeIndex].charAt(0).toUpperCase() + themes[currentThemeIndex].slice(1)}</span>
    `;
    themePill.addEventListener('click', () => {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      applyTheme(themes[currentThemeIndex]);
    });
    document.body.appendChild(themePill);
  }

  // 2. Navigation Menu Toggle (Mobile & Desktop Overlay)
  const menuButtons = document.querySelectorAll('button[aria-label="Open menu"], button[aria-label="Close menu"], [data-menu-toggle]');
  const menuOverlay = document.getElementById('mobile-menu-overlay');

  function updateMenuState(isOpen) {
    if (!menuOverlay) return;
    if (isOpen) {
      menuOverlay.setAttribute('data-state', 'open');
      menuOverlay.style.display = 'flex';
      menuOverlay.style.opacity = '1';
      menuOverlay.style.visibility = 'visible';
      menuOverlay.style.pointerEvents = 'auto';
      document.body.style.overflow = 'hidden';
    } else {
      menuOverlay.setAttribute('data-state', 'closed');
      menuOverlay.style.display = 'none';
      menuOverlay.style.opacity = '0';
      menuOverlay.style.visibility = 'hidden';
      menuOverlay.style.pointerEvents = 'none';
      document.body.style.overflow = '';
    }
  }

  menuButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menuOverlay && menuOverlay.getAttribute('data-state') === 'open';
      updateMenuState(!isOpen);
    });
  });

  // Close menu on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay && menuOverlay.getAttribute('data-state') === 'open') {
      updateMenuState(false);
    }
  });

  // 3. Hero Carousel Slideshow
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    setInterval(() => {
      heroSlides[currentSlide].style.clipPath = 'inset(0 0 0 100%)';
      heroSlides[currentSlide].style.opacity = '0';
      heroSlides[currentSlide].style.zIndex = '0';
      
      currentSlide = (currentSlide + 1) % heroSlides.length;
      
      heroSlides[currentSlide].style.clipPath = 'inset(0 0 0 0%)';
      heroSlides[currentSlide].style.opacity = '1';
      heroSlides[currentSlide].style.zIndex = '2';
    }, 6000);
  }

  // 4. Infinite Marquee Animation
  document.querySelectorAll('[data-marquee]').forEach(el => {
    const text = el.getAttribute('data-marquee') || el.textContent.trim();
    if (!text) return;
    
    el.innerHTML = `
      <div class="marquee-infinite">
        <div class="marquee-infinite-track">
          <span>${text}</span>
          <span>${text}</span>
          <span>${text}</span>
          <span>${text}</span>
        </div>
        <div class="marquee-infinite-track" aria-hidden="true">
          <span>${text}</span>
          <span>${text}</span>
          <span>${text}</span>
          <span>${text}</span>
        </div>
      </div>
    `;
    el.style.opacity = '1';
  });

  // 5. Lightbox for Project Imagery
  let lightbox = document.querySelector('.honey-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'honey-lightbox';
    lightbox.innerHTML = `
      <div class="honey-lightbox-close" aria-label="Close Lightbox">&times;</div>
      <img src="" alt="Project Photo" />
    `;
    document.body.appendChild(lightbox);
    
    lightbox.querySelector('.honey-lightbox-close').addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  }

  document.querySelectorAll('img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      const src = img.getAttribute('src');
      if (src && !img.closest('header') && !img.closest('.theme-switch-pill') && !img.closest('#mobile-menu-overlay')) {
        const lbImg = lightbox.querySelector('img');
        lbImg.src = src;
        lbImg.alt = img.alt || 'House of Honey';
        lightbox.classList.add('active');
      }
    });
  });

  // 6. Project Category Filtering on Spaces Page
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectItems = document.querySelectorAll('[data-category]');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-filter');
      filterButtons.forEach(b => b.classList.remove('active', 'bg-theme-accent'));
      btn.classList.add('active', 'bg-theme-accent');

      projectItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          item.style.display = 'block';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // 7. Contact Form Handling
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent ✓';
        submitBtn.style.backgroundColor = 'var(--color-theme-accent)';
        submitBtn.style.color = 'var(--color-theme-text-secondary)';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
          form.reset();
        }, 4000);
      }
    });
  });

  // 8. Scroll reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
});
