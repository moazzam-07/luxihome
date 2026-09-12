const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// 7 Elite Kolkata Locations with High-Value Stories and Contextual Imagery
const LOCATIONS = [
  {
    slug: 'ballygunge',
    name: 'Ballygunge',
    region: 'South Kolkata',
    title: 'The Circular Road Penthouse',
    kicker: 'Ballygunge • South Kolkata',
    typology: '6,800 Sq.Ft Duplex Penthouse',
    coverImage: '/wp-content/uploads/about-interiors/grand_crystal_chandelier_drawing_room.jpg',
    excerpt: 'A grand double-height duplex combining imported Italian Statuario marble with warm teak woodwork and acoustic noise isolation.',
    overview: 'Located on prestigious Ballygunge Circular Road, this 6,800 sq.ft duplex had immense volume but suffered from dark internal corridors, awkward builder walls, and heavy street traffic noise. LUXiHOME completely re-engineered the floor plan, brought in natural daylight from floor to ceiling, and handed over a tranquil, turnkey luxury home in 14 months.',
    challenge: 'The homeowner bought two combined floors with high ceilings, but the interior felt cut off. Narrow hallways blocked natural sunlight, heavy support columns broke the room flow, and constant traffic noise from Circular Road entered the living area. The family wanted a spacious, museum-quality home where they could host guests in complete silence and privacy.',
    solution: 'We removed five non-structural partition walls to create an open 24-foot double-height central living salon. We installed Saint-Gobain acoustic double-glazed curtain walls to silence outside road noise by 85%. Book-matched Italian Statuario marble slabs were hand-selected and laid with razor-thin brass joints, paired with warm Burmese teak wall paneling and concealed shadow-gap LED lighting.',
    specs: [
      { tag: 'Area', val: '6,800 Sq.Ft' },
      { tag: 'Typology', val: 'Duplex Penthouse' },
      { tag: 'Location', val: 'Ballygunge Circular Rd' },
      { tag: 'Scope', val: 'Turnkey Design & Build' },
      { tag: 'Materials', val: 'Statuario Marble & Teak' },
      { tag: 'Timeline', val: '14 Months Delivery' }
    ],
    features: [
      { title: 'Double-Height Living Salon', desc: 'A 24-foot soaring ceiling lounge bathed in natural sunlight through soundproof acoustic glass.' },
      { title: 'Precision Italian Marble', desc: 'Continuous vein-matched Statuario marble flooring across all formal entertaining spaces.' },
      { title: 'Private Terrace Sanctuary', desc: 'Waterproof teak decking with custom ambient brass garden lighting and lush greenery.' },
      { title: 'Smart Climate & Sound', desc: 'Concealed Daikin VRV air conditioning with multi-room discrete architectural audio.' }
    ]
  },
  {
    slug: 'new-town',
    name: 'New Town',
    region: 'East Kolkata & IT Corridor',
    title: 'The Skyline Glass Penthouse',
    kicker: 'Action Area II • New Town',
    typology: '5,400 Sq.Ft Contemporary Penthouse',
    coverImage: '/assets/img/projects/newtown/photo_1_2026-09-04_15-49-33.jpg',
    excerpt: 'A minimalist glass penthouse with 360-degree sunset views, custom walnut joinery, and smart home automation overlooking Eco Park.',
    overview: 'Perched on the 26th floor in New Town Action Area II, this panoramic penthouse was handed over as a bare concrete and glass shell. The tech-founder client wanted a clean, uncluttered sanctuary that maximized open sunset views while staying cool and private during Kolkata’s hot summers.',
    challenge: 'The raw flat had harsh afternoon solar glare, echoey acoustics due to large bare glass walls, and an uninspiring standard builder kitchen. The client needed effective thermal insulation, seamless storage that hid all clutter, and an open layout tailored for both quiet remote work and evening entertaining.',
    solution: 'We applied solar-reflective UV films and motorized sheer drop screens that block heat without losing the view. Acoustic plaster on ceilings absorbed reverberations. In the kitchen, we engineered a monolithic Calacatta quartz island with hidden induction cooktops and motorized push-to-open cabinets. Full Lutron lighting allows one-touch scene changes from work mode to evening lounge.',
    specs: [
      { tag: 'Area', val: '5,400 Sq.Ft' },
      { tag: 'Typology', val: 'High-Rise Penthouse' },
      { tag: 'Location', val: 'Action Area II, New Town' },
      { tag: 'Scope', val: 'Turnkey Interior Architecture' },
      { tag: 'Materials', val: 'Smoked Walnut & Quartz' },
      { tag: 'Timeline', val: '11 Months Delivery' }
    ],
    features: [
      { title: 'Sunset Glass Wall', desc: 'UV-filtered panoramic glazing framing unobstructed vistas over New Town and Eco Park.' },
      { title: 'Concealed Chef’s Island', desc: 'Minimalist kitchen island with hidden induction, built-in Miele appliances, and zero visible clutter.' },
      { title: 'Circadian Lighting Scenes', desc: 'Warm automated lighting that transitions naturally from bright morning daylight to cozy 2700K evening warmth.' },
      { title: 'Minimalist Suite & Valet', desc: 'Bronze-tinted walk-in wardrobe with soft-closing fluted glass doors and integrated leather organizers.' }
    ]
  },
  {
    slug: 'alipore',
    name: 'Alipore',
    region: 'South Kolkata',
    title: 'The Alipore Heritage Estate',
    kicker: 'Alipore • Billionaires Row',
    typology: '8,500 Sq.Ft Palatial Private Residence',
    coverImage: '/assets/img/about/architectural-villa-facade.jpg',
    excerpt: 'A palatial private residence combining classic colonial proportions with private courtyard gardens and museum-grade art illumination.',
    overview: 'Located on exclusive Alipore Park Place, this standalone 8,500 sq.ft private estate is home to a multi-generational Kolkata business family. LUXiHOME undertook a complete turnkey transformation—restoring structural strength, integrating an internal green courtyard, and outfitting every room with handcrafted millwork.',
    challenge: 'The home had rich heritage character, but suffered from outdated electrical lines, damp corners, heavy ceiling beams that felt oppressive, and dark rooms with poor ventilation. The family wanted to preserve their legacy while upgrading to international luxury standards with complete climate control, fresh air circulation, and display walls for their art collection.',
    solution: 'We reinforced the foundation and installed modern waterproof insulation barriers throughout. We opened up a central light well to create a lush, indoor landscaped courtyard that brings daylight and fresh air directly into the dining and family rooms. Museum-grade 98+ CRI spotlights were calibrated specifically for their oil paintings, and all flooring was renewed with French white oak and Botticino marble.',
    specs: [
      { tag: 'Area', val: '8,500 Sq.Ft' },
      { tag: 'Typology', val: 'Multi-Level Estate Villa' },
      { tag: 'Location', val: 'Alipore Park Place' },
      { tag: 'Scope', val: 'Complete Rebuild & Turnkey Interiors' },
      { tag: 'Materials', val: 'French Oak & Botticino Marble' },
      { tag: 'Timeline', val: '16 Months Delivery' }
    ],
    features: [
      { title: 'Central Light Court', desc: 'An internal landscaped garden well that channels natural daylight into the dining and living wings.' },
      { title: 'Museum-Grade Art Gallery', desc: 'Specialized high-CRI illumination that highlights art textures without fading delicate pigments.' },
      { title: 'Private Spa Suite', desc: 'Master bathroom with a solid stone soaking tub, steam cabin, and book-matched onyx accent wall.' },
      { title: 'Controlled Tasting Lounge', desc: 'Dual-zone climate room lined with solid European oak for family gatherings.' }
    ]
  },
  {
    slug: 'salt-lake',
    name: 'Salt Lake',
    region: 'Bidhannagar',
    title: 'The Salt Lake Modernist Manor',
    kicker: 'Sector III • Salt Lake',
    typology: '6,100 Sq.Ft Bespoke Bungalow',
    coverImage: '/wp-content/uploads/salt-lake/salt-lake-08-living-room.jpg',
    excerpt: 'A brutalist-inspired modernist bungalow transformation with a cantilevered floating staircase, reflecting pond, and rooftop terrace.',
    overview: 'Sitting on a prime corner plot in Salt Lake Sector III, this 6,100 sq.ft independent bungalow was transformed from an old boxed-in 1980s structure into an airy, architectural masterpiece. LUXiHOME redesigned the exterior façade and created continuous flowing living spaces inside.',
    challenge: 'The original bungalow was divided into tiny, dark rooms with low ceilings, narrow concrete staircases, and no connection between the ground floor and the garden. Moisture from Kolkata monsoons had damaged old walls, and the layout lacked modern entertaining areas or privacy for the owners.',
    solution: 'We cut through the center of the building to introduce a double-height skylit atrium with an architectural floating staircase made of steel and solid walnut. Large sliding glass panels open the living lounge directly to a ground-level reflecting pond. We replaced all exterior plaster with breathable, weatherproof textured concrete and travertine stone.',
    specs: [
      { tag: 'Area', val: '6,100 Sq.Ft' },
      { tag: 'Typology', val: 'Independent Corner Bungalow' },
      { tag: 'Location', val: 'Sector III, Salt Lake' },
      { tag: 'Scope', val: 'Façade Redesign & Turnkey Interiors' },
      { tag: 'Materials', val: 'Textured Concrete, Walnut & Travertine' },
      { tag: 'Timeline', val: '13 Months Delivery' }
    ],
    features: [
      { title: 'Floating Walnut Staircase', desc: 'Cantilevered steps suspended from a structural steel spine with seamless glass balustrades.' },
      { title: 'Ground-Level Water Court', desc: 'A calm reflecting pond that cools the living area naturally and creates serene water reflections indoors.' },
      { title: 'Private Executive Library', desc: 'Soundproof home office lined with custom brass-accented walnut bookshelves.' },
      { title: 'All-Weather Sky Terrace', desc: 'Rooftop entertainment deck with motorized louvers for shade and monsoon rain protection.' }
    ]
  },
  {
    slug: 'topsia',
    name: 'Topsia',
    region: 'EM Bypass Corridor',
    title: 'The Sky Villa at EM Bypass',
    kicker: 'Topsia • Atmosphere Corridor',
    typology: '5,900 Sq.Ft Sky Duplex',
    coverImage: '/wp-content/uploads/about-interiors/curved_sofa_designer_lounge.jpg',
    excerpt: 'A high-floor sky duplex with curved floor-to-ceiling glass, custom curved designer seating, and unobstructed wetland sunsets.',
    overview: 'Perched 30 floors above the EM Bypass in Topsia, this 5,900 sq.ft sky duplex offers breathtaking views across Kolkata and the East Wetlands. LUXiHOME designed every corner to match the building’s curved architecture, delivering a weightless, hotel-style living experience.',
    challenge: 'The apartment’s curved exterior walls made standard rectangular furniture look awkward, creating wasted dead corners. Harsh western sun made the upper floor very hot in the late afternoon, and the raw high-ceiling living room felt hollow and impersonal.',
    solution: 'We custom-designed curved banquettes, curved marble credenzas, and soft bouclé seating that hug the glass perimeter seamlessly. Motorized thermal solar blinds lower automatically during peak sunlight hours. Soft Venetian plaster walls and warm curved cove lighting turned the tall space into an intimate, luxurious retreat.',
    specs: [
      { tag: 'Area', val: '5,900 Sq.Ft' },
      { tag: 'Typology', val: 'High-Rise Sky Duplex' },
      { tag: 'Location', val: 'EM Bypass / Topsia' },
      { tag: 'Scope', val: 'Bespoke Space Transformation' },
      { tag: 'Materials', val: 'Portoro Marble, Bouclé & Venetian Plaster' },
      { tag: 'Timeline', val: '12 Months Delivery' }
    ],
    features: [
      { title: 'Sculpted Curved Lounge', desc: 'Custom furniture built to follow the building’s contours, ensuring zero blocked views.' },
      { title: 'Sunset Dining Room', desc: 'One-piece Italian marble dining table seating 12 beneath a sculptural chandelier.' },
      { title: 'Boutique Dressing Suite', desc: 'Walk-in dressing room with humidity control, backlit glass wardrobes, and velvet accessories drawers.' },
      { title: 'Sky View Plunge Tub', desc: 'Freestanding soaking tub positioned directly against the skyline glass for evening relaxation.' }
    ]
  },
  {
    slug: 'rajarhat',
    name: 'Rajarhat',
    region: 'Vedic Village Enclave',
    title: 'The Vedic Villa Sanctuary',
    kicker: 'Rajarhat • Vedic Enclave',
    typology: '7,400 Sq.Ft Country Villa & Pool Pavilion',
    coverImage: '/assets/img/pentagon/alams-pentagon-sunset-pool.jpg',
    excerpt: 'A serene country retreat featuring an infinity reflection pool, open-air living pavilions, and lush tropical gardens.',
    overview: 'Built on a private multi-acre plot near Vedic Village in Rajarhat, this 7,400 sq.ft sanctuary was designed as a weekend escape from Kolkata’s fast-paced city life. LUXiHOME handled everything from the structural pool pavilion to the open-concept interiors and landscape architecture.',
    challenge: 'The client wanted a resort-like holiday home that felt completely integrated with nature, but demanded materials that could handle heavy monsoon rainfall without constant maintenance. They also wanted open entertainment spaces for large family gatherings that could easily transition between indoor air conditioning and outdoor breezes.',
    solution: 'We designed wide, sheltered verandas with motorized glass walls that slide completely into hidden wall pockets, merging the indoor living room with the poolside deck in seconds. We used reclaimed Burmese teak, non-slip rough-hewn basalt stone around the pool, and installed a smart bioethanol sunken fire lounge for cool winter evenings.',
    specs: [
      { tag: 'Area', val: '7,400 Sq.Ft' },
      { tag: 'Typology', val: 'Sprawling Country Villa' },
      { tag: 'Location', val: 'Rajarhat / Vedic Enclave' },
      { tag: 'Scope', val: 'Architecture, Turnkey Build & Landscape' },
      { tag: 'Materials', val: 'Basalt Stone, Reclaimed Teak & Glass' },
      { tag: 'Timeline', val: '15 Months Delivery' }
    ],
    features: [
      { title: 'Black Basalt Reflection Pool', desc: 'Zero-edge infinity pool reflecting the sunset sky, lined with natural basalt and surrounded by teak.' },
      { title: 'Pocket Sliding Glass Walls', desc: 'Glass walls that disappear entirely into wall cavities to create a seamless open garden pavilion.' },
      { title: 'Sunken Evening Fire Pit', desc: 'Outdoor conversation lounge recessed into the garden lawn with a smokeless bioethanol fireplace.' },
      { title: 'Tropical Master Garden', desc: 'Master bedroom suite with a private outdoor shower and botanical meditation courtyard.' }
    ]
  },
  {
    slug: 'dum-dum',
    name: 'Dum Dum',
    region: 'North Kolkata & Airport',
    title: 'The Jessore Road Private Estate',
    kicker: 'Dum Dum • North Kolkata',
    typology: '4,800 Sq.Ft Independent Family Estate',
    coverImage: '/assets/img/about/grand-duplex-lobby.jpg',
    excerpt: 'A quiet multi-level family compound with acoustic soundproofing, triple-height light atrium, and Italian travertine finishes.',
    overview: 'Located off Jessore Road in Dum Dum, this 4,800 sq.ft residence was commissioned by an international business family who needed quick 10-minute connectivity to the Kolkata airport, but required total peace, quiet, and privacy inside their home.',
    challenge: 'Heavy vehicular noise along Jessore Road and flight-path aircraft overhead disrupted daily calm. In addition, the long rectangular plot meant the center of the house was originally dark and lacked natural cross-ventilation.',
    solution: 'We engineered triple-sealed acoustic laminated glass and sound-dampened exterior walls, dropping ambient indoor noise down to library levels. We carved a triple-story central skylight through the core of the house that pours soft natural light onto a grand travertine-clad lobby, illuminating all three floors naturally.',
    specs: [
      { tag: 'Area', val: '4,800 Sq.Ft' },
      { tag: 'Typology', val: 'Multi-Level Family Residence' },
      { tag: 'Location', val: 'Jessore Road, Dum Dum' },
      { tag: 'Scope', val: 'Turnkey Architectural Overhaul & Interiors' },
      { tag: 'Materials', val: 'Roman Travertine & Smoked Brass' },
      { tag: 'Timeline', val: '10 Months Delivery' }
    ],
    features: [
      { title: 'Complete Acoustic Isolation', desc: 'Specialized triple-glazed acoustic windows and insulated wall cavities that silence airport and highway decibels.' },
      { title: 'Triple-Height Light Shaft', desc: 'Central vertical atrium with motorized skylights providing daylight and natural chimney-effect ventilation.' },
      { title: 'Private Cinema Lounge', desc: 'Acoustically tuned home theater with 4K laser projection and plush velvet sound-dampening wall panels.' },
      { title: 'Enclosed Rooftop Conservatory', desc: 'Glass-covered terrace lounge with a cocktail bar for entertaining guests year-round.' }
    ]
  }
];

