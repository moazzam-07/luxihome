/**
 * LUXiHOME — Bespoke Project Estimate Lead Capture Engine
 * Features:
 * - 10-second post-load auto-trigger
 * - Fail-safe Web3Forms email backup (4f33d6a5-0aaa-4f2d-80dd-bf9661d85f29)
 * - Instant WhatsApp redirection (+91 70635 71108) with pre-filled lead data
 * - Persistent luxury floating trigger pill
 * - Mobile-first bottom-sheet ergonomics
 */

(function () {
    'use strict';

    var CONFIG = {
        web3FormsKey: '4f33d6a5-0aaa-4f2d-80dd-bf9661d85f29',
        whatsAppNumber: '917063571108',
        autoTriggerDelayMs: 10000, // Exactly 10 seconds
        sessionKey: 'luxi_estimate_modal_seen'
    };

    var state = {
        selectedType: '3 BHK Flat',
        isSubmitting: false
    };

    function init() {
        injectDOM();
        bindEvents();
        setupAutoTrigger();
    }

    function injectDOM() {
        if (document.getElementById('luxi-estimate-overlay')) return;

        // 1. Floating Trigger Pill
        var triggerHTML = 
            '<div id="luxi-estimate-trigger" role="button" aria-label="Get Free Estimate on WhatsApp">' +
                '<div class="luxi-trigger-icon">' +
                    '<svg viewBox="0 0 24 24">' +
                        '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>' +
                    '</svg>' +
                '</div>' +
                '<div class="luxi-trigger-text">' +
                    '<span class="luxi-trigger-kicker">Instant Quote</span>' +
                    '<span class="luxi-trigger-title">Free Estimate</span>' +
                '</div>' +
                '<span class="luxi-online-dot" title="Architects Online"></span>' +
            '</div>';

        // 2. Modal Markup
        var modalHTML = 
            '<div id="luxi-estimate-overlay" aria-hidden="true">' +
                '<div id="luxi-estimate-card" role="dialog" aria-modal="true" aria-labelledby="luxi-modal-title">' +
                    '<span class="luxi-modal-drag-handle sm:hidden"></span>' +
                    '<button type="button" class="luxi-modal-close" id="luxi-close-btn" aria-label="Close modal">&times;</button>' +
                    
                    '<div class="luxi-modal-header">' +
                        '<span class="luxi-modal-badge">Bespoke Residential Costing</span>' +
                        '<h3 class="luxi-modal-title" id="luxi-modal-title">Get Your Free Project Estimate</h3>' +
                        '<p class="luxi-modal-subtitle">Receive an architectural budget breakdown & schedule a private studio walkthrough.</p>' +
                    '</div>' +

                    '<form id="luxi-estimate-form" novalidate>' +
                        // Property Type Pills
                        '<div class="luxi-form-group">' +
                            '<label class="luxi-form-label">Select Property Type</label>' +
                            '<div class="luxi-pill-group">' +
                                '<div class="luxi-type-pill is-selected" data-value="3 BHK Flat">3 BHK</div>' +
                                '<div class="luxi-type-pill" data-value="4 BHK / Duplex">4 BHK+</div>' +
                                '<div class="luxi-type-pill" data-value="Penthouse">Penthouse</div>' +
                                '<div class="luxi-type-pill" data-value="Bespoke Villa">Villa</div>' +
                            '</div>' +
                        '</div>' +

                        // Name
                        '<div class="luxi-form-group">' +
                            '<label class="luxi-form-label" for="luxi-input-name">Your Full Name *</label>' +
                            '<div class="luxi-input-wrapper">' +
                                '<input type="text" id="luxi-input-name" class="luxi-input" placeholder="e.g. Sanjeev Goenka" required autocomplete="name">' +
                            '</div>' +
                        '</div>' +

                        // WhatsApp Number
                        '<div class="luxi-form-group">' +
                            '<label class="luxi-form-label" for="luxi-input-phone">WhatsApp Number *</label>' +
                            '<div class="luxi-input-wrapper">' +
                                '<span class="luxi-phone-prefix">🇮🇳 +91</span>' +
                                '<input type="tel" id="luxi-input-phone" class="luxi-input" placeholder="98765 43210" required maxlength="12" autocomplete="tel">' +
                            '</div>' +
                        '</div>' +

                        // Location
                        '<div class="luxi-form-group">' +
                            '<label class="luxi-form-label" for="luxi-select-location">Project Location</label>' +
                            '<select id="luxi-select-location" class="luxi-select">' +
                                '<option value="New Town / Rajarhat">New Town / Rajarhat, Kolkata</option>' +
                                '<option value="Alipore / Ballygunge">Alipore / Ballygunge, Kolkata</option>' +
                                '<option value="Salt Lake / EM Bypass">Salt Lake / EM Bypass, Kolkata</option>' +
                                '<option value="South Kolkata">South Kolkata (Jodhpur Park / Tollygunge)</option>' +
                                '<option value="Central / North Kolkata">Park Street / Central Kolkata</option>' +
                                '<option value="Dubai / UAE">Dubai / UAE Luxury Residences</option>' +
                                '<option value="Other Location">Other Premium Location</option>' +
                            '</select>' +
                        '</div>' +

                        // Submit Button
                        '<button type="submit" class="luxi-submit-btn" id="luxi-submit-btn">' +
                            '<span>Unlock Estimate on WhatsApp</span>' +
                            '<svg viewBox="0 0 16 16">' +
                                '<path d="M8.7 1.7L14.7 7.7C15.1 8.1 15.1 8.7 14.7 9.1L8.7 15.1C8.3 15.5 7.7 15.5 7.3 15.1C6.9 14.7 6.9 14.1 7.3 13.7L11.6 9.4H1C0.4 9.4 0 9 0 8.4C0 7.8 0.4 7.4 1 7.4H11.6L7.3 3.1C6.9 2.7 6.9 2.1 7.3 1.7C7.7 1.3 8.3 1.3 8.7 1.7Z"/>' +
                            '</svg>' +
                        '</button>' +

                        // Trust Strip
                        '<div class="luxi-trust-strip">' +
                            '<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>' +
                            '<span>100% Confidential • Direct contact with Senior Architect</span>' +
                        '</div>' +
                    '</form>' +
                '</div>' +
            '</div>';

        document.body.insertAdjacentHTML('beforeend', triggerHTML + modalHTML);
    }

    function openModal() {
        var overlay = document.getElementById('luxi-estimate-overlay');
        if (overlay) {
            overlay.classList.add('is-active');
            overlay.setAttribute('aria-hidden', 'false');
            var nameInput = document.getElementById('luxi-input-name');
            if (nameInput && window.innerWidth > 640) {
                setTimeout(function() { nameInput.focus(); }, 300);
            }
        }
    }

    function closeModal() {
        var overlay = document.getElementById('luxi-estimate-overlay');
        if (overlay) {
            overlay.classList.remove('is-active');
            overlay.setAttribute('aria-hidden', 'true');
        }
    }

    function setupAutoTrigger() {
        // Only auto-trigger if not seen yet in this session
        try {
            if (sessionStorage.getItem(CONFIG.sessionKey)) {
                return;
            }
        } catch (e) {}

        var triggered = false;
        function triggerAfterDelay() {
            if (triggered) return;
            triggered = true;
            setTimeout(function () {
                try {
                    sessionStorage.setItem(CONFIG.sessionKey, 'true');
                } catch (e) {}
                openModal();
            }, CONFIG.autoTriggerDelayMs);
        }

        if (document.readyState === 'complete') {
            triggerAfterDelay();
        } else {
            window.addEventListener('load', triggerAfterDelay);
        }
    }

    function bindEvents() {
        // 1. Open via floating pill
        var trigger = document.getElementById('luxi-estimate-trigger');
        if (trigger) {
            trigger.addEventListener('click', openModal);
        }

        // 2. Close button
        var closeBtn = document.getElementById('luxi-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // 3. Overlay backdrop click
        var overlay = document.getElementById('luxi-estimate-overlay');
        if (overlay) {
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) {
                    closeModal();
                }
            });
        }

        // 4. Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // 5. Property Type pills
        var pills = document.querySelectorAll('.luxi-type-pill');
        pills.forEach(function (pill) {
            pill.addEventListener('click', function () {
                pills.forEach(function (p) { p.classList.remove('is-selected'); });
                pill.classList.add('is-selected');
                state.selectedType = pill.getAttribute('data-value') || '3 BHK Flat';
            });
        });

        // 6. Form Submission with Web3Forms Dispatch + WhatsApp Redirect
        var form = document.getElementById('luxi-estimate-form');
        if (form) {
            form.addEventListener('submit', handleSubmit);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (state.isSubmitting) return;

        var nameEl = document.getElementById('luxi-input-name');
        var phoneEl = document.getElementById('luxi-input-phone');
        var locationEl = document.getElementById('luxi-select-location');
        var submitBtn = document.getElementById('luxi-submit-btn');

        var name = nameEl ? nameEl.value.trim() : '';
        var rawPhone = phoneEl ? phoneEl.value.trim() : '';
        var location = locationEl ? locationEl.value : 'Kolkata';

        // Validation
        if (!name || name.length < 2) {
            alert('Please enter your full name.');
            if (nameEl) nameEl.focus();
            return;
        }

        var cleanPhone = rawPhone.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
            alert('Please enter a valid 10-digit WhatsApp number.');
            if (phoneEl) phoneEl.focus();
            return;
        }
        // If user typed 12 digits starting with 91, strip country code
        if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
            cleanPhone = cleanPhone.slice(2);
        }

        state.isSubmitting = true;
        if (submitBtn) {
            submitBtn.classList.add('is-loading');
            submitBtn.innerHTML = '<span>Connecting to WhatsApp...</span>';
        }

        // Web3Forms payload for fail-safe email capture
        var payload = {
            access_key: CONFIG.web3FormsKey,
            subject: '⚡ LUXiHOME Lead: ' + name + ' — ' + state.selectedType + ' (' + location + ')',
            from_name: 'LUXiHOME Lead Engine',
            name: name,
            phone: '+91 ' + cleanPhone,
            property_type: state.selectedType,
            location: location,
            page_url: window.location.href,
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

        // Construct pre-filled WhatsApp message
        var waMessage = 
            "*New Project Estimate Request — LUXiHOME*\n\n" +
            "• *Client Name:* " + name + "\n" +
            "• *WhatsApp:* +91 " + cleanPhone + "\n" +
            "• *Property Type:* " + state.selectedType + "\n" +
            "• *Location / Area:* " + location + "\n\n" +
            "Hello LUXiHOME team, I would like to receive a preliminary turnkey interior cost estimate & schedule a private architectural consultation.";

        var waUrl = 'https://wa.me/' + CONFIG.whatsAppNumber + '?text=' + encodeURIComponent(waMessage);

        // Fail-safe parallel dispatch: Fire Web3Forms, wait max 800ms, then launch WhatsApp
        var fetchFinished = false;
        var dispatchPromise = fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .catch(function (err) {
            console.warn('Web3Forms background dispatch notice:', err);
        })
        .finally(function () {
            fetchFinished = true;
        });

        // 800ms safety timeout guarantee
        setTimeout(function () {
            closeModal();
            window.location.href = waUrl;
        }, 800);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
