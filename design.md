# AMALI PROPERTIES (`amaliproperties.com`) — Comprehensive Design System & Architecture Specification

> **Source Domain**: [amaliproperties.com](https://amaliproperties.com/)  
> **Extracted From**: Production Theme Assets (`AmaliProperties`), Core Stylesheet (`styles.css`), Webpack Bundle (`bundle.js`), and Font Binaries.  
> **Document Purpose**: Definitive reference for all typography, color tokens, layout systems, component primitives, WebGL/motion physics, and critical architectural analysis.

---

## 1. Brand Identity & Design DNA

Amali Properties was conceived around the theme of ultra-high-net-worth (UHNW) private island luxury (The World Islands, Dubai). Its visual identity balances Mediterranean/Middle-Eastern natural materiality (travertine stone, warm sand, natural cedarwood) with contemporary monolithic minimalism.

* **Primary Mood**: Quiet, architectural luxury; monumental scale; tactile raw stone and glass.
* **Spatial Philosophy**: Screen-by-screen cinematic immersion. Full-viewport stages rather than conventional scrolling pages.
* **Atmosphere**: Low saturation, warm earthy stone, muted metallic gold, and deep oceanic obsidian.

---

## 2. Complete Typography Matrix

The Amali typography system relies on three proprietary/commercial typefaces working in concert:

| Role | Typeface | Available Weights | Rendering Characteristics | Usage in Template |
|---|---|---|---|---|
| **Display / Headlines** | `Aviano Sans` | Thin, Light, Regular, Bold | Ultra-wide geometric tracking (`letter-spacing: 0.2em - 0.5em`), all-caps, zero lowercase | Section headlines, hero titles, project numbers, primary navigation |
| **Body / Structural Data** | `DIN 2014` | Extra Light, Light, Demi | Razor-sharp, technical German sans-serif, high x-height, condensed proportions | Body copy, architectural specs, square footage, enclaves, distance markers |
| **Decorative Accent** | `Romantically` | Regular Script | Organic flowing cursive, high contrast strokes, tilted baseline | Overlapping expressive kickers, signature slogans (often misused in template) |

### Exact Font-Face Definitions

```css
@font-face {
  font-family: 'aviano-sans';
  src: url('/wp-content/themes/AmaliProperties/assets/fonts/AvianoSans-Light.woff2') format('woff2');
  font-weight: 300;
  font-display: swap;
}
@font-face {
  font-family: 'aviano-sans';
  src: url('/wp-content/themes/AmaliProperties/assets/fonts/AvianoSans-Reg.otf') format('opentype');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'aviano-sans';
  src: url('/wp-content/themes/AmaliProperties/assets/fonts/AvianoSans-Bol.otf') format('opentype');
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: 'DIN';
  src: url('/wp-content/themes/AmaliProperties/assets/fonts/din-2014_extra-light.woff2') format('woff2');
  font-weight: 200;
  font-display: swap;
}
@font-face {
  font-family: 'DIN';
  src: url('/wp-content/themes/AmaliProperties/assets/fonts/din-2014_light.woff2') format('woff2');
  font-weight: 300;
  font-display: swap;
}
@font-face {
  font-family: 'DIN';
  src: url('/wp-content/themes/AmaliProperties/assets/fonts/din-2014_demi.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}

@font-face {
  font-family: 'Romantically';
  src: url('/wp-content/themes/AmaliProperties/assets/fonts/romantically.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

### Type Scale & Letter-Spacing Tokens

* **Display Massive**: `text-70` to `text-140` (70px — 140px), tracking `0.15em` to `0.35em`
* **Section Header**: `text-32` to `text-44` (32px — 44px), tracking `0.1em`, leading `1.1`
* **Card Title**: `text-22` to `text-28` (22px — 28px), tracking `0.08em`
* **Subheading / Kicker**: `text-11` to `text-14` (11px — 14px), tracking `0.25em` to `0.35em`, uppercase
* **Body Text**: `text-15` to `text-17` (15px — 17px), leading `1.55`, font-weight `300`

---

## 3. Color Palette & Material Palette

The palette is derived directly from Mediterranean & Gulf natural elements: white sand, dark sea, travertine stone, and weathered bronze.

### Color Tokens

| Token Name | Hex Code | RGB | Alpha Variants | Material Meaning |
|---|---|---|---|---|
| **`dark-blue`** | `#1A2026` | `rgb(26, 32, 38)` | `/10`, `/30`, `/80`, `/95` | Deep oceanic charcoal / primary luxury dark ground |
| **`sand`** | `#DAD0C1` | `rgb(218, 208, 193)` | Solid | Raw travertine stone / sun-bleached sand ground |
| **`gold`** | `#C2A26A` | `rgb(194, 162, 106)` | Solid | Brushed champagne gold / metallic badges & borders |
| **`brown`** | `#726152` | `rgb(114, 97, 82)` | Solid | Terra cotta, weathered teakwood, warm bronze |
| **`grey-blue`** | `#3D4854` | `rgb(61, 72, 84)` | Solid | Deep atmospheric slate / shadow tint |
| **`slate`** | `#5C7A92` | `rgb(92, 122, 146)` | Solid | Seafoam slate / secondary water accents |
| **`white`** | `#FFFFFF` | `rgb(255, 255, 255)` | `/5`, `/10`, `/20`, `/50`, `/70`, `/90` | Frosted glass backgrounds, crisp typography |
| **`black`** | `#000000` | `rgb(0, 0, 0)` | `/10`, `/20`, `/35`, `/50`, `/70` | Backdrop shading, vignette overlays |

---

## 4. Layout Architecture & Viewport System

### Screen-by-Screen Horizontal & Vertical Phasing
The Amali home layout is built as a sequential multi-stage presentation:

1. **Stage 1 (`home-banner`)**: Fullscreen 100vh hero with background video, logo lockup, and bottom scroll trigger pill.
2. **Stage 2 (`horizontal-scroll` / `architecture`)**: A GSAP pinned horizontal scroll container (`h-[2300px]` scroll distance) simulating panoramic villa views.
3. **Stage 3 (`popup-links`)**: Negative-margin transition (`-mt-[100vh]`) featuring full-bleed aerial architectural photography.
4. **Stage 4 (`lifestyle-banner`)**: The residences showcase featuring interactive sliders and floating glassmorphic information cards.
5. **Stage 5 (`island-banner`)**: The World Islands Dubai showcase with distance pills and interactive map pins.
6. **Stage 6 (`interiors-banner`)**: Dual-aesthetic comparison (Terra vs. Ultra) with clip-path image reveals.
7. **Stage 7 (`teasers`)**: Huge Amali watermark backdrop with editorial footer navigation.

### Responsive Breakpoints

* **Mobile**: `< 640px` (`max-sm`) — stacked flow, simplified touch targets
* **Tablet**: `640px — 1023px` (`sm` to `lg`) — transitional layouts
* **Desktop**: `>= 1024px` (`lg`) — full GSAP pinning, horizontal scroll, SVG distortion filters
* **Ultrawide**: `>= 1440px` (`xl`, `2xl`) — constrained 1920px max-width canvases with proportional `vw` typography

---

## 5. Component Library & Signature Design Elements

### 1. The Amali Pill Button (`.amali-pill-btn`)
The signature interactive element across the entire website:
* **Geometry**: `border-radius: 60px` (or `90px` for large variants), generous padding (`10px 14px 10px 26px`).
* **Material**: Semi-transparent glass (`background: rgba(255, 255, 255, 0.12)`, `backdrop-filter: blur(20px)`).
* **Border**: Subtle hairline stroke (`border: 1px solid rgba(255, 255, 255, 0.22)`).
* **The Arrow Disc**: A circular white disc (`width: 36px; height: 36px; border-radius: 50%`) containing an SVG chevron that shifts on hover.
* **Hover State**: Inverts to solid white background (`#FFFFFF`) with dark text (`#1A2026`) and lifts (`translateY(-2px)`).

### 2. Floating Glassmorphic Cards (`.showcase-glass-card`)
Used in the residences showcase to float architectural narratives over full-bleed photography:
* **Background**: `rgba(11, 17, 24, 0.75)` with heavy backdrop blur (`backdrop-filter: blur(28px)`).
* **Border**: Hairline luminescence (`1px solid rgba(255, 255, 255, 0.16)`).
* **Shadow**: Multi-layer dark shadow (`box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.7)`).
* **Corner Radius**: `16px` (desktop) down to `14px` (mobile).

### 3. Circular Progress Ring (`.showcase-progress-wheel`)
A circular SVG loader indicating current slide index:
* **Radius**: `r="19"`, Circumference `~119.38px` (or `r="25"`, Circumference `~157px`).
* **Background Track**: `stroke: rgba(255, 255, 255, 0.2)`, `stroke-width: 1.5px`.
* **Animated Progress Stroke**: `stroke: #FFFFFF`, animated via `stroke-dashoffset`.
* **Center Counter**: Centered serif numeral (`01`, `02`, etc.).

---

## 6. Motion Physics, WebGL & Animation Stack

| Engine | Version | Implementation Purpose |
|---|---|---|
| **`Lenis`** | `v1.x` | Hardware-accelerated smooth momentum scrolling, lerp `0.1`, touch inertia |
| **`GSAP 3`** | `v3.12` | Timeline choreographies, timeline labels, transforms, scrub controllers |
| **`ScrollTrigger`** | `v3.12` | Viewport pinning (`pin: true`), horizontal translations, clip-path reveals |
| **`Barba.js`** | `v2.1` | Single-page seamless transitions without full browser page reloads |
| **`Curtains.js`** | `v8.x` | WebGL canvas plane shaders for liquid ripple displacements |
| **`SVG Filters`** | Native | `<feDisplacementMap>` + `<feTurbulence>` for ripple transitions between sections |

### Liquid Distortion Filter Setup

```html
<svg class="distort" style="position: absolute; width: 0; height: 0;">
  <filter id="distortionFilter">
    <feTurbulence baseFrequency="0.01 0.04" numOctaves="2" result="warp" type="fractalNoise"/>
    <feDisplacementMap id="displacementMap" in="SourceGraphic" in2="warp" scale="0" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</svg>
```
On section transitions, GSAP animates the `scale` attribute of `feDisplacementMap` from `0 -> 100 -> 0`, creating a momentary watery warp effect as the new image snaps in.

---

## 7. Critical Flaws in the Original Website ("Why It Fails")

Despite its visual ambition on desktop, the original Amali template suffers from severe design and architectural flaws:

### 1. The Mobile Neglect (Desktop-Centric Failure)
* In `bundle.js`, the core scroll animations contain:
  ```javascript
  if (!media.lg) return;
  ```
  On screens `< 1024px`, the GSAP pinning logic terminates completely. However, the markup still retains hardcoded negative margins (`-mt-[100vh]`), absolute positioning, and zero-height wrappers.
* **Result**: On mobile devices, sections collide and render directly on top of each other, creating unreadable overlapping text.

### 2. Typographic Collisions
* The cursive script `Romantically` was hardcoded to absolute positions overlapping the clean geometric display font `aviano-sans`. On small screens with variable height, this creates an illegible tangle of cursive loops directly over the city name.

### 3. Heavyweight Bloat & Performance Lag
* The website loads `bundle.js` (~2.6 MB uncompressed), Barba.js, Curtains.js, GSAP plugins, Gravity Forms scripts, and high-resolution unoptimized WebP videos simultaneously.
* Mobile CPUs experience frame drops, scroll hijacking stutter, and high thermal throttling.

### 4. Rigid 100vh Viewport Bugs
* The code uses `h-screen` (`100vh`) rather than `100dvh` (dynamic viewport height). When mobile browser chrome (address bars) appears and disappears, layouts jump and buttons get clipped off the bottom edge.

---

## 8. Architectural Takeaways for LUXiHOME

To achieve a true ultra-luxury experience that surpasses Amali without inheriting its flaws:

1. **Mobile-First Responsive Priority**:
   * Build every section using responsive **CSS Flexbox / Grid** rather than uncoordinated `absolute` offsets.
   * Use `100dvh` for full-screen viewports to guarantee mobile address bar safety.
2. **Tactile Interactive Deck (Morgan Sizzey Model)**:
   * Replace fragile horizontal scroll containers with native, vertical **Sticky Card Decks**.
   * Layer cards sequentially with 3D scale and opacity depth (`scale(0.94)`, `translateY(-14px)`), matching UHNW editorial standards.
3. **Razor-Sharp Typography**:
   * Replace illegible cursive scripts with crisp editorial display serifs (**Cormorant Garamond**, **Playfair Display**) and Swiss-grade sans-serif (**Inter**).
   * Maintain strict contrast ratios (minimum 4.5:1) against dark architectural imagery.
4. **Lightweight Native Performance**:
   * Prefer CSS `position: sticky` and requestAnimationFrame-throttled transforms over heavy third-party WebGL runtimes for 60fps fluidity on any mobile device.