// White Shared CSS
function getWhiteSharedCss() {
  return `
    html {
        overflow-x: clip;
        overflow-y: visible !important;
        scroll-behavior: smooth;
    }
    body {
        background-color: #FFFFFF !important;
        color: #13212E !important;
        overflow-x: clip;
        overflow-y: visible !important;
        -webkit-overflow-scrolling: touch;
        touch-action: pan-y pinch-zoom;
        min-height: 100%;
        margin: 0;
        padding: 0;
        font-family: 'aviano-sans', sans-serif;
    }
    @supports not (overflow-x: clip) {
        html { overflow-x: hidden; }
        body { overflow-x: hidden; }
    }

    .luxi-hamburger-bars {
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        width: 18px !important;
        height: 13px !important;
        cursor: pointer !important;
        pointer-events: none !important;
        position: relative !important;
        box-sizing: border-box !important;
    }
    .luxi-hamburger-bars .luxi-bar {
        display: block !important;
        width: 100% !important;
        height: 1.5px !important;
        background-color: #13212E !important;
        border-radius: 2px !important;
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, background-color 0.25s ease !important;
        transform-origin: center !important;
    }
    [data-active="true"] .luxi-hamburger-bars .luxi-bar,
    [data-state="open"] .luxi-hamburger-bars .luxi-bar {
        background-color: #FFFFFF !important;
    }
    [data-active="true"] .luxi-hamburger-bars .bar-1,
    [data-state="open"] .luxi-hamburger-bars .bar-1 {
        transform: translateY(5.75px) rotate(45deg) !important;
    }
    [data-active="true"] .luxi-hamburger-bars .bar-2,
    [data-state="open"] .luxi-hamburger-bars .bar-2 {
        opacity: 0 !important;
        transform: scaleX(0) !important;
    }
    [data-active="true"] .luxi-hamburger-bars .bar-3,
    [data-state="open"] .luxi-hamburger-bars .bar-3 {
        transform: translateY(-5.75px) rotate(-45deg) !important;
    }

    /* Header Menu Pill on Mobile - Fix Squeezed Dimensions */
    @media (max-width: 1023px) {
        [data-nav-fixed] {
            position: fixed !important;
            top: 20px !important;
            right: 15px !important;
            left: auto !important;
            width: 117px !important;
            height: 50px !important;
            max-width: 100% !important;
            z-index: 50 !important;
        }
        [data-target="menu-wrapper"] {
            width: 117px !important;
            height: 50px !important;
            display: flex !important;
            flex-direction: row-reverse !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding: 0 8px 0 10px !important;
            box-sizing: border-box !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        [data-target="menu-wrapper"]:not([data-active="true"]) [data-target="menu-background"] {
            position: absolute !important;
            top: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            width: 117px !important;
            height: 50px !important;
            border-radius: 40px !important;
            background-color: rgba(19, 33, 46, 0.08) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
        }
        [data-target="menu-trigger"] {
            padding: 12px 14px 12px 8px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-shrink: 0 !important;
            z-index: 10 !important;
        }
        [data-target="menu-contact-button"] {
            margin: 0 !important;
            flex-shrink: 0 !important;
            z-index: 10 !important;
        }
    }

    .cs-page-container {
        width: 100%;
        max-width: 1320px;
        margin: 0 auto;
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
    }
    @media (min-width: 640px) {
        .cs-page-container {
            padding-left: 32px;
            padding-right: 32px;
        }
    }
    @media (min-width: 1024px) {
        .cs-page-container {
            padding-left: 48px;
            padding-right: 48px;
        }
    }

    .cs-hero-minimal {
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 140px 20px 60px 20px;
        box-sizing: border-box;
    }
    .cs-minimal-title {
        font-family: 'aviano-sans', sans-serif;
        font-size: clamp(34px, 7.5vw, 84px);
        font-weight: 400;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #13212E;
        margin: 0;
        line-height: 1.05;
    }

    .cs-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 28px;
        margin-bottom: 70px;
    }
    @media (min-width: 720px) {
        .cs-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 32px;
        }
    }
    @media (min-width: 1100px) {
        .cs-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 38px;
        }
    }

    /* Minimalist Case Study Card */
    .cs-card {
        background: #FFFFFF;
        border: 1px solid rgba(19, 33, 46, 0.08);
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
        box-shadow: 0 4px 18px rgba(19, 33, 46, 0.03);
    }
    .cs-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(19, 33, 46, 0.08);
        border-color: rgba(194, 162, 106, 0.45);
    }

    .cs-card-media {
        position: relative;
        display: block;
        width: 100%;
        aspect-ratio: 16 / 10.5;
        overflow: hidden;
        background: #F1F5F9;
    }
    .cs-card-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .cs-card:hover .cs-card-img {
        transform: scale(1.05);
    }

    .cs-card-body {
        padding: 24px 22px 26px 22px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    @media (min-width: 640px) {
        .cs-card-body {
            padding: 26px 24px 28px 24px;
        }
    }

    .cs-card-kicker {
        color: #C2A26A;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        margin-bottom: 8px;
        display: block;
    }

    .cs-card-title {
        font-family: 'aviano-sans', sans-serif;
        font-size: clamp(17px, 3.2vw, 21px);
        line-height: 1.25;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: #13212E;
        margin: 0 0 16px 0;
    }
    .cs-card-title a {
        color: #13212E;
        text-decoration: none;
        transition: color 0.2s ease;
    }
    .cs-card-title a:hover {
        color: #C2A26A;
    }

    .cs-card-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #13212E;
        text-decoration: none;
        transition: gap 0.2s ease, color 0.2s ease;
        margin-top: auto;
    }
    .cs-card-link:hover {
        color: #C2A26A;
        gap: 12px;
    }

    /* Detail Page Specific Styling */
    .cs-detail-hero {
        padding: 120px 0 40px 0;
    }
    @media (min-width: 768px) {
        .cs-detail-hero {
            padding: 145px 0 50px 0;
        }
    }
    .cs-back-link-wrap {
        margin-bottom: 24px;
    }
    .cs-back-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: 'aviano-sans', sans-serif;
        font-size: 11.5px;
        font-weight: 500;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #556677;
        text-decoration: none;
        transition: color 0.2s ease, gap 0.2s ease;
    }
    .cs-back-link:hover {
        color: #C2A26A;
        gap: 12px;
    }
    .cs-back-link svg {
        transition: transform 0.2s ease;
    }
    .cs-back-link:hover svg {
        transform: translateX(-3px);
    }

    .cs-detail-badge {
        display: inline-block;
        background: #F1F5F9;
        color: #8C6D38;
        border: 1px solid rgba(194, 162, 106, 0.35);
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        padding: 6px 14px;
        border-radius: 999px;
        margin-bottom: 14px;
    }
    .cs-detail-title {
        font-family: 'aviano-sans', sans-serif;
        font-size: clamp(26px, 5.5vw, 52px);
        line-height: 1.12;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #13212E;
        margin: 0 0 16px 0;
    }
    .cs-detail-copy {
        font-size: clamp(14px, 2.2vw, 17px);
        line-height: 1.7;
        color: #4A5B6C;
        max-width: 860px;
        margin: 0 0 30px 0;
    }

    .cs-specs-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-top: 24px;
        background: #F8FAFC;
        padding: 18px 20px;
        border-radius: 16px;
        border: 1px solid rgba(19, 33, 46, 0.06);
    }
    @media (min-width: 640px) {
        .cs-specs-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 16px;
            padding: 22px 28px;
        }
    }
    @media (min-width: 1024px) {
        .cs-specs-grid {
            grid-template-columns: repeat(6, minmax(0, 1fr));
            gap: 16px;
        }
    }
    .cs-spec-cell {
        display: flex;
        flex-direction: column;
    }
    .cs-spec-tag {
        display: block;
        color: #8C6D38;
        font-size: 9.5px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        margin-bottom: 2px;
    }
    .cs-spec-val {
        display: block;
        color: #13212E;
        font-size: 13px;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .cs-detail-image-wrap {
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 36px;
        box-shadow: 0 16px 36px rgba(19, 33, 46, 0.08);
    }
    .cs-detail-image-wrap img {
        width: 100%;
        height: auto;
        display: block;
    }

    .cs-features-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 18px;
        margin-bottom: 40px;
    }
    @media (min-width: 640px) {
        .cs-features-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 22px;
        }
    }
    .cs-feature-item {
        background: #FFFFFF;
        border: 1px solid rgba(19, 33, 46, 0.08);
        border-radius: 16px;
        padding: 20px;
    }
    .cs-feature-title {
        font-family: 'aviano-sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #13212E;
        margin: 0 0 6px 0;
    }
    .cs-feature-desc {
        font-size: 13px;
        line-height: 1.6;
        color: #556677;
        margin: 0;
    }

    .cs-cta-box {
        background: #13212E;
        border-radius: 22px;
        padding: 30px 22px;
        color: #FFFFFF;
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 40px;
    }
    @media (min-width: 768px) {
        .cs-cta-box {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 38px 36px;
        }
    }
    .cs-cta-title {
        font-family: 'aviano-sans', sans-serif;
        font-size: clamp(20px, 4vw, 26px);
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #FFFFFF;
        margin: 0 0 8px 0;
    }
    .cs-cta-desc {
        font-size: 13.5px;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
        max-width: 580px;
    }
    .cs-cta-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 14px 28px;
        border-radius: 999px;
        background-color: #C2A26A;
        color: #13212E;
        font-size: 12.5px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        text-decoration: none;
        transition: background-color 0.2s ease, transform 0.2s ease;
        white-space: nowrap;
    }
    .cs-cta-btn:hover {
        background-color: #FFFFFF;
        transform: translateY(-2px);
    }

    .cs-footer {
        background-color: #F8FAFC;
        border-top: 1px solid rgba(19, 33, 46, 0.08);
        padding: 50px 20px 40px 20px;
        margin-top: 60px;
    }
    @media (min-width: 640px) {
        .cs-footer {
            padding: 65px 36px 45px 36px;
            margin-top: 80px;
        }
    }
    .cs-footer-inner {
        max-width: 1240px;
        margin: 0 auto;
    }
    .cs-footer-top {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding-bottom: 30px;
        border-bottom: 1px solid rgba(19, 33, 46, 0.08);
    }
    @media (min-width: 768px) {
        .cs-footer-top {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }
    .cs-footer-brand {
        font-family: 'aviano-sans', sans-serif;
        font-size: 18px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #13212E;
        text-decoration: none;
    }
    .cs-footer-nav {
        display: flex;
        flex-wrap: wrap;
        gap: 18px 24px;
    }
    .cs-footer-link {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: #4A5B6C;
        text-decoration: none;
        transition: color 0.2s ease;
    }
    .cs-footer-link:hover {
        color: #C2A26A;
    }
    .cs-footer-bottom {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-top: 24px;
        font-size: 11px;
        color: #8C9BAE;
    }
    @media (min-width: 640px) {
        .cs-footer-bottom {
            flex-direction: row;
            justify-content: space-between;
        }
    }
    .cs-footer-legal-links {
        display: flex;
        gap: 16px;
    }
    .cs-footer-legal-links a {
        color: #8C9BAE;
        text-decoration: none;
        transition: color 0.2s ease;
    }
    .cs-footer-legal-links a:hover {
        color: #13212E;
    }
  `;
}

