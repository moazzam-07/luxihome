/**
 * LUXiHOME — Bespoke Free Estimate Lead Engine & Floating Action Dock
 * Theme: Signature Contact Page (Cream #F8F7F4, Dark Navy #1A2026, Sand #DAD0C1)
 * Features:
 * - Option A Floating Dock: Exact Header Phone Handset (tel:) + FREE ESTIMATE pill
 * - 10-second post-load auto-trigger
 * - Multi-section interactive qualification (Scope, Property Type, Move-in, Details)
 * - User-typed Property Location
 * - Background Web3Forms email dispatch (4f33d6a5-0aaa-4f2d-80dd-bf9661d85f29)
 * - Instant WhatsApp redirection (+91 70635 71108) with pre-filled message
 */

(function () {
    'use strict';

    var CONFIG = {
        web3FormsKey: '4f33d6a5-0aaa-4f2d-80dd-bf9661d85f29',
        whatsAppNumber: '917063571108',
        autoTriggerDelayMs: 10000, // 10 seconds
        sessionKey: 'luxi_estimate_dock_seen'
    };

    var state = {
        scope: 'Full Turnkey Interiors',
        propertyType: '3 BHK',
        timeline: '1 – 3 Months',
        isSubmitting: false
    };

    function init() {
        injectDOM();
        bindEvents();
        setupAutoTrigger();
    }

    function injectDOM() {
        if (document.getElementById('luxi-floating-dock')) return;

        // 1. Option A: Floating Action Dock (Call + Free Estimate)
        var dockHTML = 
            '<div id="luxi-floating-dock">' +
                '<!-- Exact Header Phone Handset Icon (Sand Pill) -->' +
                '<a href="tel:+917063571108" class="luxi-dock-call-btn" title="Call LUXiHOME Studio" aria-label="Call LUXiHOME Studio">' +
                    '<svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M12.3533 16.0187C11.6994 15.9578 11.0697 15.7921 10.4554 15.5651C8.84567 14.9704 7.43479 14.0447 6.13375 12.941C4.83356 11.8381 3.7092 10.5764 2.77174 9.15191C2.03692 8.03541 1.44856 6.85033 1.13224 5.54342C1.07221 5.29635 1.03219 5.04417 0.98962 4.79284C0.94875 4.55258 1.00622 4.33363 1.12841 4.12192C1.58778 3.32618 2.15485 2.61181 2.76578 1.93067C3.10679 1.55027 3.46441 1.18605 3.89014 0.89894C4.361 0.581584 4.88635 0.648463 5.22354 1.11065C5.9724 2.13684 6.67443 3.19456 7.19127 4.3626C7.20192 4.38688 7.21213 4.41158 7.22193 4.43629C7.4697 5.06291 7.38711 5.4037 6.87793 5.84799C6.64208 6.05417 6.40792 6.2629 6.1644 6.4597C6.05584 6.54746 6.03668 6.62711 6.08692 6.75832C6.7566 8.50995 7.92524 9.80622 9.60603 10.6386C9.82528 10.7472 10.0522 10.8367 10.2804 10.924C10.3732 10.9598 10.4375 10.9436 10.5022 10.8669C10.718 10.6113 10.9381 10.3591 11.1587 10.1078C11.2144 10.0439 11.2766 9.98555 11.3383 9.92719C11.6295 9.65158 11.9599 9.56383 12.349 9.69589C12.8199 9.8552 13.2563 10.0848 13.6846 10.3302C14.404 10.7425 15.0946 11.2 15.7689 11.6814C15.8907 11.7683 16.0001 11.8675 16.0878 11.9902C16.3505 12.3583 16.3667 12.6748 16.1227 13.0539C15.8358 13.4999 15.4594 13.8684 15.0686 14.2211C14.3849 14.8379 13.6688 15.4117 12.865 15.8675C12.7075 15.957 12.5457 16.04 12.3533 16.0183V16.0187Z" fill="#1A2026"/>' +
                    '</svg>' +
                '</a>' +
                '<!-- Exact Contact Theme Free Estimate Pill -->' +
                '<button type="button" id="luxi-dock-estimate-btn" class="luxi-dock-estimate-btn" aria-label="Open Free Estimate Form">' +
                    '<span>Free Estimate</span>' +
                    '<div class="luxi-arrow-circle">' +
                        '<svg viewBox="0 0 6 10" fill="none">' +
                            '<path d="M1 1L4.9264 4.9264" stroke="white" stroke-width="1.2" stroke-linecap="round"/>' +
                            '<path d="M1 8.71094L4.9264 4.78453" stroke="white" stroke-width="1.2" stroke-linecap="round"/>' +
                        '</svg>' +
                    '</div>' +
                '</button>' +
            '</div>';

        // 2. Exact Contact Page Theme Modal Markup
        var modalHTML = 
            '<div id="luxi-estimate-overlay" aria-hidden="true">' +
                '<div id="luxi-estimate-card" role="dialog" aria-modal="true" aria-labelledby="luxi-modal-heading">' +
                    '<span class="luxi-modal-drag-bar sm:hidden"></span>' +
                    '<button type="button" class="luxi-modal-close" id="luxi-modal-close-btn" aria-label="Close modal">&times;</button>' +
                    
                    '<div class="luxi-modal-header">' +
                        '<h2 class="luxi-modal-title" id="luxi-modal-heading">Free Estimate</h2>' +
                    '</div>' +

                    '<form id="luxi-estimate-form" novalidate>' +
                        // SECTION 1: REQUIREMENT / SCOPE
                        '<div class="luxi-form-section">' +
                            '<label class="luxi-section-label">Requirement</label>' +
                            '<div class="luxi-pill-grid" data-group="scope">' +
                                '<div class="luxi-pill-item is-selected" data-val="Full Turnkey Interiors">Full Turnkey Interiors</div>' +
                                '<div class="luxi-pill-item" data-val="Modular Kitchen & Wardrobe">Modular Kitchen & Wardrobe</div>' +
                                '<div class="luxi-pill-item" data-val="Renovation / Makeover">Renovation / Makeover</div>' +
                                '<div class="luxi-pill-item" data-val="Architectural & Civil">Architectural & Civil</div>' +
                            '</div>' +
                        '</div>' +

                        // SECTION 2: PROPERTY TYPE
                        '<div class="luxi-form-section">' +
                            '<label class="luxi-section-label">Property Type</label>' +
                            '<div class="luxi-pill-grid" data-group="propertyType">' +
                                '<div class="luxi-pill-item" data-val="1 BHK">1 BHK</div>' +
                                '<div class="luxi-pill-item" data-val="2 BHK">2 BHK</div>' +
                                '<div class="luxi-pill-item is-selected" data-val="3 BHK">3 BHK</div>' +
                                '<div class="luxi-pill-item" data-val="4 BHK / Duplex">4 BHK / Duplex</div>' +
                                '<div class="luxi-pill-item" data-val="Penthouse">Penthouse</div>' +
                                '<div class="luxi-pill-item" data-val="Villa">Villa</div>' +
                                '<div class="luxi-pill-item" data-val="Commercial / Office">Commercial / Office</div>' +
                            '</div>' +
                        '</div>' +

                        // SECTION 3: MOVE-IN TIMELINE
                        '<div class="luxi-form-section">' +
                            '<label class="luxi-section-label">Move-in / Possession Timeline</label>' +
                            '<div class="luxi-pill-grid" data-group="timeline">' +
                                '<div class="luxi-pill-item" data-val="Immediate">Immediate</div>' +
                                '<div class="luxi-pill-item is-selected" data-val="1 – 3 Months">1 – 3 Months</div>' +
                                '<div class="luxi-pill-item" data-val="3 – 6 Months">3 – 6 Months</div>' +
                                '<div class="luxi-pill-item" data-val="Future Project (6+ Months)">Future Project</div>' +
                            '</div>' +
                        '</div>' +

                        // SECTION 4: CLIENT DETAILS (Exact Contact Page Inputs)
                        '<div class="luxi-form-section">' +
                            '<label class="luxi-section-label" for="luxi-name-field">Name <span class="luxi-required-star">*</span></label>' +
                            '<input type="text" id="luxi-name-field" class="luxi-input-field" placeholder="ENTER HERE" required autocomplete="name">' +
                        '</div>' +

                        '<div class="luxi-form-section">' +
                            '<label class="luxi-section-label" for="luxi-phone-field">Mobile Number (India) <span class="luxi-required-star">*</span></label>' +
                            '<div class="luxi-phone-box">' +
                                '<span class="luxi-phone-prefix-tag">+91 <span class="luxi-prefix-divider"></span></span>' +
                                '<input type="tel" id="luxi-phone-field" class="luxi-input-field luxi-phone-input" placeholder="98765 43210" required maxlength="12" autocomplete="tel">' +
                            '</div>' +
                        '</div>' +

                        '<div class="luxi-form-section">' +
                            '<label class="luxi-section-label" for="luxi-location-field">Property Location <span class="luxi-required-star">*</span></label>' +
                            '<input type="text" id="luxi-location-field" class="luxi-input-field" placeholder="ENTER HERE" required autocomplete="address-level2">' +
                        '</div>' +

                        // SUBMIT BUTTON: Exact Contact Page Pill Button
                        '<div class="luxi-submit-row">' +
                            '<button type="submit" class="luxi-submit-btn" id="luxi-form-submit-btn">' +
                                '<span>Submit</span>' +
                                '<div class="luxi-btn-arrow">' +
                                    '<svg viewBox="0 0 6 10" fill="none">' +
                                        '<path d="M1 1L4.9264 4.9264" stroke="white" stroke-width="1.2" stroke-linecap="round"/>' +
                                        '<path d="M1 8.71094L4.9264 4.78453" stroke="white" stroke-width="1.2" stroke-linecap="round"/>' +
                                    '</svg>' +
                                '</div>' +
                            '</button>' +
                        '</div>' +
                    '</form>' +
                '</div>' +
            '</div>';

        document.body.insertAdjacentHTML('beforeend', dockHTML + modalHTML);
    }

    function openModal() {
        var overlay = document.getElementById('luxi-estimate-overlay');
        if (overlay) {
            overlay.classList.add('is-active');
            overlay.setAttribute('aria-hidden', 'false');
            var nameField = document.getElementById('luxi-name-field');
            if (nameField && window.innerWidth > 640) {
                setTimeout(function() { nameField.focus(); }, 250);
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
        // Open via Free Estimate dock pill
        var estimateBtn = document.getElementById('luxi-dock-estimate-btn');
        if (estimateBtn) {
            estimateBtn.addEventListener('click', openModal);
        }

        // Close via close button
        var closeBtn = document.getElementById('luxi-modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Close on background overlay click
        var overlay = document.getElementById('luxi-estimate-overlay');
        if (overlay) {
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) {
                    closeModal();
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Pill Groups selection handler
        document.querySelectorAll('.luxi-pill-grid').forEach(function (grid) {
            var groupName = grid.getAttribute('data-group');
            grid.querySelectorAll('.luxi-pill-item').forEach(function (pill) {
                pill.addEventListener('click', function () {
                    grid.querySelectorAll('.luxi-pill-item').forEach(function (p) {
                        p.classList.remove('is-selected');
                    });
                    pill.classList.add('is-selected');
                    var val = pill.getAttribute('data-val');
                    if (groupName === 'scope') state.scope = val;
                    if (groupName === 'propertyType') state.propertyType = val;
                    if (groupName === 'timeline') state.timeline = val;
                });
            });
        });

        // Form Submit
        var form = document.getElementById('luxi-estimate-form');
        if (form) {
            form.addEventListener('submit', handleSubmit);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (state.isSubmitting) return;

        var nameInput = document.getElementById('luxi-name-field');
        var phoneInput = document.getElementById('luxi-phone-field');
        var locationInput = document.getElementById('luxi-location-field');
        var submitBtn = document.getElementById('luxi-form-submit-btn');

        var name = nameInput ? nameInput.value.trim() : '';
        var rawPhone = phoneInput ? phoneInput.value.trim() : '';
        var location = locationInput ? locationInput.value.trim() : '';

        // Validation
        if (!name) {
            alert('Please enter your Name.');
            if (nameInput) nameInput.focus();
            return;
        }

        var cleanPhone = rawPhone.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
            alert('Please enter a valid 10-digit Mobile Number.');
            if (phoneInput) phoneInput.focus();
            return;
        }
        if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
            cleanPhone = cleanPhone.slice(2);
        }

        if (!location) {
            alert('Please enter your Property Location.');
            if (locationInput) locationInput.focus();
            return;
        }

        state.isSubmitting = true;
        if (submitBtn) {
            submitBtn.classList.add('is-loading');
            var btnText = submitBtn.querySelector('span');
            if (btnText) btnText.textContent = 'CONNECTING...';
        }

        // Web3Forms payload for fail-safe background backup
        var payload = {
            access_key: CONFIG.web3FormsKey,
            subject: '⚡ LUXiHOME Free Estimate: ' + name + ' — ' + state.propertyType + ' (' + location + ')',
            from_name: 'LUXiHOME Estimate Engine',
            name: name,
            phone: '+91 ' + cleanPhone,
            requirement: state.scope,
            property_type: state.propertyType,
            move_in_timeline: state.timeline,
            location: location,
            page_url: window.location.href,
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

        // Format pre-filled WhatsApp message
        var waMessage = 
            "*New Free Estimate Request — LUXiHOME*\n\n" +
            "• *Client Name:* " + name + "\n" +
            "• *Mobile:* +91 " + cleanPhone + "\n" +
            "• *Property Location:* " + location + "\n" +
            "• *Requirement:* " + state.scope + "\n" +
            "• *Property Type:* " + state.propertyType + "\n" +
            "• *Move-in Timeline:* " + state.timeline + "\n\n" +
            "Hello LUXiHOME team, please share a preliminary turnkey project cost estimate.";

        var waUrl = 'https://wa.me/' + CONFIG.whatsAppNumber + '?text=' + encodeURIComponent(waMessage);

        // Async Web3Forms dispatch
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        }).catch(function (err) {
            console.warn('Web3Forms backup warning:', err);
        });

        // 600ms safety timeout then redirect
        setTimeout(function () {
            closeModal();
            window.location.href = waUrl;
        }, 600);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
