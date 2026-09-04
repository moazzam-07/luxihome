/**
 * House of Honey Interactive Engine
 * Parallax Scrolling, Seasonal Themes, Fullscreen Drawer, Infinite Marquee, Image Lightbox
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

  // Floating Theme Toggle Widget
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

  // 2. Fullscreen Navigation Menu Overlay
  const menuButtons = document.querySelectorAll('button[aria-label="Open menu"], button[aria-label="Close menu"], [data-menu-toggle]');
  const menuOverlay = document.getElementById('mobile-menu-overlay');

  function updateMenuState(isOpen) {
    if (!menuOverlay) return;
    if (isOpen) {
      menuOverlay.setAttribute('data-state', 'open');
      menuOverlay.style.display = 'flex';
      setTimeout(() => {
        menuOverlay.style.opacity = '1';
      }, 10);
      document.body.style.overflow = 'hidden';
    } else {
      menuOverlay.setAttribute('data-state', 'closed');
      menuOverlay.style.opacity = '0';
      setTimeout(() => {
        menuOverlay.style.display = 'none';
      }, 500);
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

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay && menuOverlay.getAttribute('data-state') === 'open') {
      updateMenuState(false);
    }
  });

  // 3. Page-Specific Infinite Marquee Setup
  const pagePath = window.location.pathname.toLowerCase();
  document.querySelectorAll('.font-canora.text-theme-accent.text-title-100, [data-marquee]').forEach(el => {
    let marqueeText = el.getAttribute('data-marquee');
    if (!marqueeText) {
      if (pagePath.includes('studio')) {
        marqueeText = 'About Us';
      } else if (pagePath.includes('spaces')) {
        marqueeText = 'Our Spaces';
      } else if (pagePath.includes('the-buzz')) {
        marqueeText = 'The Buzz';
      } else if (pagePath.includes('dear-honey')) {
        marqueeText = 'Dear Honey';
      } else if (pagePath.includes('press')) {
        marqueeText = 'Press Room';
      } else if (pagePath.includes('contact')) {
        marqueeText = 'Tell us your story';
      } else {
        const parentSec = el.closest('#about') || el.closest('[data-page-builder-section]');
        if (parentSec && parentSec.id === 'about') {
          marqueeText = 'House of Honey';
        } else if (parentSec && parentSec.innerText && parentSec.innerText.includes('Dear HONEY')) {
          marqueeText = 'Dear Honey';
        } else {
          marqueeText = 'Spaces with story';
        }
      }
    }
    
    el.innerHTML = `
      <div class="marquee-infinite">
        <div class="marquee-infinite-track">
          <span>${marqueeText}</span>
          <span>${marqueeText}</span>
          <span>${marqueeText}</span>
          <span>${marqueeText}</span>
        </div>
        <div class="marquee-infinite-track" aria-hidden="true">
          <span>${marqueeText}</span>
          <span>${marqueeText}</span>
          <span>${marqueeText}</span>
          <span>${marqueeText}</span>
        </div>
      </div>
    `;
    el.style.opacity = '1';
  });

  // 4. Parallax Scroll Physics on Images
  const parallaxContainers = document.querySelectorAll('[style*="--parallax-overflow"]');
  function handleParallax() {
    const scrollY = window.pageYOffset;
    const windowH = window.innerHeight;

    parallaxContainers.forEach(container => {
      const rect = container.getBoundingClientRect();
      if (rect.top < windowH && rect.bottom > 0) {
        // Calculate offset percentage
        const progress = (windowH - rect.top) / (windowH + rect.height);
        const yOffset = (progress - 0.5) * 60; // 60px smooth parallax travel
        const innerImg = container.querySelector('img');
        if (innerImg) {
          innerImg.style.transform = `translate3d(0, ${yOffset}px, 0) scale(1.04)`;
        }
      }
    });
  }

  window.addEventListener('scroll', handleParallax, { passive: true });
  handleParallax();

  // 5. Lightbox Modal
  let lightbox = document.querySelector('.honey-lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'honey-lightbox';
    lightbox.innerHTML = `
      <div class="honey-lightbox-close" aria-label="Close Lightbox">&times;</div>
      <img src="" alt="House of Honey Photo" />
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

  // 6. Interactive Form Interception
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

  // 7. Scroll reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
});