// Clean Header with Single Case Studies Link, Flawless SVG Logo, and Top-Right Mobile Menu Trigger
function getWhiteHeaderHtml(currentPath) {
  const isCaseStudies = currentPath.startsWith('/case-studies');

  return `
    <!-- Menu Backdrop Overlay -->
    <div class="fixed inset-0 bg-black/70 backdrop-blur-[5px] z-50 opacity-0 invisible" data-target="menu-backdrop"></div>

    <!-- Top Navigation Header -->
    <nav class="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_auto_1fr] items-center absolute top-0 right-0 left-0 pt-20 lg:pt-40 pl-20 pr-20 sm:px-24 lg:px-40 pointer-events-none z-50" data-target="header-menu">
        
        <!-- Menu & Enquire: Top-Right on Mobile (Fixed), Left on Desktop -->
        <div class="z-50 order-3 lg:order-1 flex justify-end lg:justify-start fixed right-10 lg:right-[unset] lg:left-40 h-50 top-20 lg:bottom-auto lg:top-20 pointer-events-auto" data-nav-fixed>
            <div class="group/wrapper flex flex-row-reverse lg:flex-row items-center relative lg:py-9 lg:pr-9 pointer-events-auto" data-target="menu-wrapper" data-active="false" data-theme="dark">
                <div class="absolute top-0 right-0 bottom-0 left-auto lg:inset-0 w-full max-h-[calc(100vh_-_80px)] bg-black/10 rounded-40 backdrop-blur-20 transition-colors duration-300 xl:group-hover/wrapper:bg-black/15 group-data-[active=true]/wrapper:!bg-white/20" data-target="menu-background"></div>
                <div class="relative lg:h-full py-15 lg:py-10 pr-[20px] lg:pr-20 pl-[20px] lg:pl-24 cursor-pointer z-10 flex items-center justify-center" data-target="menu-trigger" aria-label="Toggle Menu">
                    <div class="w-16 h-auto hidden" data-target="hamburger-lottie"></div>
                    <div class="w-16 h-auto hidden" data-target="hamburger-lottie-dark"></div>
                    <div class="luxi-hamburger-bars" aria-label="Menu Toggle">
                        <span class="luxi-bar bar-1"></span>
                        <span class="luxi-bar bar-2"></span>
                        <span class="luxi-bar bar-3"></span>
                    </div>
                </div>

                <a href="/contact/" class="group/button block relative size-30 md:size-40 lg:size-auto bg-[#13212E] text-12 leading-none tracking-1.2 uppercase text-white lg:py-12 lg:px-20 rounded-40 my-10 ml-10 lg:m-0 z-10 overflow-hidden after:hidden after:lg:block after:absolute after:top-1/2 after:left-1/2 after:size-[1px] after:bg-[#C2A26A] after:rounded-full after:-translate-x-1/2 after:-translate-y-1/2" data-target="menu-contact-button">
                    <span class="hidden lg:block relative text-white z-10 transition-colors duration-200 group-hover/button:text-[#13212E]">Enquire</span>
                    <div class="flex lg:hidden justify-center items-center w-full h-full">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.3533 16.0187C11.6994 15.9578 11.0697 15.7921 10.4554 15.5651C8.84567 14.9704 7.43479 14.0447 6.13375 12.941C4.83356 11.8381 3.7092 10.5764 2.77174 9.15191C2.03692 8.03541 1.44856 6.85033 1.13224 5.54342C1.07221 5.29635 1.03219 5.04417 0.98962 4.79284C0.94875 4.55258 1.00622 4.33363 1.12841 4.12192C1.58778 3.32618 2.15485 2.61181 2.76578 1.93067C3.10679 1.55027 3.46441 1.18605 3.89014 0.89894C4.361 0.581584 4.88635 0.648463 5.22354 1.11065C5.9724 2.13684 6.67443 3.19456 7.19127 4.3626C7.20192 4.38688 7.21213 4.41158 7.22193 4.43629C7.4697 5.06291 7.38711 5.4037 6.87793 5.84799C6.64208 6.05417 6.40792 6.2629 6.1644 6.4597C6.05584 6.54746 6.03668 6.62711 6.08692 6.75832C6.7566 8.50995 7.92524 9.80622 9.60603 10.6386C9.82528 10.7472 10.0522 10.8367 10.2804 10.924C10.3732 10.9598 10.4375 10.9436 10.5022 10.8669C10.718 10.6113 10.9381 10.3591 11.1587 10.1078C11.2144 10.0439 11.2766 9.98555 11.3383 9.92719C11.6295 9.65158 11.9599 9.56383 12.349 9.69589C12.8199 9.8552 13.2563 10.0848 13.6846 10.3302C14.404 10.7425 15.0946 11.2 15.7689 11.6814C15.8907 11.7683 16.0001 11.8675 16.0878 11.9902C16.3505 12.3583 16.3667 12.6748 16.1227 13.0539C15.8358 13.4999 15.4594 13.8684 15.0686 14.2211C14.3849 14.8379 13.6688 15.4117 12.865 15.8675C12.7075 15.957 12.5457 16.04 12.3533 16.0183V16.0187Z" fill="#FFFFFF"/>
                        </svg>
                    </div>
                </a>

                <!-- Slideout Fullscreen Drawer -->
                <div class="absolute top-0 right-0 lg:right-auto lg:left-0 w-[calc(100vw_-_40px)] lg:w-auto h-[calc(100dvh_-_80px)] sm:h-[calc(100vh_-_80px)] pt-100 px-25 lg:pr-65 pb-60 lg:pl-65 opacity-0 invisible pointer-events-none overflow-auto" data-target="menu" data-state="closed" data-animating="false" data-lenis-prevent>
                    <span data-target="menu-title" class="sr-only">Menu</span>
                    <div class="flex flex-col justify-between gap-40 lg:gap-50 h-full text-white">
                        <div>
                            <ul class="group/menu-items flex flex-col gap-20 sm:gap-25 lg:gap-20 whitespace-nowrap" data-target="menu-items">
                                <!-- Projects Section -->
                                <li class="group/li font-sans font-light text-26 sm:text-34 lg:text-36 xl:text-42 leading-[0.85] lg:leading-none tracking-1.14 lg:tracking-1.5 uppercase whitespace-normal lg:whitespace-nowrap">
                                    <a href="/#projects" class="no-barba block transition-opacity duration-200 xl:group-hover/menu-items:opacity-20 hover:!opacity-100">
                                        <span>Projects</span>
                                    </a>
                                    <div class="h-auto opacity-100 visible">
                                        <div class="pt-16 pb-10">
                                            <ul class="luxi-project-list flex flex-col pl-20 border-l border-white/20" style="display: flex !important; flex-direction: column !important; gap: 18px !important; row-gap: 18px !important; padding-left: 20px !important; border-left: 1px solid rgba(255,255,255,0.2) !important; margin-top: 10px !important; margin-bottom: 4px !important;">
                                                <li class="font-normal text-15 leading-none tracking-0.42">
                                                    <a class="relative block py-1 text-white/80 hover:text-white transition-colors" href="/alams-pentagon/">Alam's Pentagon</a>
                                                </li>
                                                <li class="font-normal text-15 leading-none tracking-0.42">
                                                    <a class="relative block py-1 text-white/80 hover:text-white transition-colors" href="/projects/park-street/">Park Street Residence</a>
                                                </li>
                                                <li class="font-normal text-15 leading-none tracking-0.42">
                                                    <a class="relative block py-1 text-white/80 hover:text-white transition-colors" href="/projects/salt-lake/">The Salt Lake Manor</a>
                                                </li>
                                                <li class="font-normal text-15 leading-none tracking-0.42">
                                                    <a class="relative block py-1 text-white/80 hover:text-white transition-colors" href="/projects/newtown/">New Town Estate</a>
                                                </li>
                                                <li class="font-normal text-15 leading-none tracking-0.42">
                                                    <a class="relative block py-1 text-white/80 hover:text-white transition-colors" href="/projects/rajarhat/">Rajarhat Villa</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>

                                <div class="w-full h-1 bg-white/20 my-12" data-target="menu-divider"></div>
                                
                                <li class="font-sans font-light text-24 sm:text-28 leading-none tracking-1 uppercase">
                                    <a class="transition-opacity duration-200 xl:group-hover/menu-items:opacity-20 hover:!opacity-100" href="/" data-barba-prevent="self">Home</a>
                                </li>
                                <li class="font-sans font-light text-24 sm:text-28 leading-none tracking-1 uppercase">
                                    <a class="transition-opacity duration-200 xl:group-hover/menu-items:opacity-20 hover:!opacity-100" data-barba-prevent="self" href="/about/">About Us</a>
                                </li>
                                <li class="font-sans font-light text-24 sm:text-28 leading-none tracking-1 uppercase">
                                    <a class="transition-opacity duration-200 xl:group-hover/menu-items:opacity-20 hover:!opacity-100 ${isCaseStudies ? 'text-[#C2A26A]' : ''}" data-barba-prevent="self" href="/case-studies/">Case Studies</a>
                                </li>
                                <li class="font-sans font-light text-24 sm:text-28 leading-none tracking-1 uppercase">
                                    <a class="transition-opacity duration-200 xl:group-hover/menu-items:opacity-20 hover:!opacity-100" data-barba-prevent="self" href="/journal/">Journal</a>
                                </li>
                                <li class="font-sans font-light text-24 sm:text-28 leading-none tracking-1 uppercase">
                                    <a class="transition-opacity duration-200 xl:group-hover/menu-items:opacity-20 hover:!opacity-100" href="/contact/" data-barba-prevent="self">Contact</a>
                                </li>
                            </ul>
                        </div>

                        <!-- Menu Bottom: Instagram SVG Icon + LUXiHOME Parity with Homepage -->
                        <div data-target="menu-bottom">
                            <a class="flex items-center gap-12 pb-20" href="https://www.instagram.com/luxihome_pvt._ltd" rel="noopener noreferrer" target="_blank">
                                <div class="group/insta w-30 h-auto children:w-full children:h-auto [&_path]:transition-all [&_circle]:transition-all hover:[&_path]:fill-dark-blue hover:[&_circle]:fill-white">
                                    <svg height="40px" version="1.1" viewBox="0 0 40 40" width="40px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <g fill="none" fill-rule="evenodd" id="Symbols" stroke="none" stroke-width="1">
                                            <g id="Social-Media" transform="translate(-307.000000, -513.000000)">
                                                <g id="Instagram_outline-White" transform="translate(307.000000, 513.000000)">
                                                    <circle cx="20" cy="20" id="Stoke" r="19.5" stroke="#FFFFFF"></circle>
                                                    <path d="M16.2826865,11.1104542 C14.8175922,11.1765596 13.5477244,11.5347797 12.5223374,12.5558408 C11.4933684,13.5822618 11.1396323,14.857025 11.0733627,16.3068782 C11.0321681,17.2118081 10.7912694,24.0483617 11.4897862,25.8412486 C11.9608374,27.0507996 12.888611,27.9807424 14.1092245,28.453307 C14.6787844,28.6748496 15.3289424,28.8249268 16.2826865,28.8686993 C24.2574207,29.2295993 27.2135799,29.0330696 28.4601638,25.8412486 C28.6813608,25.2730991 28.8336017,24.6236578 28.8756918,23.6722754 C29.2401743,15.6770898 28.8165865,13.9440552 27.4267171,12.5558408 C26.3243142,11.4561678 25.0275803,10.7075683 16.2826865,11.1104542 M16.3561204,27.260729 C15.4829743,27.2214231 15.0092366,27.0758125 14.6931129,26.953428 C13.8978783,26.6443404 13.3005569,26.0493914 12.9933886,25.258806 C12.4614411,23.8964979 12.6378614,17.4262041 12.6853247,16.3792368 C12.7318925,15.3537091 12.9396565,14.4166198 13.6632483,13.6930331 C14.5587828,12.7997163 15.7158132,12.3619911 23.5938297,12.7175312 C24.6219032,12.7639836 25.5613188,12.9712331 26.2867017,13.6930331 C27.1822362,14.58635 27.6264213,15.7521284 27.2646253,23.5999167 C27.2252218,24.4709006 27.0792497,24.9434652 26.9565615,25.258806 C26.1461028,27.3357676 24.2816001,27.624309 16.3561204,27.260729 M23.6806965,15.2206049 C23.6806965,15.8119806 24.1615985,16.2925851 24.7553379,16.2925851 C25.3490772,16.2925851 25.8308747,15.8119806 25.8308747,15.2206049 C25.8308747,14.6292292 25.3490772,14.1486247 24.7553379,14.1486247 C24.1615985,14.1486247 23.6806965,14.6292292 23.6806965,15.2206049 M15.3764057,19.9891301 C15.3764057,22.5225766 17.4352394,24.576312 19.974975,24.576312 C22.5147107,24.576312 24.5735444,22.5225766 24.5735444,19.9891301 C24.5735444,17.4556836 22.5147107,15.4028415 19.974975,15.4028415 C17.4352394,15.4028415 15.3764057,17.4556836 15.3764057,19.9891301 M16.9901588,19.9891301 C16.9901588,18.3454271 18.3262961,17.0117051 19.974975,17.0117051 C21.6236539,17.0117051 22.9597913,18.3454271 22.9597913,19.9891301 C22.9597913,21.6337264 21.6236539,22.9674484 19.974975,22.9674484 C18.3262961,22.9674484 16.9901588,21.6337264 16.9901588,19.9891301" fill="#FFFFFF" id="instagram"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <span class="font-sans font-normal text-15 leading-none tracking-0.4">LUXiHOME</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Responsive Dark LUXiHOME Logo: Left on Mobile, Center on Desktop -->
        <div class="order-2 luxi-header-logo flex justify-start lg:justify-center items-center absolute left-20 sm:left-24 lg:left-1/2 -translate-x-0 lg:-translate-x-1/2 top-20 lg:top-20 z-40 pointer-events-auto">
            <a href="/" data-target="menu-logo" data-theme="dark" class="group pointer-events-auto block w-fit h-fit" title="LUXiHOME" data-barba-prevent="self">
                <div class="relative w-[150px] sm:w-[210px] lg:w-[260px] h-auto opacity-100 visible" title="LUXiHOME">
                    <img src="/assets/img/logos/luxihome-wordmark-dark.svg" alt="LUXiHOME" class="w-[150px] sm:w-[210px] lg:w-[260px] h-auto block mx-auto" />
                </div>
            </a>
        </div>
    </nav>
  `;
}

