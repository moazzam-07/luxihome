# LUXIHOME — MASTER TECHNICAL ARCHITECTURE & DEEP CODEBASE REFERENCE
> **Authoritative Technical Documentation & Engineering Onboarding Guide**  
> **Date:** September 20, 2026  
> **Repository:** `https://github.com/moazzam-07/luxihome` (`origin/main`)  
> **Production Live URL:** `https://luxihome-mobile-check.vercel.app`  
> **Local Dev Port:** `http://localhost:3000/` or `http://localhost:8080/`  
> **Environment:** Node.js / Vercel CLI / Python 3.12 (for test harnesses) / Windows PowerShell

---

## CRITICAL NOTICE FOR ANY DEVELOPER TOUCHING THIS REPOSITORY
This project is an ultra-high-fidelity luxury digital experience built on a reverse-engineered, highly choreographed **GSAP (GreenSock) + Lenis Smooth Scroll + Lottie Vector Animation** engine. 

It is **NOT** a standard static HTML/Tailwind template. 
- Arbitrarily editing class names or removing `data-target` / `data-name` attributes in HTML **will instantly break the GSAP animation timeline**, leaving the preloader permanently locked on screen or freezing the scroll engine.
- The compiled JavaScript bundle (`assets/js/bundle.js`) is over 70,000 lines of Babel-transpiled Webpack output. Editing it requires surgical precision.
- **Read this document thoroughly before altering any markup, styles, or animation parameters.**

---

