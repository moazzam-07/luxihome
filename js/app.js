/**
 * LUXIHOME — INTERACTIVE ANIMATION & EXPERIENCE ENGINE
 * Integrates: Lenis Smooth Scrolling, GSAP ScrollTrigger, Amali Style Modals & Duality Switcher
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. INITIALIZE LENIS SMOOTH SCROLL (Amali Fluid Feel)
    let lenis;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
            smoothTouch: false
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Connect GSAP ScrollTrigger to Lenis
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }
    }

    // 2. GSAP ENHANCED SCROLL ANIMATIONS (Amali Parallax & Reveals)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        
        // Hero Image Zoom Parallax on Scroll
        gsap.to('#heroBg', {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            scale: 1.25,
            y: '15%',
            ease: 'none'
        });

        // Hero Content Fade & Slight Upward Drift
        gsap.to('.hero-content', {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'center top',
                scrub: true
            },
            opacity: 0,
            y: -40,
            ease: 'none'
        });

        // Editorial Section Entry Stagger
        gsap.from('.editorial-headline, .editorial-text, .popup-triggers-bar', {
            scrollTrigger: {
                trigger: '.editorial-section',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Portfolio Cards Stagger Reveal
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '#portfolioGrid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out'
        });

        // Studio Team Cards Stagger
        gsap.from('.team-card', {
            scrollTrigger: {
                trigger: '.studio-section',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }

    // 3. FULLSCREEN LOCATION MENU (Audio 3 SEO Locations)
    const menuTrigger = document.getElementById('menuTrigger');
    const fullscreenMenu = document.getElementById('fullscreenMenu');
    const menuCloseBtn = document.getElementById('menuCloseBtn');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const menuNavItems = document.querySelectorAll('.menu-nav-item');

    function openMenu() {
        fullscreenMenu.classList.add('open');
        if (lenis) lenis.stop();
    }

    function closeMenu() {
        fullscreenMenu.classList.remove('open');
        if (lenis) lenis.start();
    }

    if (menuTrigger) menuTrigger.addEventListener('click', openMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
    if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

    menuNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const filter = item.getAttribute('data-filter');
            closeMenu();
            if (filter) {
                setTimeout(() => {
                    const targetBtn = document.querySelector(`.filter-pill[data-filter="${filter}"]`);
                    if (targetBtn) targetBtn.click();
                    const portfolioSec = document.getElementById('portfolio');
                    if (portfolioSec) portfolioSec.scrollIntoView({ behavior: 'smooth' });
                }, 400);
            }
        });
    });

    // 4. STYLE DUALITY TOGGLE (Neo-Classical vs Contemporary Minimalist)
    const styleButtons = document.querySelectorAll('.style-btn');
    const panelClassical = document.getElementById('panelClassical');
    const panelMinimal = document.getElementById('panelMinimal');

    styleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            styleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedStyle = btn.getAttribute('data-style');
            if (selectedStyle === 'classical') {
                panelClassical.classList.add('active');
                panelMinimal.classList.remove('active');
            } else {
                panelMinimal.classList.add('active');
                panelClassical.classList.remove('active');
            }
        });
    });

    // 5. KOLKATA RESIDENTIAL PORTFOLIO FILTER (Park Street, Ballygunge, etc.)
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filterValue = pill.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    if (typeof gsap !== 'undefined') {
                        gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
                    }
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 6. AMALI STYLE POPUP MODALS (The Concept, Materials, Turnkey)
    const popupButtons = document.querySelectorAll('.amali-popup-pill');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalCards = document.querySelectorAll('.amali-modal-card');
    const modalCloseButtons = document.querySelectorAll('.modal-close-btn');

    function openModal(modalId) {
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            modalBackdrop.classList.add('open');
            targetModal.classList.add('open');
            if (lenis) lenis.stop();
        }
    }

    function closeAllModals() {
        modalBackdrop.classList.remove('open');
        modalCards.forEach(card => card.classList.remove('open'));
        if (lenis) lenis.start();
    }

    popupButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    modalCloseButtons.forEach(btn => btn.addEventListener('click', closeAllModals));
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeAllModals);

    // Escape Key Listener for Modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
            closeConsultationDrawer();
            closeMenu();
        }
    });

    // 7. CONSULTATION DRAWER & WHATSAPP GENERATOR
    const enquireTrigger = document.getElementById('enquireTrigger');
    const consultationDrawer = document.getElementById('consultationDrawer');
    const drawerClose = document.getElementById('drawerClose');
    const consultationForm = document.getElementById('consultationForm');

    function openConsultationDrawer() {
        consultationDrawer.classList.add('open');
        modalBackdrop.classList.add('open');
        if (lenis) lenis.stop();
    }

    function closeConsultationDrawer() {
        consultationDrawer.classList.remove('open');
        modalBackdrop.classList.remove('open');
        if (lenis) lenis.start();
    }

    if (enquireTrigger) enquireTrigger.addEventListener('click', openConsultationDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeConsultationDrawer);

    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('clientName').value;
            const phone = document.getElementById('clientPhone').value;
            const location = document.getElementById('projectLocation').value;
            const scale = document.getElementById('residenceType').value;

            const text = `Hello Luxihome team, my name is ${name}. I am interested in turnkey residential interior design for a ${scale} at ${location}, Kolkata. My contact number is ${phone}.`;
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/918217013908?text=${encodedText}`;

            window.open(whatsappUrl, '_blank');
            closeConsultationDrawer();
        });
    }

    // 8. LUXURY AMBIENT SOUND GENERATOR (Web Audio API Synthesizer)
    const audioToggle = document.getElementById('audioToggle');
    let audioCtx = null;
    let isPlaying = false;
    let osc1, osc2, gainNode;

    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            if (!isPlaying) {
                try {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    if (!audioCtx) audioCtx = new AudioContext();
                    if (audioCtx.state === 'suspended') audioCtx.resume();

                    // Subtle luxury ambient warm drone / chord
                    gainNode = audioCtx.createGain();
                    gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime);

                    osc1 = audioCtx.createOscillator();
                    osc1.type = 'sine';
                    osc1.frequency.setValueAtTime(174.61, audioCtx.currentTime); // F3

                    osc2 = audioCtx.createOscillator();
                    osc2.type = 'sine';
                    osc2.frequency.setValueAtTime(261.63, audioCtx.currentTime); // C4

                    osc1.connect(gainNode);
                    osc2.connect(gainNode);
                    gainNode.connect(audioCtx.destination);

                    osc1.start();
                    osc2.start();

                    isPlaying = true;
                    audioToggle.classList.remove('muted');
                    audioToggle.querySelector('.audio-label').textContent = 'PLAYING';
                } catch (err) {
                    console.warn('Audio ambient context error:', err);
                }
            } else {
                if (gainNode) {
                    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
                    if (osc1) osc1.stop();
                    if (osc2) osc2.stop();
                }
                isPlaying = false;
                audioToggle.classList.add('muted');
                audioToggle.querySelector('.audio-label').textContent = 'MUTED';
            }
        });
    }

});