// White Theme Footer
function getWhiteFooterHtml() {
  return `
    <footer class="cs-footer">
        <div class="cs-footer-inner">
            <div class="cs-footer-top">
                <div>
                    <a href="/" class="cs-footer-brand">LUXiHOME</a>
                    <p style="font-size: 13px; color: #556677; margin: 8px 0 0 0; max-width: 420px; line-height: 1.6;">
                        Kolkata’s premier bespoke residential architecture, turn-key build, and luxury interior design firm.
                    </p>
                </div>
                <nav class="cs-footer-nav">
                    <a href="/" class="cs-footer-link">Home</a>
                    <a href="/about/" class="cs-footer-link">About Us</a>
                    <a href="/case-studies/" class="cs-footer-link" style="color: #C2A26A;">Case Studies</a>
                    <a href="/journal/" class="cs-footer-link">Journal</a>
                    <a href="/contact/" class="cs-footer-link">Contact</a>
                </nav>
            </div>
            <div class="cs-footer-bottom">
                <div>
                    &copy; ${new Date().getFullYear()} LUXiHOME Pvt. Ltd. All rights reserved. Handcrafted in Kolkata.
                </div>
                <div class="cs-footer-legal-links">
                    <a href="/terms-conditions/">Terms &amp; Conditions</a>
                    <a href="/privacy-policy/">Privacy Policy</a>
                </div>
            </div>
        </div>
    </footer>
  `;
}

