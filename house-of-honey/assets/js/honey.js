/**
 * House of Honey Interactive Engine
 * Viscous "Liquid Honey" Physics & Motion Architecture
 * 
 * 1. Ultra-Slow Viscous Lenis Inertial Scrolling (2.2s duration, exponential damping)
 * 2. Gentle Floating Honeybee Cursor with soft spring lag & flight tilt
 * 3. Viscous Fluid Marquee Engine (inertial lag + velvety ambient drift)
 * 4. Slow Editorial Text Entrances & Parallax Reveals (1.8s soft ease)
 * 5. Seasonal Color Theme System (Neutral, Spring, Summer, Fall, Winter)
 * 6. Fullscreen Navigation Drawer & Lightbox Modal
 */

(function () {
  'use strict';

  // =========================================================
  // 1. VISCOUS LENIS INERTIAL SMOOTH SCROLLING ENGINE
  // =========================================================
  let lenisInstance = null;
  function initSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
      try {
        lenisInstance = new Lenis({
          duration: 2.2, // Ultra-luxurious viscous momentum
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -7 * t)), // Soft liquid dissipation
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.65, // Gentle wheel input
          touchMultiplier: 1.2,
          infinite: false
        });
        window.honeyLenis = lenisInstance;

        function raf(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (err) {
        console.warn('Lenis smooth scroll initialization skipped:', err);
      }
    }
  }

  // =========================================================
  // 2. GENTLE FLOATING HONEYBEE CURSOR (SOFT SPRING PHYSICS)
  // =========================================================
  function initHoneybeeCursor() {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return; // Touch screens do not use mouse cursor

    let cursorEl = document.querySelector('.honey-bee-cursor');
    if (!cursorEl) {
      cursorEl = document.createElement('div');
      cursorEl.className = 'honey-bee-cursor';
      cursorEl.setAttribute('aria-hidden', 'true');
      cursorEl.innerHTML = `
        <div class="honey-bee-wrapper">
          <canvas class="honey-bee-canvas" width="44" height="44" style="display:none;"></canvas>
          <svg class="honey-bee-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Left Wing -->
            <g class="honey-bee-wing-left">
              <ellipse cx="14" cy="11" rx="8" ry="4.5" transform="rotate(-35 14 11)" fill="rgba(255, 255, 255, 0.82)" stroke="rgba(220, 235, 255, 0.9)" stroke-width="0.8"/>
              <path d="M12 12C14 9 17 8 19 11" stroke="rgba(200, 220, 255, 0.6)" stroke-width="0.5"/>
            </g>
            <!-- Right Wing -->
            <g class="honey-bee-wing-right">
              <ellipse cx="26" cy="11" rx="8" ry="4.5" transform="rotate(35 26 11)" fill="rgba(255, 255, 255, 0.82)" stroke="rgba(220, 235, 255, 0.9)" stroke-width="0.8"/>
              <path d="M28 12C26 9 23 8 21 11" stroke="rgba(200, 220, 255, 0.6)" stroke-width="0.5"/>
            </g>
            <!-- Bee Body Shadow & Glow -->
            <ellipse cx="20" cy="22" rx="10" ry="12" fill="#2B1700" />
            <!-- Bee Golden Stripes -->
            <ellipse cx="20" cy="22" rx="9.5" ry="11.5" fill="#EDBC00" />
            <path d="M11 18C13 16.5 27 16.5 29 18C29 19.5 28 20.5 28 20.5C26 19 14 19 12 20.5C12 20.5 11 19.5 11 18Z" fill="#261309" />
            <path d="M10.8 23.5C13 22 27 22 29.2 23.5C29 25 27.5 26 27.5 26C25 24.5 15 24.5 12.5 26C12.5 26 11 25 10.8 23.5Z" fill="#261309" />
            <path d="M13 29C15 28 25 28 27 29C26 30.5 24 31.8 20 33C16 31.8 14 30.5 13 29Z" fill="#261309" />
            <!-- Head -->
            <circle cx="20" cy="13" r="5.5" fill="#2B1700" />
            <!-- Cute Eyes -->
            <circle cx="18" cy="12" r="1.3" fill="#FFF8EF" />
            <circle cx="22" cy="12" r="1.3" fill="#FFF8EF" />
            <circle cx="18.3" cy="11.8" r="0.6" fill="#000" />
            <circle cx="22.3" cy="11.8" r="0.6" fill="#000" />
            <!-- Antennae -->
            <path d="M18 9C17 6 15 5 13 6" stroke="#2B1700" stroke-width="1" stroke-linecap="round"/>
            <circle cx="13" cy="6" r="1" fill="#EDBC00" />
            <path d="M22 9C23 6 25 5 27 6" stroke="#2B1700" stroke-width="1" stroke-linecap="round"/>
            <circle cx="27" cy="6" r="1" fill="#EDBC00" />
            <!-- Stinger -->
            <path d="M19.3 33.5L20 36L20.7 33.5Z" fill="#2B1700"/>
          </svg>
        </div>
      `;
      document.body.appendChild(cursorEl);
    }

    // Try loading native Rive bee animation if available
    const canvas = cursorEl.querySelector('.honey-bee-canvas');
    const svgBee = cursorEl.querySelector('.honey-bee-svg');
    if (typeof rive !== 'undefined' && canvas) {
      try {
        const r = new rive.Rive({
          src: './assets/bee.riv',
          canvas: canvas,
          autoplay: true,
          onLoad: () => {
            canvas.style.display = 'block';
            if (svgBee) svgBee.style.display = 'none';
          },
          onError: () => {
            canvas.style.display = 'none';
            if (svgBee) svgBee.style.display = 'block';
          }
        });
      } catch (e) {
        canvas.style.display = 'none';
      }
    }

    // Soft Spring Physics Engine
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currX = mouseX;
    let currY = mouseY;
    let prevX = currX;
    let isVisible = false;
    let isHovering = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX + 28;
      mouseY = e.clientY + 28;
      if (!isVisible) {
        isVisible = true;
        cursorEl.classList.add('active');
        currX = mouseX;
        currY = mouseY;
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursorEl.classList.remove('active');
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      cursorEl.classList.add('active');
    });

    // Detect clickable hover elements
    const interactiveSelector = 'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-menu-toggle]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelector)) {
        if (!isHovering) {
          isHovering = true;
          cursorEl.classList.add('hovering');
        }
      } else {
        if (isHovering) {
          isHovering = false;
          cursorEl.classList.remove('hovering');
        }
      }
    }, { passive: true });

    // Smooth gentle spring physics RAF loop
    function updateBeePhysics() {
      if (isVisible) {
        // Soft viscous trailing (warm summer air feel)
        currX += (mouseX - currX) * 0.085;
        currY += (mouseY - currY) * 0.085;

        const vx = currX - prevX;
        prevX = currX;

        // Gentle tilt angle based on velocity
        const tilt = Math.max(-18, Math.min(18, vx * 1.5));
        // Soft floating sine wave bobbing
        const hoverBob = Math.sin(Date.now() * 0.0028) * 3.5;

        cursorEl.style.transform = `translate3d(${currX}px, ${currY + hoverBob}px, 0) rotate(${tilt}deg)`;
      }
      requestAnimationFrame(updateBeePhysics);
    }
    requestAnimationFrame(updateBeePhysics);
  }

  // =========================================================
  // 3. VISCOUS SCROLL-DRIVEN & AMBIENT HORIZONTAL MARQUEES
  // =========================================================
  function initMarquees() {
    const pagePath = window.location.pathname.toLowerCase();
    const marqueeElements = document.querySelectorAll('.font-canora.text-theme-accent.text-title-100, [data-marquee]');

    const marqueeInstances = [];

    marqueeElements.forEach((el, index) => {
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
          <div class="marquee-infinite-track" data-track="1">
            <span>${marqueeText}</span>
            <span>${marqueeText}</span>
            <span>${marqueeText}</span>
            <span>${marqueeText}</span>
          </div>
          <div class="marquee-infinite-track" data-track="2" aria-hidden="true">
            <span>${marqueeText}</span>
            <span>${marqueeText}</span>
            <span>${marqueeText}</span>
            <span>${marqueeText}</span>
          </div>
        </div>
      `;
      el.style.opacity = '1';

      const tracks = el.querySelectorAll('.marquee-infinite-track');
      const direction = (index % 2 === 0) ? -1 : 1; // Alternating soft directions

      marqueeInstances.push({
        element: el,
        tracks: tracks,
        ambientOffset: 0,
        currentScrollShift: 0,
        direction: direction,
        scrollRate: 0.075, // Very gentle scroll contribution (honey viscosity)
        speed: 0.16 // Tranquil, velvety slow ambient glide
      });
    });

    // Viscous Scroll & Ambient Drift Loop
    function updateMarquees() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      marqueeInstances.forEach(instance => {
        // Continuous tranquil ambient drift
        instance.ambientOffset += instance.speed * instance.direction;

        // Dampened fluid scroll lag (honey flowing effect)
        const targetScrollShift = scrollY * instance.scrollRate * instance.direction;
        instance.currentScrollShift += (targetScrollShift - instance.currentScrollShift) * 0.045;

        const totalTranslation = instance.ambientOffset + instance.currentScrollShift;

        const firstTrack = instance.tracks[0];
        if (firstTrack) {
          const trackWidth = firstTrack.offsetWidth || 1200;
          const normalized = ((totalTranslation % trackWidth) - trackWidth) % trackWidth;

          instance.tracks.forEach(track => {
            track.style.transform = `translate3d(${normalized}px, 0, 0)`;
          });
        }
      });

      requestAnimationFrame(updateMarquees);
    }
    requestAnimationFrame(updateMarquees);
  }

  // =========================================================
  // 4. SLOW EDITORIAL TEXT ENTRANCES & PARALLAX REVEALS
  // =========================================================
  function initSlowEditorialReveals() {
    const targets = document.querySelectorAll(
      '[data-reveal], .honey-reveal, ' +
      'section h1, section h2, section h3, ' +
      '.text-title-60, .text-title-40, .text-title-20, ' +
      '[data-page-builder-section] .grid > a, ' +
      '[data-page-builder-section] .grid > div, ' +
      '.honey-reveal-img'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.06,
      rootMargin: '0px 0px -30px 0px'
    });

    targets.forEach((el) => {
      if (!el.classList.contains('revealed') && !el.closest('header') && !el.closest('#mobile-menu-overlay')) {
        el.classList.add('honey-reveal');
        if (el.parentElement && el.parentElement.classList.contains('grid')) {
          const childIdx = Array.from(el.parentElement.children).indexOf(el);
          el.style.transitionDelay = `${(childIdx % 4) * 0.16}s`;
        }
        observer.observe(el);
      }
    });

    // Parallax Scroll Physics on Overflow Images
    const parallaxContainers = document.querySelectorAll('[style*="--parallax-overflow"]');
    function handleParallax() {
      const windowH = window.innerHeight;
      parallaxContainers.forEach(container => {
        const rect = container.getBoundingClientRect();
        if (rect.top < windowH && rect.bottom > 0) {
          const progress = (windowH - rect.top) / (windowH + rect.height);
          const yOffset = (progress - 0.5) * 45; // Gentle dampened parallax
          const innerImg = container.querySelector('img');
          if (innerImg) {
            innerImg.style.transform = `translate3d(0, ${yOffset}px, 0) scale(1.04)`;
          }
        }
      });
    }

    window.addEventListener('scroll', handleParallax, { passive: true });
    handleParallax();
  }

  // =========================================================
  // 5. SEASONAL COLOR THEME SYSTEM
  // =========================================================
  function initSeasonalThemes() {
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
  }

  // =========================================================
  // 6. FULLSCREEN NAVIGATION MENU DRAWER
  // =========================================================
  function initFullscreenMenu() {
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
  }

  // =========================================================
  // 7. LIGHTBOX MODAL & FORM INTERCEPTION
  // =========================================================
  function initLightboxAndForms() {
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
        if (src && !img.closest('header') && !img.closest('.theme-switch-pill') && !img.closest('#mobile-menu-overlay') && !img.closest('.honey-bee-cursor')) {
          const lbImg = lightbox.querySelector('img');
          lbImg.src = src;
          lbImg.alt = img.alt || 'House of Honey';
          lightbox.classList.add('active');
        }
      });
    });

    // Form Interception
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
  }

  // =========================================================
  // INITIALIZE ON DOM READY
  // =========================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  function onReady() {
    initSmoothScroll();
    initHoneybeeCursor();
    initMarquees();
    initSlowEditorialReveals();
    initSeasonalThemes();
    initFullscreenMenu();
    initLightboxAndForms();
  }
})();
