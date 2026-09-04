/**
 * Telha Clarke Architecture & Interior Design Studio
 * Interactive Engine & Motion Architecture
 * 
 * 1. Melbourne/South Yarra Real-Time Architectural Clock
 * 2. Signature 0% -> 100% Loader Intro Sequence
 * 3. Works Portfolio Dual-Mode Engine (Visual Grid vs. Tabular List)
 * 4. Interactive Sector Filter System with Counter Updates
 * 5. Studio Team Roster Real-Time Portrait Hover Switcher
 * 6. Lenis Inertial Momentum Smooth Scrolling
 * 7. Mobile Fullscreen Header Navigation Overlay
 */

(function () {
  'use strict';

  // =========================================================
  // 1. MELBOURNE / SOUTH YARRA REAL-TIME CLOCK
  // =========================================================
  function initClock() {
    function update() {
      try {
        const now = new Date();
        const melbourneFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Australia/Melbourne',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        const formatted = melbourneFormatter.format(now);
        document.querySelectorAll('#hour, .header-time span').forEach(el => {
          if (el.id === 'hour' || el.parentElement.classList.contains('header-time')) {
            el.textContent = formatted;
          }
        });
      } catch (e) {
        // Fallback
        const d = new Date();
        const str = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.querySelectorAll('#hour').forEach(el => el.textContent = str);
      }
    }
    update();
    setInterval(update, 1000);
  }

  // =========================================================
  // 2. SIGNATURE LOADER INTRO SEQUENCE
  // =========================================================
  function initLoader() {
    const loader = document.querySelector('.loader');
    const loaderPanel = document.querySelector('.loader-panel');
    const counter = document.querySelector('.loader-counter');

    if (!counter || !loader) return;

    let progress = 0;
    const duration = 500; // ms
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      progress = Math.min(Math.round((elapsed / duration) * 100), 100);
      counter.textContent = progress + '%';

      if (progress < 100) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          if (loaderPanel) {
            loaderPanel.style.transition = 'transform 0.85s cubic-bezier(0.7, 0, 0.2, 1)';
            loaderPanel.style.transform = 'translateY(-100%)';
          }
          if (loader) {
            loader.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            loader.style.opacity = '0';
            loader.style.transform = 'translateY(-20px)';
            setTimeout(() => {
              loader.style.display = 'none';
              if (loaderPanel) loaderPanel.style.display = 'none';
            }, 650);
          }
        }, 150);
      }
    }
    requestAnimationFrame(step);
  }

  // =========================================================
  // 3. WORKS PORTFOLIO (GRID VS LIST VIEW TOGGLE)
  // =========================================================
  function initWorksViewToggle() {
    const gridBtn = document.querySelector('.widget-works-grid');
    const listBtn = document.querySelector('.widget-works-list');
    const gridContainer = document.querySelector('.works-grid');
    const listContainer = document.querySelector('.works-list');

    if (!gridBtn || !listBtn) return;

    function setView(mode) {
      if (mode === 'grid') {
        gridBtn.classList.add('a');
        listBtn.classList.remove('a');
        if (gridContainer) {
          gridContainer.style.display = '';
          gridContainer.style.opacity = '1';
        }
        if (listContainer) {
          listContainer.style.display = 'none';
        }
      } else {
        listBtn.classList.add('a');
        gridBtn.classList.remove('a');
        if (listContainer) {
          listContainer.style.display = 'block';
          listContainer.style.opacity = '1';
        }
        if (gridContainer) {
          gridContainer.style.display = 'none';
        }
      }
      if (window.honeyLenis) {
        window.honeyLenis.resize();
      }
    }

    gridBtn.addEventListener('click', () => setView('grid'));
    listBtn.addEventListener('click', () => setView('list'));

    // Red Bar Hover on List Items
    document.querySelectorAll('.works-list-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.backgroundColor = '#E32B2B';
        item.querySelectorAll('*').forEach(child => {
          child.style.color = '#FFFFFF';
        });
      });
      item.addEventListener('mouseleave', () => {
        item.style.backgroundColor = '';
        item.querySelectorAll('*').forEach(child => {
          child.style.color = '';
        });
      });
    });
  }

  // =========================================================
  // 4. INTERACTIVE SECTOR FILTER DRAWER
  // =========================================================
  function initWorksFilters() {
    const filterBtn = document.querySelector('.works-filter-button');
    const filterDrawer = document.querySelector('.works-filter');
    const openLabel = document.querySelector('.works-filter-open');
    const closeLabel = document.querySelector('.works-filter-close');

    if (!filterBtn || !filterDrawer) return;

    let isOpen = false;
    filterBtn.addEventListener('click', () => {
      isOpen = !isOpen;
      if (isOpen) {
        filterDrawer.style.display = 'block';
        setTimeout(() => {
          filterDrawer.style.opacity = '1';
          filterDrawer.style.transform = 'translateY(0)';
        }, 10);
        if (openLabel) openLabel.style.display = 'none';
        if (closeLabel) closeLabel.style.display = 'block';
      } else {
        filterDrawer.style.opacity = '0';
        filterDrawer.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          filterDrawer.style.display = 'none';
        }, 400);
        if (openLabel) openLabel.style.display = 'block';
        if (closeLabel) closeLabel.style.display = 'none';
      }
    });

    // Filter Items by Sector
    const filterLinks = filterDrawer.querySelectorAll('a, button, [data-filter]');
    const allGridItems = document.querySelectorAll('.works-grid-item, .works-grid > *');
    const allListItems = document.querySelectorAll('.works-list-item');

    filterLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectorText = (link.textContent || '').trim().toLowerCase();

        // Highlight active filter
        filterLinks.forEach(l => l.classList.remove('a', 'active'));
        link.classList.add('a', 'active');

        let isAll = sectorText.includes('all work') || sectorText.includes('all');

        let matchCount = 0;

        allGridItems.forEach(item => {
          const itemText = (item.textContent || '').toLowerCase();
          if (isAll || itemText.includes(sectorText.split('(')[0].trim())) {
            item.style.display = '';
            matchCount++;
          } else {
            item.style.display = 'none';
          }
        });

        allListItems.forEach(item => {
          const itemText = (item.textContent || '').toLowerCase();
          if (isAll || itemText.includes(sectorText.split('(')[0].trim())) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });

        if (window.honeyLenis) {
          window.honeyLenis.resize();
        }
      });
    });
  }

  // =========================================================
  // 5. STUDIO TEAM PORTRAIT HOVER PREVIEW
  // =========================================================
  function initStudioTeam() {
    const teamItems = document.querySelectorAll('.studio-team-item, [data-team-item]');
    const previewImg = document.querySelector('.studio-team-preview img, .studio-portrait img');

    if (!previewImg || teamItems.length === 0) return;

    teamItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const imgSrc = item.getAttribute('data-image') || item.querySelector('img')?.src;
        if (imgSrc && previewImg.src !== imgSrc) {
          previewImg.style.opacity = '0.5';
          setTimeout(() => {
            previewImg.src = imgSrc;
            previewImg.style.opacity = '1';
          }, 100);
        }
      });
    });
  }

  // =========================================================
  // 6. LENIS INERTIAL MOMENTUM SCROLLING
  // =========================================================
  function initSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
      try {
        const lenis = new Lenis({
          duration: 1.6,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.85,
          touchMultiplier: 1.5,
          infinite: false
        });
        window.honeyLenis = lenis;

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (err) {
        console.warn('Lenis scroll skipped:', err);
      }
    }
  }

  // =========================================================
  // 7. MOBILE FULLSCREEN MENU OVERLAY
  // =========================================================
  function initMobileMenu() {
    const toggler = document.querySelector('.header-toggler');
    const overlay = document.querySelector('.page-overlay, .nav-mobile');

    if (!toggler || !overlay) return;

    let open = false;
    toggler.addEventListener('click', () => {
      open = !open;
      if (open) {
        overlay.classList.add('is-open');
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        document.body.style.overflow = 'hidden';
      } else {
        overlay.classList.remove('is-open');
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  // =========================================================
  // INITIALIZATION ON DOM READY
  // =========================================================
  function onReady() {
    initClock();
    initLoader();
    initWorksViewToggle();
    initWorksFilters();
    initStudioTeam();
    initSmoothScroll();
    initMobileMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();