// Ultra-Minimalist Hub Page Generator (No badge, no long descriptions, no specs on cards)
function generateCaseStudiesHubHtml() {
  const sharedCss = getWhiteSharedCss();
  const headerHtml = getWhiteHeaderHtml('/case-studies/');
  const footerHtml = getWhiteFooterHtml();

  const cardsHtml = LOCATIONS.map(loc => `
    <article class="cs-card">
        <a href="/case-studies/${loc.slug}/" class="cs-card-media" aria-label="View ${loc.title}">
            <img src="${loc.coverImage}" alt="${loc.title} - ${loc.name}, Kolkata" class="cs-card-img" loading="lazy" />
        </a>
        <div class="cs-card-body">
            <span class="cs-card-kicker">${loc.kicker}</span>
            <h2 class="cs-card-title">
                <a href="/case-studies/${loc.slug}/">${loc.title}</a>
            </h2>
            <div>
                <a href="/case-studies/${loc.slug}/" class="cs-card-link">
                    <span>Read Case Study</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.16669 7H12.8334M12.8334 7L7.00002 1.16666M12.8334 7L7.00002 12.8333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
        </div>
    </article>
  `).join('');

  return `<!DOCTYPE html>
<html class="no-js" lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    
    <title>Case Studies • Kolkata Bespoke Architecture &amp; Interiors | LUXiHOME</title>
    <meta name="description" content="Explore bespoke architectural and luxury interior design case studies across Kolkata by LUXiHOME Pvt. Ltd. Featuring Ballygunge, New Town, Alipore, Salt Lake, Topsia, and Rajarhat.">
    <link rel="canonical" href="https://luxihome.in/case-studies/">
    
    <meta property="og:locale" content="en_GB">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Case Studies • Kolkata Bespoke Architecture &amp; Interiors | LUXiHOME">
    <meta property="og:description" content="Explore bespoke architectural and luxury interior design case studies across Kolkata by LUXiHOME Pvt. Ltd.">
    <meta property="og:url" content="https://luxihome.in/case-studies/">
    <meta property="og:site_name" content="LUXiHOME">
    <meta name="twitter:card" content="summary_large_image">

    <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon/favicon-16x16.png">

    <link rel="stylesheet" id="luxihome-styles-css" href="/assets/css/styles.css" type="text/css" media="all">
    <link rel="stylesheet" id="luxi-custom-fonts-css" href="/assets/css/luxi-fonts.css" type="text/css" media="all">
    <link rel="stylesheet" id="estimate-modal-css" href="/assets/css/estimate-modal.css" type="text/css" media="all">

    <style id="luxi-case-studies-css">
${sharedCss}
    </style>

    <script id="jquery-js" src="/assets/js/jquery.min.js"></script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "LUXiHOME Kolkata Architectural Case Studies",
      "description": "Bespoke architectural and interior design case studies across premier Kolkata enclaves.",
      "publisher": {
        "@type": "HomeAndConstructionBusiness",
        "name": "LUXiHOME Pvt. Ltd.",
        "areaServed": [
          "Ballygunge, Kolkata",
          "New Town, Kolkata",
          "Alipore, Kolkata",
          "Salt Lake, Kolkata",
          "Topsia, Kolkata",
          "Rajarhat, Kolkata",
          "Dum Dum, Kolkata"
        ]
      }
    }
    </script>
</head>

<body class="wp-singular page-template" data-barba="wrapper">

${headerHtml}

<div id="page-wrap" data-barba="container" data-barba-namespace="case-studies">
    <main id="main" class="cs-page-container">
        
        <!-- Minimalist Hero: "CASE STUDIES" Written and Nothing Else -->
        <header class="cs-hero-minimal">
            <h1 class="cs-minimal-title">CASE STUDIES</h1>
        </header>

        <!-- Minimalist Case Study Cards Grid -->
        <section class="cs-grid">
            ${cardsHtml}
        </section>

        <!-- Bottom Consultation Box -->
        <section class="cs-cta-box" style="margin-bottom: 70px;">
            <div>
                <h3 class="cs-cta-title">Consult with LUXiHOME (Free Consultation)</h3>
                <p class="cs-cta-desc">
                    Whether an expansive duplex in Ballygunge or an architectural villa in Alipore, schedule a 100% free consultation with LUXiHOME to discuss your vision and receive turnkey project estimates.
                </p>
            </div>
            <div>
                <a href="/contact/" class="cs-cta-btn">Book Free Consultation</a>
            </div>
        </section>

    </main>
</div>

${footerHtml}

<script id="script-js-js-extra">
var php_vars = {"themeDirUrl":"/assets","homeUrl":"/","ajaxUrl":"/wp-admin/admin-ajax.php"};
</script>
<script id="script-js-js" src="/assets/js/bundle.js?ver=20260912_cs"></script>
<script src="/assets/js/estimate-modal.js" defer></script>

</body>
</html>
`;
}

