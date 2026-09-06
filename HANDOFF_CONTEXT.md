# LUXIHOME MASTER PROJECT HANDOFF & CONTEXT SPECIFICATION

> **Date:** September 5, 2026  
> **Workspace Root:** `c:\Users\MOAZZAM\coding\luxihome`  
> **Active Environment:** Local Server `http://localhost:3000/` (Strictly local per user instruction; no remote Vercel auto-deploys)  
> **Remote Production (Archive):** `https://luxihome-delta.vercel.app` (GitHub: `origin/main`)  
> **Document Purpose:** Complete, comprehensive, and precise chronological handoff detailing all chat history, audio instructions, reference materials, technical architecture, cloned multi-site components, animation mechanics, brand blueprints, and immediate next steps for the transition into **LUXiHOME**.

---

## TABLE OF CONTENTS
1. [Chronological Conversation & Directive Log](#1-chronological-conversation--directive-log)
2. [Audio Transcripts & Primary Requirements](#2-audio-transcripts--primary-requirements)
3. [Brand Blueprint: LUXiHOME (The Alam Interior)](#3-brand-blueprint-luxihome-the-alam-interior)
4. [Workspace Architecture & Multi-Site Ecosystem](#4-workspace-architecture--multi-site-ecosystem)
5. [The Amali Engine: Technical Animation Breakdown](#5-the-amali-engine-technical-animation-breakdown)
6. [Tooling, Scripts & Asset Pipelines Created](#6-tooling-scripts--asset-pipelines-created)
7. [Current State & Operational Guidelines](#7-current-state--operational-guidelines)
8. [Immediate Execution Roadmap for LUXiHOME](#8-immediate-execution-roadmap-for-luxihome)

---

## 1. CHRONOLOGICAL CONVERSATION & DIRECTIVE LOG

The project progressed through distinct phases of design exploration, 1:1 replication, asset reverse-engineering, and animation tuning:

### Phase A: Initial Concept & Audio Directives
- **Prompt 0:** User provided WhatsApp voice notes (`WhatsApp Ptt 2026-09-02 at 12.14.53 PM.ogg`, `12.16.43 PM.ogg`, etc.), reference PDF (`Luxihome - Shaping Space , Defining Luxury  A Sig_251110_153946.pdf`), and the reference website `https://amaliproperties.com/island/amali-island-welcome/`.
- **Prompt 125:** Direct transcript of user voice notes establishing:
  - White, clean, ultra-minimalist luxury aesthetic.
  - 100% residential focus (no commercial).
  - Exact duplication of the Amali Island Welcome animations, transitions, and layout.
  - Project portfolio organized by prime Kolkata residential localities (Ripon Street, Park Street, Beck Bagan, Ballygunge, Salt Lake) for organic local SEO.
- **Prompt 132 & 136:** Request for sample animations and visual fidelity check before full production build.
- **Prompt 152 & 203:** Clear `/goal`: Clone `https://amaliproperties.com/island/amali-island-welcome/` 1:1 with all animations, assets, fonts, Lottie vector graphics, and smooth transitions.
- **Prompt 279 & 319:** Project pushed to GitHub repository and deployed to Vercel as `luxihome`.

### Phase B: House of Honey Exploration
- **Prompt 323:** User issued a `/goal` to clone `https://www.houseofhoney.com/` (40-page luxury interior design studio).
- **Prompt 611 to 703:** Iterative feedback on House of Honey:
  - Calibrated custom honeybee cursor (`bee.riv` / Rive animation).
  - Implemented Lenis smooth inertial scrolling with heavy viscosity ("stream of honey flowing").
  - Fixed marquee drag-and-scroll text synchronization.
- **Prompt 810:** Amali Island design preserved in a dedicated subfolder (`/amali/`) while House of Honey remained root.
- **Prompt 855:** Noted upstream Amali design adjustments on the live site.

### Phase C: Telha Clarke Architecture Studio Clone
- **Prompt 925:** User issued a `/goal` to clone `https://telhaclarke.com.au` (complete multi-page Australian architecture studio with 28 detailed case studies, smooth reveals, and custom grids).
- **Prompt 1300 to 1428:** Complete Telha Clarke clone finished with offline image sync and full case studies.
- **Prompt 1428:** Preserved Telha Clarke in `/telha-clarke/` and returned House of Honey to root.

### Phase D: Reinstating Amali as Mainstream & Transitioning to Luxihome
- **Prompt 1486:** User commanded: *"Hey... Now make the amali design main version... and then I will tell you what is to be done."* Root `/index.html` was switched back to the Amali Island Welcome site with full WordPress assets and Lottie animations restored.
- **Prompt 1635:** User shared screenshots of the intro animation:
  - Initial state: Centered logo on deep blue screen.
  - Intermediate state: Background reveals and blurs while logo zooms out (scales down) and moves toward its docked header position.
  - Final state: Logo locked in header, backdrop sharp, hero typography fades in.
- **Prompt 1911:** User confirmed:
  > *"Now done fucking around... Now we are making this one the final base version of the page we are try'na build for luxihome... Now we start swapping information and media of this amali design with that of luxihome, and in the mean time.. don't push to vercel again and again... keep it local for now..."*
- **Prompt 1937:** Request for this comprehensive Markdown handoff document.

---

## 2. AUDIO TRANSCRIPTS & PRIMARY REQUIREMENTS

From the transcribed voice messages (`WhatsApp Ptt 2026-09-02`):

```text
Audio 1:
"Dekho, uska ideology aisa hai usko is type ka website chahiye.
Design dekho aur usko background white chahiye website ka mostly.
Toh is type ka ideology dekho, minimalistic banaoge, jyada taam-jhaam nahi ghusaoge,
lekin sort of yahi hai, AI ko doge information nikaal lega uska."

Audio 2:
"And iska jo specific page jo hum link diye hain, yahi page bas lena, poora page copy mat karna iska.
Jo specific island ka page bheje hain, yahi island ka page ko leke upar design marna."

Audio 3:
"Yeh wala animation rakhoge must, woh bola hai.
Yeh background chaho rakh sakte ho, hatana chaho hata sakte ho.
Like theme aisa hoga aur animation iska sort of fade hoga.
AI ko bologe ki jo tumhara ja ke iska HTML file download kar dene, / goal deke.
Iska HTML file download karne ke baad, poora website ko copy karne ke baad, uske upar edit karoge.
Kyunki agar AI scratch se banayega toh fir kachra banata hai.
Toh us hisaab se dekh lo bhai, agar scratch se banaoge toh bhi bana sakte ho lekin
yeh animations iska ditto copy chahiye yeh wala website se.
Aur photo bas change kar doge, aur theme white rakhoge, isko background white chahiye aur minimalistic chahiye. Bas.
Aur yeh wala jo luxury home ka jo banega, yeh log sirf tumhara residential kaam karta hai,
toh poora website jo hai residential base mein banna chahiye, commercial base mein nahi ho raha hai.
Toh iska residential mein banaoge.
Aur menu section mein sirf projects daaloge.
Toh menu section mein tum commercial aur residential nahi daaloge, menu section mein like 4-5 projects
bana doge section ka alag-alag jagah ka.
/ Ripon Street deke, / Park Street deke, isse SEO achha hota hai, / Beck Bagan deke.
/ Ballygunge deke, aisa Salt Lake deke, toh like 4 piece bana doge project section aur usme project ka
like Pinterest se photo nikaal ke daal doge usme."

Audio 4:
"Yeh wala jo specific page hai, yeh wala page ko, like yeh page usko chahiye.
I mean hum uska photo bhej rahe hain jiska animation chahiye.
Yeh page ka like animation aur theme almost rakhoge.
Aur photos sab poora change kar doge, uska type ka nikaloge, Pinterest se photo nikaal loge interior designer ka.
Aur jo ideology uska bheje hain waisa copy karoge, aur animation ek dikha rahe hain woh wala rakhoge iska website ke saath."
```

### Core Takeaways:
1. **Base Framework:** Do not build from scratch. Use the extracted, fully functioning Amali Island Welcome page (`index.html`) as the exact animation engine.
2. **Animation Mandate:** Preserve the smooth reveals, GSAP timelines, custom easing (`imageEase`), Lottie logo vector transitions, and horizontal scrolls.
3. **Aesthetic Direction:** Clean, minimal, high-end white / light luxury theme.
4. **Business Scope:** Strictly residential luxury turnkey interiors and private architecture (no commercial focus).
5. **SEO & Navigation Structure:** Projects menu segmented by prime Kolkata residential areas:
   - **Ripon Street**
   - **Park Street**
   - **Beck Bagan**
   - **Ballygunge**
   - **Salt Lake**

---

## 3. BRAND BLUEPRINT: LUXiHOME (THE ALAM INTERIOR)

Extracted directly from `Luxihome - Shaping Space , Defining Luxury  A Sig_251110_153946.pdf`:

### 3.1 Brand Identity
- **Official Brand Name:** LUXiHOME (The Alam Interior ®)
- **Tagline / Slogan:** *"Shaping Spaces, Defining Luxury."*
- **Parent Legacy:** The new premier brand identity evolved from *The Alam Interior ®*.
- **Brand Position:** Turnkey bespoke interior design and execution for ultra-luxury residential properties.

### 3.2 Leadership Team
- **Sj. Alam (Badshu):** Co-Founder & Director  
  *Role:* Oversees high-level design vision, execution strategy, and operational precision.
- **Jammy Sheikh:** Co-Founder & Lead Interior Designer  
  *Role:* Leads creative concept development, space planning, bespoke layouts, and material innovation.
- **Larika Yasmin (Marry):** Co-Founder & Consultant  
  *Role:* Leads client relations, project coordination, and personalized customer experience.

### 3.3 Official Contact Information
- **Email:** `theluxihome@gmail.com`
- **Phone Numbers:** `+91 8217013908` / `+91 9932296966`
- **Studio Address:** `33, Black Burn Lane, Poddar Court, Tiretti, Kolkata, West Bengal 700012, India`
- **Social Handles:** `@the_luxihome` | `Luxihome`

### 3.4 Key Offerings & Capabilities
1. **Comprehensive Turnkey Interior Solutions:** Single-point accountability from concept to procurement and installation.
2. **Bespoke Residential Design:** Luxury apartments, duplexes, penthouses, and private villas.
3. **Space Planning & Optimization:** Architectural ergonomics with high aesthetic standards.
4. **Material & Palette Selection:** Curated imported marbles, bespoke woodwork, architectural metals, luxury lighting fixtures.
5. **Custom FF&E (Furniture, Fixtures & Equipment):** Tailor-made furniture and designer fixtures.
6. **Architectural & Contractor Collaboration:** Seamless coordination during execution phases.
7. **Post-Installation Support & Maintenance:** Long-term client care and finish protection.

---

## 4. WORKSPACE ARCHITECTURE & MULTI-SITE ECOSYSTEM

The repository is structured to maintain all cloned sites in parallel while allowing the mainstream root to serve the active project:

```
c:\Users\MOAZZAM\coding\luxihome\
│
├── index.html                  # ACTIVE ROOT: Amali Island Welcome (now transitioning to Luxihome)
├── live_island_welcome.html    # Raw upstream fetch reference
├── luxihome_brochure_text.txt  # Full text extraction from PDF brochure
│
├── wp-content/                 # Complete WordPress assets for Amali base
│   └── themes/AmaliProperties/assets/
│       ├── css/styles.css      # Core Tailwind/compiled CSS
│       ├── js/bundle.js        # GSAP, CustomEase, Lottie, Lenis animation bundle
│       ├── lottie/             # Vector animation files (downloaded & localized)
│       │   ├── logo.json           (24.7 KB - Animated Amali vector logo)
│       │   ├── logo-dark.json      (27.4 KB - Dark theme vector logo)
│       │   ├── hamburger.json      (2.4 KB - Animated menu icon)
│       │   ├── hamburger-dark.json (2.4 KB - Dark theme menu icon)
│       │   └── scrolldown.json     (21.3 KB - Scroll indicator)
│       └── img/                # Localized image assets and favicons
│
├── wp-includes/                # WordPress core scripts (dom-ready, hooks, i18n, a11y)
│
├── amali/                      # Dedicated archive of original Amali clone
│   └── index.html
│
├── house-of-honey/             # Complete 40-page offline House of Honey website
│   ├── index.html              # Main landing with Lenis honey-scroll & bee cursor
│   ├── assets/                 # Localized CSS, JS chunks, Rive animation (bee.riv)
│   └── [40 subpages]/          # Press, Team, Projects, Gallery, Contact, etc.
│
├── telha-clarke/               # Complete Telha Clarke architecture studio clone
│   ├── index.html              # Main case study index with dynamic grid
│   ├── assets/                 # Fonts, CSS, JS, localized imagery
│   └── [28 project pages]/     # Detailed project case studies
│
├── scratch/                    # Operational diagnosis and verification scripts
│   ├── check_live_amali.py
│   └── ...
```

---

## 5. THE AMALI ENGINE: TECHNICAL ANIMATION BREAKDOWN

The intro sequence and continuous scroll interactions are controlled by `wp-content/themes/AmaliProperties/assets/js/bundle.js`.

### 5.1 The Banner Intro Timeline (`function banner()`)
Located at lines 4190–4315 in `bundle.js`:

```javascript
// Key Elements
var menuLogo = $qs('[data-target="logo-lottie"]');
var menuWrapper = $qs('[data-target="menu-wrapper"]');
var audioIcon = $qs('[data-target="audio"]');
var banner = $qs('[data-name="home-banner"]');
var bannerImage = $qs('[data-target="banner-image"]');
var bannerBlur = $qs('[data-target="banner-blur"]');
var bannerContentFixed = $qs('[data-target="banner-content-fixed"]');
var bannerText1 = $qs('[data-target="banner-text-1"]');
var bannerScroll = $qs('[data-target="banner-scroll"]');
var logoLottieWrapper = $qs('[data-target="logo-lottie"]');

// Custom Easing registered via GSAP CustomEase:
CustomEase.create('imageEase', 'M0,0 C0.173,0 0.217,0.107 0.283,0.213 0.359,0.335 0.403,0.455 0.456,0.594 0.5,0.71 0.509,0.79 0.608,0.891 0.675,0.959 0.737,1 1,1');

// Timeline condition:
if (window.scrollY < 10 && !window.sessionStorage.getItem('preloader_seen')) {
    // 1. Logo Lottie plays line stroke reveal:
    logoLottie.animation.goToAndPlay(75, true);
    
    // 2. GSAP fromTo on menuLogo (Scale 1.8 -> 1.0, 50vh -> Header):
    timeline.fromTo(menuLogo, {
        top: '50vh',
        yPercent: -50,
        y: -40,
        x: mediaQueries.media.sm ? 0 : (window.innerWidth / 2 - menuLogo.offsetWidth / 2 - 40) + 'px',
        scale: 1.8
    }, {
        scale: 1,
        top: 'auto',
        yPercent: 0,
        y: 0,
        x: 0,
        duration: 2.5,
        ease: 'imageEase'
    }, 'image')
    
    // 3. Hero background image pans up:
    .to(bannerImage, { yPercent: -50, duration: 2.5, ease: 'imageEase' }, 'image')
    
    // 4. Backdrop filter unblurs:
    .to(bannerBlur, { backdropFilter: 'blur(0px)', duration: 2.5, ease: 'power3.in' }, 'image')
    
    // 5. Header controls & hero headline fade in:
    .to([bannerText1, bannerScroll, menuWrapper, audioIcon], { autoAlpha: 1, duration: 0.5, ease: 'none' }, 'image+=1.75');
}
```

### 5.2 The `preloader_seen` Session Flag
- **Mechanic:** Upon completion of the intro, line 4221 executes:
  `window.sessionStorage.setItem('preloader_seen', true);`
- **Impact:** Once set, any subsequent page refresh or internal navigation immediately executes the `else` branch (bypassing the center-scale zoom and rendering the logo instantly docked).
- **Development Note:** For continuous testing and tuning on `localhost:3000`, clearing this flag via `sessionStorage.removeItem('preloader_seen')` allows the full intro to replay upon reload.

---

## 6. TOOLING, SCRIPTS & ASSET PIPELINES CREATED

During earlier sessions, numerous automation scripts were built to extract, optimize, and verify assets:
- `bundle_house_of_honey.py`: Chunker and analyzer for House of Honey components.
- `download_honey_assets.py` / `scrape_all_honey.py`: Automated deep asset downloader for House of Honey.
- `scrape_telha_clarke.py` / `download_telha_images.py`: Playwright & requests scrapers for Telha Clarke's 28 case studies.
- `process_telha_pages.py`: Offline URL rewrite engine for local browsing.
- `find_cursor.py`: Rive animation locator for the interactive bee cursor.
- `optimize_images.py`: Batch image optimization and resizing tool.
- `check_selectors.py` / `inspect_dom.py`: DOM structure analyzers.

---

## 7. CURRENT STATE & OPERATIONAL GUIDELINES

1. **Local Server Status:**
   - Dev server running on `http://localhost:3000/`.
   - Access is instantaneous, offline-ready, and verified.
2. **Git & Deployments:**
   - **Branch:** `main` (clean, fully synced with `origin/main` commit `5874fc7`).
   - **Vercel Rule:** Per the user's explicit command, **no automated pushes or deployments to Vercel**. Everything must remain local until instructed otherwise.
3. **Active Page Base:**
   - `index.html` represents the full Amali Island Welcome base template.
   - All interactive components (Enquire modal, audio toggle, video controls, horizontal scroll triggers) are active.

---

## 8. IMMEDIATE EXECUTION ROADMAP FOR LUXiHOME

The base template is now ready to be transformed into **LUXiHOME**. The following phases outline the step-by-step implementation:

### Phase 1: Brand Identity & Vector Logo Swap (COMPLETED)
- Extracted official vector paths from user-provided `image (1).svg`:
  - Architectural faceted pavilion canopy
  - Horizontal datum divider
  - `LUXiHOME` wordmark
- Tightened bounding box to eliminate 46px top margin and 70px side whitespace for maximum visual presence.
- Generated clean dual-theme assets:
  - `assets/img/logos/luxihome-stacked-light.svg` (#FFFFFF)
  - `assets/img/logos/luxihome-stacked-dark.svg` (#1A2026)
- **Enlarged Logo Sizing (per user feedback: "Logo looks pretty small ... make it big"):**
  - **Desktop Header Dock:** Expanded from 130px to **220px** wide (`w-[125px] sm:w-[170px] lg:w-[220px]`).
  - **Opening Intro Screen:** Increased GSAP center scale to **2.8x** on desktop (616px wide commanding brand reveal on deep cobalt blue screen).
  - **Mobile Responsive Scale:** Configured dynamic responsive scale (`1.7x` mobile, `2.1x` tablet, `2.8x` desktop) with 49.5px clearance above hero typography.
  - Verified across desktop (1440x900) and mobile (390x844) with zero overflow or overlap.

### Phase 2: Metadata, Titles & Copy Transition
- **Page Title:** `LUXiHOME | Shaping Spaces, Defining Luxury`
- **Meta Description:** `Turnkey bespoke residential interior design and architectural execution in Kolkata. Curated luxury spaces crafted with precision by The Alam Interior.`
- **Hero Headline:** Transform from Dubai archipelago copy to Luxihome's signature residential statement:
  > *"BESPOKE RESIDENTIAL ARCHITECTURE & TIMELESS INTERIORS"*
- **Footer:** Update copyright to `© LUXiHOME 2026 (The Alam Interior ®). All rights reserved.`

### Phase 3: Projects Navigation (Kolkata Localities for SEO)
Update the navigation and project portfolio sections to feature the prime residential zones designated in the voice notes:
1. **Park Street Private Residence** (Penthouse / Minimalist Luxury)
2. **Ballygunge Estate** (Modern Heritage Villa)
3. **Beck Bagan Apartment** (Contemporary Bespoke Interiors)
4. **Ripon Street Residence** (Refined Urban Living)
5. **Salt Lake Sanctuary** (Modernist Architectural Residence)

### Phase 4: About, Team & Services Integration
- Introduce the **About Us**, **Mission**, and **Vision** from the official brochure.
- Feature the core leadership team:
  - **Sj. Alam (Badshu)** – Co-Founder & Director
  - **Jammy Sheikh** – Co-Founder & Lead Interior Designer
  - **Larika Yasmin (Marry)** – Co-Founder & Consultant
- Detail the **Key Offerings**: Turnkey Solutions, Concept Development, Custom FF&E, Architectural Collaboration, and Budget/Project Management.

### Phase 5: Contact & Enquire Form Localization
- Connect the slide-over / popup enquiry modal to `theluxihome@gmail.com`.
- Display Kolkata studio address: `33, Black Burn Lane, Poddar Court, Tiretti, Kolkata 700012`.
- Direct phone lines: `+91 8217013908` / `+91 9932296966`.

---
*End of Handoff Specification. File saved locally at [HANDOFF_CONTEXT.md](file:///c:/Users/MOAZZAM/coding/luxihome/HANDOFF_CONTEXT.md).*


### 6. Link Sanitization & Amali Removal (Completed)
- **Zero Amali/External Outbound Links**: All 29 links across index.html were audited and updated to internal anchors (#residences, #preview, #architecture, #villas, #clubhouse, #bespoke-villa, #about, #locations, #contact, #instagram, #terms-conditions, #payment-terms, #privacy-policy, #cookies-policy, #credits) or root (/).
- **Offline Popup System**: Restored the 12 popup directories locally and updated data-href attributes to local paths (/the-architects/, /the-concept/, etc.), eliminating all CORS/403 network requests to Amali.
- **Footer Brand Updated**: Footer logo updated to LUXiHOME stacked light logo (/assets/img/logos/luxihome-stacked-light.svg), copyright text updated to © LUXiHOME 2026. All rights reserved., and external agency credit (	hewebkitchen.co.uk) removed.
- **Hero Image Candidate Added**: Added candidate hero villa image to ssets/img/hero/luxihome-hero-villa.png (1536x1024, 3:2 modern cantilevered A-frame architecture).


### 7. Hero Image Integration (Option 2 - Completed)
- **Master Vertical Outpaint Created**: Built a 3988 x 7510 px calibrated canvas based on the user's architectural villa (ssets/img/hero/luxihome-header-v3.jpg and .webp, plus mobile equivalents).
- **GSAP 700% Parallax Preserved**: Calibrated the canvas so that the upper 45% is open sky for the LUXiHOME logo & typography, and the yPercent: -50 descent glides down to center the architectural A-frame villa, its cantilevers, pine trees, and lakefront.
- **Hero Headline Updated**: Updated to LUXiHOME's signature copy: SHAPING SPACES, DEFINING LUXURY.


### 8. Live Production Deployment
- **Pushed to GitHub**: origin/main commit 2d5449e
- **Live Vercel Production URL**: [https://luxihome-delta.vercel.app](https://luxihome-delta.vercel.app)
- **Deployment URL**: [https://luxihome-6bz0z13u3-moazzam-masoods-projects.vercel.app](https://luxihome-6bz0z13u3-moazzam-masoods-projects.vercel.app)


---

### Update: Hero Video Integration & "The Alam's Pentagon"
1. **Hero Section Video Integration**:
   - Replaced static hero banner pictures with 3D architectural walkthrough video (`assets/video/luxihome-hero-video.mp4` and `.webm`, with `luxihome-hero-video-poster.jpg`).
   - Kept the exact preloader and logo entry animation intact: LUXiHOME logo scales down from center to header dock while `bannerBlur` dissolves from `backdrop-blur-30` to `blur(0px)`.
   - Updated `bannerImage` animation in `bundle.js` from `yPercent: -50` to gentle `scale: 1.06` -> `1.0` so video stays perfectly framed.
2. **"The Alam's Pentagon" Showcase**:
   - Replaced former "Grande / Minima" section with "The Alam's Pentagon".
   - Image 1: Master front facade panorama (`assets/img/hero/luxihome-header-v3.jpg`).
   - Image 2: Lakeside sunset infinity pool terrace perspective (`assets/img/residences/alams-pentagon-lakeside.jpg`).
   - Scrub words updated from "Grande" / "Minima" to "The Alam's" / "Pentagon".
   - All GSAP scrub, pin, and crossfade animations fully preserved.
3. **Local Dev Server**:
   - Active on `http://localhost:3000/`. Strictly local, no pushes to Vercel/GitHub.



### Update: Hero Video Integration with 100% Animation Preservation (Completed)
1. **Video Transcoding & Head/Tail Trimming**:
   - Source: `C:\Users\MOAZZAM\Downloads\20220524_214419_@r07qxo - R⤓Download.MP4`
   - Trimmed from 1.2s to 27.0s to remove lead-in and lead-out black frames, guaranteeing seamless looping without black flicker.
   - Encoded `assets/video/luxihome-hero-video.mp4` (`+faststart`, H.264/AAC) and `assets/video/luxihome-hero-video.webm` (VP9).
   - Extracted `assets/video/luxihome-hero-video-poster.jpg` (and `.webp`) at 0.0s for pixel-matched zero-flicker first paint.
2. **Animation Architecture Preserved**:
   - Opening preloader center reveal of LUXiHOME logo (`scale: 2.8` desktop, `2.1` tablet, `1.7` mobile at `50vh`).
   - Smooth 2.5s Bézier curve (`imageEase`) gliding logo into docked header position.
   - Frosted glass blur (`backdrop-blur-20`) dissolving cleanly to `blur(0px)`.
   - Subtle cinematic camera push (`scale: 1.08` -> `1.0`) synchronized with `imageEase`.
   - Scroll scrub timeline: hero video blurs back to `blur(15px)` as the next section dissolves in.
   - Audio button (`[data-target="audio"]`) toggles video soundtrack and updates equalizer animation.
3. **Script Safety & Bug Fix**:
   - Added guard in `_imageLazyLoading` so that swapping the hero picture for `<video>` never throws a null exception on `firstImage.complete`.
   - Both `/wp-content/themes/AmaliProperties/assets/js/bundle.js` and `/assets/js/bundle.js` updated and synchronized.
4. **Environment & Verification**:
   - Verified on `http://localhost:3000/` via Playwright automated tests.
   - All tests passing with zero JS exceptions.
   - Strictly local development (no git push / no Vercel deploy).

---

### Update: Official LUX(i)HOME Wordmark Logo Integration (Completed)
1. **New Logo Source & Processing**:
   - Source SVG: `C:\Users\MOAZZAM\Downloads\Screenshot 2026-09-06 121122.svg`.
   - Vector Identity: Official horizontal wordmark `LUX(i)HOME PVT. LTD.` with illuminated circular dot suspended over the double-line stylized `X`.
   - Extracted clean 19 vector paths, stripped C2PA metadata manifests, and calibrated bounding box: `viewBox="105 40 1010 325"` (aspect ratio ~3.11 : 1).
   - Generated production vector assets:
     - `assets/img/logos/luxihome-wordmark-light.svg` (white `#FFFFFF`)
     - `assets/img/logos/luxihome-wordmark-dark.svg` (dark blue `#13212E`)
     - Updated footer logos for consistent identity across the site.
2. **HTML & CSS Responsive Layout**:
   - Embedded inline SVGs in `[data-target="logo-lottie"]` (light) and `[data-target="logo-lottie-dark"]` (dark) inside `index.html`.
   - Responsive sizing in `<style id="wp-custom-css">`:
     - Mobile (< 640px): `145px` width (~46px height) — perfectly proportioned with clean clearance from the floating phone + hamburger menu pill.
     - Tablet (640px - 1023px): `210px` width (~67px height).
     - Desktop (>= 1024px): `260px` width (~84px height).
   - Hero headline (`[data-target="banner-text-1"]`) top offsets calibrated: `105px` mobile, `155px` tablet, `180px` desktop to balance open sky and villa roofline.
   - Preserved navigation drawer occlusion: docked logo hides cleanly when menu drawer opens.
3. **GSAP Animation Fidelity**:
   - Opening preloader center reveal preserved: scales up to `2.8x` desktop (`728px` wide) and `1.7x` mobile (`246px` wide) at `50vh`.
   - 2.5s Bézier curve (`imageEase`) glides logo smoothly into docked header position.
   - Glassmorphism blur (`backdrop-blur-20`) dissolves seamlessly down to `blur(0px)`.
   - 3D walkthrough video, audio toggle, and scroll scrub remain 100% functional.
4. **Verification**:
   - Verified via Playwright automated headless tests (`scratch/verify_hero_video.py`).
   - Clean visual layout verified across mobile (390x844) and desktop (1920x1080).
   - Strictly local on `http://localhost:3000/`. No pushes to GitHub or Vercel.

---

### Update: Complete Grande & Minima Architecture Photo Integration (Completed)
1. **User Assets Provided**:
   - **Grande Desktop**: `C:\Users\MOAZZAM\Downloads\GRANDE_PC.png` (1360 × 1157 px, lawn & infinity pool setting)
   - **Grande Mobile**: `C:\Users\MOAZZAM\Downloads\GRANDE_mobile.png` (1060 × 1484 px portrait)
   - **Minima Desktop**: `C:\Users\MOAZZAM\Downloads\PC_MINIMA.png` (1360 × 1157 px, illuminated cabanas & sand dune foreground)
   - **Minima Mobile**: `C:\Users\MOAZZAM\Downloads\MINIMA_MOBILE.png` (1071 × 1469 px portrait)
2. **Processing & Optimization**:
   - Original assets safely backed up to `wp-content/uploads/2024/04/backup_original_grande/` and `backup_original_minima/`.
   - Production assets generated in `wp-content/uploads/2024/04/`:
     - `Grande-Home-2-1.jpg.webp` (152 KB, WebP Q92) & `Grande-Home-2-1.jpg` (316 KB, JPEG Q95)
     - `Grande-Home-Mobile-2.jpg` (294 KB, JPEG Q95) & `Grande-Home-Mobile-2-640x896.jpg` (78 KB thumbnail)
     - `Minima-Home-large.png` (432 KB, WebP Q95)
     - `Minima-Home-Mobile-14.jpg` (451 KB, JPEG Q95) & `Minima-Home-Mobile-14-640x878.jpg` (129 KB thumbnail)
3. **HTML & Cache Busting**:
   - Added `?v=3` cache-busting query parameter across all Grande and Minima picture and img tags in `index.html`.
   - Calibrated container positioning classes (`flex items-end absolute top-[600px] sm:top-[1150px]`) ensuring Minima's villa and pool align seamlessly with Grande before dissolving into the sandy dune.
4. **Verification**:
   - Verified on both Desktop (1707 × 772) and Mobile (390 × 844) viewports.
   - Tested scrub sequence: Grande reveal -> GSAP crossfade scrub -> Minima reveal.
   - Strictly local on `http://localhost:3000/`. No pushes to GitHub or Vercel.

---

### Update: Urbana / Architect Section Customization (Completed)
1. **User Assets Provided**:
   - **PC**: `C:\Users\MOAZZAM\Downloads\ChatGPT Image Sep 6, 2026, 01_20_55 PM.png` (1121 × 1403 px, sunlit modern high-rise Urbana residential towers with palm planters and water features)
   - **Mobile**: `C:\Users\MOAZZAM\Downloads\mobile_urbana.jpg` (1000 × 1500 px, high-rise Urbana tower behind vine-covered gazebo park setting)
2. **Processing & Optimization**:
   - Original assets safely backed up to `wp-content/uploads/2024/04/backup_original_architect/`.
   - Production assets generated in `wp-content/uploads/2024/04/`:
     - `Architect-section.jpg` (552 KB, JPEG Q95) & `Architect-section.jpg.webp` (348 KB, WebP Q92)
     - `Architect-section-Ipad-2.jpg` (552 KB) & `Architect-section-Ipad-2.jpg.webp` (348 KB)
     - `Architect-section-Mobile-3.jpg` & variants (400x600, 640x960, 1280x1920) in JPG and WebP
3. **HTML Layout & Styling**:
   - Updated `<picture>` and `<img>` tags in `section[data-name="popup-links"]` with `w-full h-full object-cover` to span the full viewport width seamlessly without side gutters on wide monitors.
   - Added `?v=2` cache-busting query strings.
4. **Verification**:
   - Verified on Desktop (1707 × 772) and Mobile (390 × 844) viewports.
   - Preserved interactive popup buttons ("The architects" & "The concept") and GSAP pinning/blur animations.