## TABLE OF CONTENTS
1. [System Architecture & Tech Stack Overview](#1-system-architecture--tech-stack-overview)
2. [The Animation Engine & Timeline Choreography](#2-the-animation-engine--timeline-choreography)
   - 2.1 The Preloader Sequence & Screen Lock
   - 2.2 Returning Visitor Bypass (`sessionStorage`)
   - 2.3 The Hero Pinned ScrollTimeline (`pin: bannerContentFixed`)
   - 2.4 Custom Ease & Fluid Camera Motions
3. [Core DOM Anatomy & The `data-target` Contract](#3-core-dom-anatomy--the-data-target-contract)
4. [The Alam's Pentagon Floating CTA Badge Implementation](#4-the-alams-pentagon-floating-cta-badge-implementation)
5. [Lead Capture Engine & Free Estimate Modal Deep Dive](#5-lead-capture-engine--free-estimate-modal-deep-dive)
6. [Typography System & Desktop Scale Fixes](#6-typography-system--desktop-scale-fixes)
7. [Asset Pipelines, Directory Quirks & Image Repositories](#7-asset-pipelines-directory-quirks--image-repositories)
8. [Multi-Template Mirror Structure & Sub-Routes](#8-multi-template-mirror-structure--sub-routes)
9. [Automated Verification & Playwright Gotchas](#9-automated-verification--playwright-gotchas)
10. [Vercel Deployment Pipeline & CLI Protocols](#10-vercel-deployment-pipeline--cli-protocols)
11. [Developer Dos and Don'ts (The Golden Rules)](#11-developer-dos-and-donts-the-golden-rules)
12. [Git Commit Audit Trail & Change Manifest](#12-git-commit-audit-trail--change-manifest)

---

## 1. System Architecture & Tech Stack Overview

### Technology Breakdown
- **Runtime / Static Host:** Pure static delivery via Vercel Edge CDN with zero server-side rendering (SSR) runtime dependencies for near-zero TTFB.
- **Scroll Interpolation:** **Lenis** smooth scroll library (`window.lenis`), providing heavy inertia and momentum physics.
- **Animation Framework:** **GSAP 3.x** (`gsap`, `ScrollTrigger`, `CustomEase`).
- **Vector Graphics Animation:** **Lottie Web** (Airbnb) executing vector JSON animations (`assets/assets/lottie/*.json`).
- **Styling Pipeline:** Tailwind CSS utility framework compiled with custom typography configurations, fluid viewport clamp calculations, and custom `@font-face` web fonts (`assets/css/styles.css`).
- **Form & Conversion Logic:** Vanilla ES6+ event delegation with regex input sanitization and dynamic WhatsApp API deep-linking.

### Bundle Architecture
The primary application bundle is located at:
`assets/js/bundle.js` (~70,730 lines, ~2.65 MB).
It bundles:
- `_js_utils_querySelector__WEBPACK_IMPORTED_MODULE_0__`: DOM query abstractions (`$qs`, `$qsa`).
- `gsap__WEBPACK_IMPORTED_MODULE_4__`: GSAP core runtime.
- `gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_5__`: GSAP ScrollTrigger plugin.
- `gsap_CustomEase__WEBPACK_IMPORTED_MODULE_6__`: Cubic-bezier math curves for luxury acceleration.
- `_js_utils_lottie__WEBPACK_IMPORTED_MODULE_2__`: Vector animation controller.

---

## 2. The Animation Engine & Timeline Choreography

### 2.1 The Preloader Sequence & Screen Lock
When a user loads the landing page at `window.scrollY < 10` for the first time:

1. **Scroll Lockdown:**
   Classes `luxi-intro-scroll-lock` and `luxi-intro-pending` are appended to both `<html>` and `<body>`:
   ```javascript
   document.documentElement.classList.add('luxi-intro-scroll-lock');
   document.body.classList.add('luxi-intro-scroll-lock');
   ```
   Simultaneously, active touch and mousewheel listeners intercept user input:
   ```javascript
   window.addEventListener('touchmove', preventScrollHandler, { passive: false });
   window.addEventListener('wheel', preventScrollHandler, { passive: false });
   window.lenis && window.lenis.stop();
   ```
   *Why this matters:* Without this lock, any accidental wheel flick on page load desynchronizes the logo translation coordinate calculation.

2. **Logo Zoom & Pan:**
   The brand logo (`[data-target="logo-lottie"]` / `#menuLogo`) starts dead-center in the viewport:
   ```javascript
   gsap.set(menuLogo, {
     top: '50vh',
     yPercent: -50,
     y: 0,
     x: startX, // Calculated dynamically: Math.round((window.innerWidth / 2) - 20 - (logoElWidth / 2)) on mobile
     scale: isDesktop ? 2.8 : (window.innerWidth >= 640 ? 2.1 : 1.7),
     opacity: 0,
     visibility: 'visible'
   });
   ```
3. **Lottie Vector Playback:**
   The Lottie logo vector plays frames 75 to end via `logoLottie.animation.goToAndPlay(75, true)`.
4. **Hero Reveal & Docking:**
   Over a duration of 2.5 seconds using a custom cubic-bezier curve (`imageEase`), the logo scales down to `1.0` and flies upward to dock at `top: 0px, x: 0px` in the fixed navigation bar. Simultaneously:
   - `bannerImage` transitions from scale `1.08` to `1.0`.
   - `bannerBlur` transitions from `blur(15px)` to `blur(0px)`.
   - `bannerText1`, `bannerScroll`, `menuWrapper`, `audioIcon`, and `bannerPentagonCta` fade in cleanly (`autoAlpha: 1`, `duration: 0.5`).
5. **Lock Release:**
   On timeline `onComplete`, `window.lenis.start()` is triggered, the event listeners are detached, and `sessionStorage.setItem('preloader_seen', true)` is registered.

### 2.2 Returning Visitor Bypass (`sessionStorage`)
If `sessionStorage.getItem('preloader_seen')` is set or if `window.scrollY >= 10`:
- The complex 3-second zoom-in is completely bypassed.
- The logo is immediately docked in the header.
- The hero elements (`bannerText1`, `bannerScroll`, `menuWrapper`, `audioIcon`, `bannerPentagonCta`) fade in instantaneously over 0.5s.

### 2.3 The Hero Pinned ScrollTimeline (`pin: bannerContentFixed`)
When the user scrolls down from the top banner into the horizontal experience:
```javascript
var scrollTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: banner,
    start: 'top top',
    end: function() { return "+=" + window.innerHeight + "px"; },
    scrub: true,
    pin: bannerContentFixed,
    pinSpacing: false
  }
});
```
- The fixed container `[data-target="banner-content-fixed"]` remains pinned over the viewport height without adding trailing margins (`pinSpacing: false`).
- As the scrub progresses from 0% to 25%:
  `bannerText1`, `bannerScroll`, and `bannerPentagonCta` fade out to `autoAlpha: 0`.
- At scrub 50% to 100%:
  The background video blurs (`backdrop-filter: blur(15px)`), and `horizontalScrollText1` fades into view.

### 2.4 Custom Ease & Fluid Camera Motions
The engine uses a proprietary mathematical curve mimicking an architectural dolly camera:
```javascript
CustomEase.create('imageEase', 'M0,0 C0.173,0 0.217,0.107 0.283,0.213 0.359,0.335 0.403,0.455 0.456,0.594 0.5,0.71 0.509,0.79 0.608,0.891 0.675,0.959 0.737,1 1,1');
```
*Engineering Rule:* Never replace this ease with standard CSS `ease-in-out`. Standard eases feel synthetic and robotic; this curve preserves the cinematic inertia.

---

## 3. Core DOM Anatomy & The `data-target` Contract

In `index.html`, GSAP elements are mapped via unique `data-target` and `data-name` attributes. **Never modify or remove these attributes:**

```html
<!-- ROOT BANNER CONTAINER -->
<div data-name="home-banner" class="relative w-full h-screen overflow-hidden">
    
    <!-- BACKGROUND MEDIA WRAPPER -->
    <div data-target="banner-image" class="absolute inset-0 w-full h-full">
        <video id="luxihome-hero-video" class="w-full h-full object-cover" autoplay muted loop playsinline poster="/assets/video/luxihome-hero-video-poster.jpg">
            <source src="/assets/video/luxihome-hero-video.mp4" type="video/mp4">
        </video>
    </div>

    <!-- FROSTED BACKDROP FILTER -->
    <div data-target="banner-blur" class="absolute inset-0 pointer-events-none"></div>

    <!-- PINNED FOREGROUND CONTENT -->
    <div data-target="banner-content-fixed" class="absolute inset-0 w-full h-full pointer-events-none">
        
        <!-- HERO CENTER TITLE (GRANDE MINIMA) -->
        <div data-target="banner-text-1" class="absolute inset-0 flex items-center justify-center pointer-events-auto opacity-0">
            <h1 class="font-serif ...">Grande Minima</h1>
        </div>

        <!-- NEW: ALAM'S PENTAGON FLOATING CTA BADGE -->
        <div data-target="banner-pentagon-cta" class="absolute bottom-[75px] sm:bottom-[90px] left-1/2 -translate-x-1/2 z-30 pointer-events-auto opacity-0">
            <!-- Glassmorphism Badge Component -->
        </div>

        <!-- SCROLL PILL INDICATOR -->
        <div data-target="banner-scroll" class="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto opacity-0">
            <!-- Animated Scroll Down Cue -->
        </div>
    </div>
</div>
```

---

## 4. The Alam's Pentagon Floating CTA Badge Implementation

### Architectural Goal
Provide an immediate luxury touchpoint for the client's flagship ongoing commercial development (**The Alam's Pentagon** at Kolaghat) without cluttering the screen or interfering with the scroll indicator.

### Precise HTML Component (`index.html`)
```html
<div class="absolute bottom-[75px] sm:bottom-[90px] left-1/2 -translate-x-1/2 z-30 pointer-events-auto opacity-0" data-target="banner-pentagon-cta">
    <a href="/alams-pentagon/" class="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-black/45 backdrop-blur-24 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 group shadow-lg">
        <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#CBB26A] animate-pulse"></span>
        <span class="font-sans text-9 sm:text-11 tracking-[0.18em] uppercase font-light text-white group-hover:text-black transition-colors duration-300">The Alam's Pentagon • Ongoing Project</span>
        <svg class="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/70 group-hover:text-black transition-colors duration-300 transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
    </a>
</div>
```

### JS Bundle Binding (`assets/js/bundle.js`)
To ensure this badge participates in the GSAP orchestration:

1. **Selector Initialized (Line 4225):**
   ```javascript
   var bannerPentagonCta = (0,_js_utils_querySelector__WEBPACK_IMPORTED_MODULE_0__.$qs)('[data-target="banner-pentagon-cta"]');
   ```
2. **Fade-Out Target on Scroll (Line 4292):**
   ```javascript
   scrollTimeline.addLabel('start').to(horizontalScroll, {
     autoAlpha: 1,
     duration: 1,
     ease: 'none'
   }, 'start').to([bannerText1, bannerScroll, bannerPentagonCta], {
     autoAlpha: 0,
     duration: 0.25,
     ease: 'none'
   }, 'start')
   ```
3. **Intro Preloader Fade-In (Line 4359):**
   ```javascript
   .to([bannerText1, bannerScroll, menuWrapper, audioIcon, bannerPentagonCta], {
     autoAlpha: 1,
     duration: 0.5,
     ease: 'none'
   }, 'image+=1.75');
   ```
4. **Instant Returning Visitor Fade-In (Line 4380):**
   ```javascript
   .to([bannerText1, bannerScroll, menuWrapper, audioIcon, bannerPentagonCta], {
     autoAlpha: 1,
     duration: 0.5,
     ease: 'none'
   }, 'start');
   ```

---

## 5. Lead Capture Engine & Free Estimate Modal Deep Dive

### Problem & Historical Flaw
In earlier iterations, the "Free Estimate" button relied on direct jQuery/vanilla click bindings assigned on DOM ready. When GSAP re-rendered portions of the navigation bar or when Lenis intercepted touch events, the click listener silently detached.

### Hardened Architecture (`assets/js/estimate-modal.js`)

1. **Delegated Document Listener:**
   Instead of binding to specific nodes, the script listens on `document`:
   ```javascript
   document.addEventListener('click', function(e) {
     var trigger = e.target.closest('[data-open-estimate]');
     if (trigger) {
       e.preventDefault();
       e.stopPropagation();
       openEstimateModal();
     }
   });
   ```
2. **Z-Index Layering:**
   GSAP's `pin: bannerContentFixed` creates high-priority stacking contexts (`z-30`, `z-40`). To prevent the modal from rendering *underneath* pinned hero elements:
   ```css
   /* assets/css/estimate-modal.css */
   .luxi-estimate-backdrop {
     z-index: 99998 !important;
     backdrop-filter: blur(16px);
     -webkit-backdrop-filter: blur(16px);
   }
   .luxi-estimate-modal {
     z-index: 99999 !important;
   }
   ```
3. **Conversion & WhatsApp Webhook:**
   When the user submits their name, phone, property type (2BHK, 3BHK, Villa, Office), and budget range:
   - Validates Indian 10-digit phone patterns.
   - Dispatches data via AJAX/Webhook.
   - Builds an encoded URI string:
     `https://wa.me/91XXXXXXXXXX?text=Hi%20Luxihome,%20I'd%20like%20a%20free%20estimate%20for%20a%20...`
   - Immediately opens WhatsApp in a new tab for instantaneous lead follow-up.

---

## 6. Typography System & Desktop Scale Fixes

### Custom Typography Stack
The LUXiHOME brand uses custom high-luxury typefaces defined in `assets/css/styles.css`:
- `font-serif`: **Romantically** (`assets/fonts/romantically.woff2`).
- `font-sans`: **Aviano Sans** (`AvianoSans-Light.woff`, `AvianoSans-Reg.otf`, `AvianoSans-Bol.otf`, `AvianoSans-Thin.ttf`).
- `font-mono`: **DIN 2014 Light** (`assets/fonts/din-2014_light.woff2`).

### Desktop / PC Viewport Scaling
Previously, the hero subtitle:
`"A Curated Portfolio of Bespoke Residences, Crafted Across Two Iconic Architectural Styles."`
appeared tiny on high-resolution PC displays (24", 27", and 4K displays).

**Current Responsive Rule:**
```html
<p class="font-sans font-light text-30 sm:text-52 md:text-60 lg:text-68 xl:text-76 2xl:text-84 leading-[1.15] tracking-1.5 sm:tracking-2 lg:tracking-2.5 lg:px-30 xl:px-0 max-w-[1400px] mx-auto">
    A Curated Portfolio of Bespoke Residences, <br class="hidden sm:inline"/>Crafted Across Two Iconic Architectural Styles.
</p>
```
- **Mobile (<640px):** `text-30` (30px), tight line-height to fit within viewport limits.
- **Tablet (640px–1024px):** `text-52` to `text-60` with expanded letter-spacing (`tracking-2`).
- **Desktop (1024px–1536px):** `text-68` to `text-76`.
- **Ultrawide PC (1536px+):** `text-84` (84px) capped at `max-w-[1400px]` with auto margins to maintain editorial elegance.

---

## 7. Asset Pipelines, Directory Quirks & Image Repositories

### 1. The Typo in the Directory Name
The physical directory for project photos contains a permanent historical typo:
`pictures.testimonals/` *(Note: 'testimonals', not 'testimonials')*.
**NEVER rename this folder on the filesystem.** Dozens of project pages, CSS background-image properties, and image URLs are hardcoded to `pictures.testimonals/`. Renaming it will break 100+ image references across the site.

### 2. Directory Structure:
```
pictures.testimonals/
├── new.town.work/            # Modern residential interiors from New Town
├── salt.lake.work/           # Salt Lake residential projects
├── park.street.work/         # Heritage & luxury high-ceiling apartments
├── rajarhat.work/            # High-rise apartment interiors
└── real.residential.pic/     # Curated raw site photos (bedrooms, living rooms)
```

### 3. Image Curation Standard (Strict Brand Rule)
- **NO TOILETS OR WASHROOMS ON COVER CARDS:** Washroom and powder room photos must never be used as primary project thumbnails or menu card covers.
- **HERO THUMBNAIL HIERARCHY:**
  1. Primary: Warm luxury living room with architectural lighting.
  2. Secondary: Designer master bedroom with bespoke headboards.
  3. Tertiary: Minimalist modular kitchen island.
- **Accompanying Copy:** Every project image must have contextual narrative copy describing the materials (fluted oak, brass accents, Italian marble) rather than generic placeholder text.

---

## 8. Multi-Template Mirror Structure & Sub-Routes

This repository houses legacy sub-routes from prior client review iterations:
- `/index.html`: The active root production landing page.
- `/amali/index.html`: Standalone Amali clone baseline.
- `/island/index.html` & `/island/amali-island-welcome/index.html`: Specific sub-route mirrors.
- `/alams-pentagon/index.html`: Dedicated commercial project page for Alam's Pentagon.
- `/journal/index.html` & `/journal/*/`: Knowledge base & editorial articles.

*Developer Requirement:* When updating global branding assets or top-level navigation, check whether the update applies strictly to root `/index.html` or should be mirrored across sub-routes.

---

## 9. Automated Verification & Playwright Gotchas

### Critical Playwright Test Behavior
When testing this site with Playwright or any headless Chromium runner:
```python
# WRONG - WILL TIME OUT AFTER 30 SECONDS:
page.goto("https://luxihome-mobile-check.vercel.app/")
page.wait_for_load_state("networkidle")
```
*Why this fails:* The background hero video (`luxihome-hero-video.mp4`) and secondary tour video stream continuously in chunks. Headless browsers waiting for `networkidle` or `load` will exceed the default 30-second timeout.

```python
# CORRECT - ROBUST AUTOMATED PATTERN:
page.goto("https://luxihome-mobile-check.vercel.app/", wait_until="domcontentloaded")
page.wait_for_selector('[data-target="banner-pentagon-cta"]')
```

### Verification Script Location
- Scratch verification harnesses are maintained in `scratch/`:
  - `scratch/verify_pentagon_cta.py`: Local verification on port 8089.
  - `scratch/verify_live.py`: Production verification against live Vercel URL.

---

## 10. Vercel Deployment Pipeline & CLI Protocols

### Production Deployment Command
To deploy directly to production bypassing interactive prompts:
```powershell
npx vercel --prod --token $env:VERCEL_TOKEN --yes
```

### Key Vercel Details:
- **Project Name:** `luxihome-mobile-check`
- **Scope / Team:** `demgrow-projects-227aff0c`
- **Target Aliases:**
  - `https://luxihome-mobile-check.vercel.app`
  - `https://luxihome-mobile-check-q6bskpewh-demgrow-projects-227aff0c.vercel.app`
- **Asset Upload Profile:** Over 7,500 static files. Average build time is ~14 seconds.

---

## 11. Developer Dos and Don'ts (The Golden Rules)

### DO:
1. **Use event delegation** for any click handlers or interactive components that overlay GSAP pinned sections.
2. **Respect `data-target` attributes:** Add new animation hooks in `assets/js/bundle.js` only after verifying their selectors exist in `index.html`.
3. **Use `domcontentloaded`** when executing headless browser audits.
4. **Use `;` instead of `&&` in Windows PowerShell** when running sequential terminal commands.
5. **Always test on both Mobile (375x812) and Desktop (1280x800+)** viewports.

### DON'T:
1. **DO NOT rename `pictures.testimonals`** under any circumstance.
2. **DO NOT remove `luxi-intro-scroll-lock` logic** from `assets/js/bundle.js`—it prevents catastrophic scroll desynchronization on page load.
3. **DO NOT commit uncompressed 4K video files** to the repository without running handbrake / ffmpeg compression.
4. **DO NOT use raw washroom photos** as cover images on project cards.
5. **DO NOT hardcode inline styles that override GSAP transforms** (`translate3d`, `matrix`, `opacity`), as GSAP will fight inline CSS rules.

---

## 12. Git Commit Audit Trail & Change Manifest

| Commit Hash | Author / Date | Description & Changes |
| :--- | :--- | :--- |
| `7ace1a2` | Dev (20 Sep 2026) | `docs: save comprehensive project context and implementation log (20 Sep 2026)` — Created `CONTEXT.md` and `new_context_20_sep.md`. |
| `168da24` | Dev (19 Sep 2026) | `feat(hero): add minimal Alam's Pentagon floating badge CTA in hero section` — Added pill badge in `index.html` & integrated into `bundle.js` timelines. |
| `55ab464` | Dev (19 Sep 2026) | `style(hero): scale up PC/desktop font size for hero subtitle banner` — Scaled typography to `text-84` for ultrawide desktop monitors. |
| `cadf755` | Dev (19 Sep 2026) | `feat(hero): update hero subtitle copy and restore Grande Minima title` — Restored "Grande Minima" and applied client residential copy. |
| `93fde77` | Dev (18 Sep 2026) | `fix(estimate): make Free Estimate button click handler bulletproof...` — Delegated document listeners, z-index elevation, and cache busting (`v=luxi_est_v3`). |
| `86caeea` | Dev (18 Sep 2026) | `feat: update concept hero image, darken action buttons, and wire Free Estimate modal & Meet Our Team link`. |