// Location Detail Page Generator with High-Value Problem/Solution Sections
function generateLocationDetailHtml(loc) {
  const sharedCss = getWhiteSharedCss();
  const headerHtml = getWhiteHeaderHtml(`/case-studies/${loc.slug}/`);
  const footerHtml = getWhiteFooterHtml();

  const specsHtml = loc.specs.map(s => `
    <div class="cs-spec-cell">
        <span class="cs-spec-tag">${s.tag}</span>
        <span class="cs-spec-val">${s.val}</span>
    </div>
  `).join('');

  const featuresHtml = loc.features.map(f => `
    <div class="cs-feature-item">
        <h4 class="cs-feature-title">${f.title}</h4>
        <p class="cs-feature-desc">${f.desc}</p>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html class="no-js" lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    
    <title>${loc.title} • ${loc.name}, Kolkata Case Study | LUXiHOME</title>
    <meta name="description" content="${loc.excerpt} - Bespoke architectural and turnkey interior case study by LUXiHOME Pvt. Ltd. in ${loc.name}, Kolkata.">
    <link rel="canonical" href="https://luxihome.in/case-studies/${loc.slug}/">
    
    <meta property="og:locale" content="en_GB">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${loc.title} • ${loc.name} Case Study | LUXiHOME">
    <meta property="og:description" content="${loc.excerpt}">
    <meta property="og:url" content="https://luxihome.in/case-studies/${loc.slug}/">
    <meta property="og:site_name" content="LUXiHOME">
    <meta property="og:image" content="https://luxihome.in${loc.coverImage}">
    <meta name="twitter:card" content="summary_large_image">

    <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon/favicon-16x16.png">

    <link rel="stylesheet" id="luxihome-styles-css" href="/assets/css/styles.css" type="text/css" media="all">
    <link rel="stylesheet" id="luxi-custom-fonts-css" href="/assets/css/luxi-fonts.css" type="text/css" media="all">
    <link rel="stylesheet" id="estimate-modal-css" href="/assets/css/estimate-modal.css" type="text/css" media="all">

    <style id="luxi-case-studies-detail-css">
${sharedCss}
    </style>

    <script id="jquery-js" src="/assets/js/jquery.min.js"></script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemPage",
      "name": "${loc.title}",
      "description": "${loc.excerpt}",
      "provider": {
        "@type": "HomeAndConstructionBusiness",
        "name": "LUXiHOME Pvt. Ltd.",
        "areaServed": "${loc.name}, Kolkata"
      },
      "spatialCoverage": {
        "@type": "Place",
        "name": "${loc.name}, Kolkata"
      }
    }
    </script>
</head>

<body class="wp-singular page-template" data-barba="wrapper">

${headerHtml}

<div id="page-wrap" data-barba="container" data-barba-namespace="case-study-detail">
    <main id="main" class="cs-page-container">
        
        <!-- Detail Hero Block with Back Link Below Logo -->
        <header class="cs-detail-hero">
            <!-- Breadcrumb / Back to Case Studies (Cleanly Below Fixed Header/Logo) -->
            <div class="cs-back-link-wrap">
                <a href="/case-studies/" class="cs-back-link">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.8333 7H1.16666M1.16666 7L6.99999 1.16666M1.16666 7L6.99999 12.8333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Back to All Case Studies</span>
                </a>
            </div>

            <div class="cs-detail-badge">
                <span>${loc.kicker}</span>
            </div>
            <h1 class="cs-detail-title">${loc.title}</h1>
            <p class="cs-detail-copy">${loc.overview}</p>
            
            <!-- Specifications Grid -->
            <div class="cs-specs-grid">
                ${specsHtml}
            </div>
        </header>

        <!-- Large Architectural Image -->
        <div class="cs-detail-image-wrap">
            <img src="${loc.coverImage}" alt="${loc.title} - Architectural View" />
        </div>

        <!-- Project Story: The Challenge & The Solution (The Whole Juice) -->
        <section style="margin-top: 40px; margin-bottom: 40px;">
            <div style="margin-bottom: 22px;">
                <span class="cs-card-kicker">THE FULL PROJECT BRIEF</span>
                <h3 style="font-family: 'aviano-sans', sans-serif; font-size: 22px; text-transform: uppercase; color: #13212E; margin: 0;">
                    The Challenge &amp; How We Solved It
                </h3>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                <div style="background: #F8FAFC; border: 1px solid rgba(19, 33, 46, 0.08); border-radius: 18px; padding: 26px 24px;">
                    <div style="display: inline-block; background: rgba(194, 162, 106, 0.15); color: #8C6D38; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; margin-bottom: 12px;">
                        THE CLIENT'S PROBLEM
                    </div>
                    <h4 style="font-family: 'aviano-sans', sans-serif; font-size: 16px; text-transform: uppercase; color: #13212E; margin: 0 0 10px 0;">What Needed Fixing</h4>
                    <p style="font-size: 13.5px; line-height: 1.7; color: #475569; margin: 0;">${loc.challenge}</p>
                </div>
                <div style="background: #F8FAFC; border: 1px solid rgba(19, 33, 46, 0.08); border-radius: 18px; padding: 26px 24px;">
                    <div style="display: inline-block; background: rgba(19, 33, 46, 0.08); color: #13212E; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; margin-bottom: 12px;">
                        THE LUXIHOME SOLUTION
                    </div>
                    <h4 style="font-family: 'aviano-sans', sans-serif; font-size: 16px; text-transform: uppercase; color: #13212E; margin: 0 0 10px 0;">How We Delivered</h4>
                    <p style="font-size: 13.5px; line-height: 1.7; color: #475569; margin: 0;">${loc.solution}</p>
                </div>
            </div>
        </section>

        <!-- Architectural Highlights -->
        <section style="margin-top: 40px;">
            <div style="margin-bottom: 20px;">
                <span class="cs-card-kicker">ARCHITECTURAL DISCIPLINE</span>
                <h3 style="font-family: 'aviano-sans', sans-serif; font-size: 22px; text-transform: uppercase; color: #13212E; margin: 0;">
                    Key Project Highlights &amp; Craftsmanship
                </h3>
            </div>
            <div class="cs-features-grid">
                ${featuresHtml}
            </div>
        </section>

        <!-- Free Consultation CTA -->
        <section class="cs-cta-box">
            <div>
                <h3 class="cs-cta-title">Consult with LUXiHOME (Free Consultation)</h3>
                <p class="cs-cta-desc">
                    Planning a bespoke villa or luxury turnkey interior in ${loc.name}? Schedule a 100% free consultation with LUXiHOME to discuss your architectural floor plan, material finishes, and turnkey estimates.
                </p>
            </div>
            <div>
                <a href="/contact/" class="cs-cta-btn">Book Free Consultation</a>
            </div>
        </section>

    </main>
</div>

${footerHtml}

<script id="script-js-js-extra">
var php_vars = {"themeDirUrl":"/assets","homeUrl":"/","ajaxUrl":"/wp-admin/admin-ajax.php"};
</script>
<script id="script-js-js" src="/assets/js/bundle.js?ver=20260912_cs"></script>
<script src="/assets/js/estimate-modal.js" defer></script>

</body>
</html>
`;
}

// Main Runner
function run() {
  console.log('Generating Case Studies section...');

  // 1. Hub page
  const hubDir = path.join(ROOT_DIR, 'case-studies');
  if (!fs.existsSync(hubDir)) fs.mkdirSync(hubDir, { recursive: true });
  fs.writeFileSync(path.join(hubDir, 'index.html'), generateCaseStudiesHubHtml(), 'utf-8');
  console.log('✓ case-studies/index.html generated.');

  // 2. Child pages
  LOCATIONS.forEach(loc => {
    const locDir = path.join(hubDir, loc.slug);
    if (!fs.existsSync(locDir)) fs.mkdirSync(locDir, { recursive: true });
    fs.writeFileSync(path.join(locDir, 'index.html'), generateLocationDetailHtml(loc), 'utf-8');
    console.log(`✓ case-studies/${loc.slug}/index.html generated.`);
  });

  console.log('Done! All case studies pages generated.');
}

run();
