/**
 * LUXiHOME — Bespoke 5-Step Free Estimate Wizard & Split Floating Dock
 * Theme: Signature Contact Page (Cream #F8F7F4, Dark Navy #1A2026)
 * Features:
 * - Full Left Call Button: Dark Navy circle with Pure White phone icon
 * - Full Right Free Estimate Button: Dark Navy pill
 * - 5-Step Interactive Wizard (Scope -> Property Type -> Budget Set A -> Timeline -> Details)
 * - 10-second post-load auto-trigger (suppressed on /contact/)
 * - Fail-safe Web3Forms email backup (4f33d6a5-0aaa-4f2d-80dd-bf9661d85f29)
 * - Instant WhatsApp redirection (+91 70635 71108) with pre-filled message
 */

(function () {
    'use strict';

    var CONFIG = {
        web3FormsKey: '4f33d6a5-0aaa-4f2d-80dd-bf9661d85f29',
        whatsAppNumber: '917063571108',
        autoTriggerDelayMs: 10000,
        sessionKey: 'luxi_wizard_estimate_seen'
    };

    var state = {
        currentStep: 1,
        totalSteps: 5,
        scope: 'Full Turnkey Interiors',
        propertyType: '3 BHK',
        budget: '₹25L – ₹50L',
        timeline: '1 – 3 Months',
        isSubmitting: false
    };

    function init() {
        injectDOM();
        bindEvents();
        setupAutoTrigger();
    }

    function injectDOM() {
        if (document.getElementById('luxi-dock-call-btn')) return;

        // 1. Full Left Call Button (Dark Navy Circle with Pure White Handset Icon)
        var callBtnHTML = 
            '<a href="tel:+917063571108" id="luxi-dock-call-btn" title="Call LUXiHOME Studio" aria-label="Call LUXiHOME Studio">' +
                '<svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                    '<path d="M12.3533 16.0187C11.6994 15.9578 11.0697 15.7921 10.4554 15.5651C8.84567 14.9704 7.43479 14.0447 6.13375 12.941C4.83356 11.8381 3.7092 10.5764 2.77174 9.15191C2.03692 8.03541 1.44856 6.85033 1.13224 5.54342C1.07221 5.29635 1.03219 5.04417 0.98962 4.79284C0.94875 4.55258 1.00622 4.33363 1.12841 4.12192C1.58778 3.32618 2.15485 2.61181 2.76578 1.93067C3.10679 1.55027 3.46441 1.18605 3.89014 0.89894C4.361 0.581584 4.88635 0.648463 5.22354 1.11065C5.9724 2.13684 6.67443 3.19456 7.19127 4.3626C7.20192 4.38688 7.21213 4.41158 7.22193 4.43629C7.4697 5.06291 7.38711 5.4037 6.87793 5.84799C6.64208 6.05417 6.40792 6.2629 6.1644 6.4597C6.05584 6.54746 6.03668 6.62711 6.08692 6.75832C6.7566 8.50995 7.92524 9.80622 9.60603 10.6386C9.82528 10.7472 10.0522 10.8367 10.2804 10.924C10.3732 10.9598 10.4375 10.9436 10.5022 10.8669C10.718 10.6113 10.9381 10.3591 11.1587 10.1078C11.2144 10.0439 11.2766 9.98555 11.3383 9.92719C11.6295 9.65158 11.9599 9.56383 12.349 9.69589C12.8199 9.8552 13.2563 10.0848 13.6846 10.3302C14.404 10.7425 15.0946 11.2 15.7689 11.6814C15.8907 11.7683 16.0001 11.8675 16.0878 11.9902C16.3505 12.3583 16.3667 12.6748 16.1227 13.0539C15.8358 13.4999 15.4594 13.8684 15.0686 14.2211C14.3849 14.8379 13.6688 15.4117 12.865 15.8675C12.7075 15.957 12.5457 16.04 12.3533 16.0183V16.0187Z" fill="#FFFFFF"/>' +
                '</svg>' +
            '</a>';

        // 2. Full Right Free Estimate Button (Dark Navy Pill)
        var estimateBtnHTML = 
            '<button type="button" id="luxi-dock-estimate-btn" aria-label="Open Free Estimate Form">' +
                '<span>Free Estimate</span>' +
                '<div class="luxi-arrow-circle">' +
                    '<svg viewBox="0 0 6 10" fill="none">' +
                        '<path d="M1 1L4.9264 4.9264" stroke="white" stroke-width="1.2" stroke-linecap="round"/>' +
                        '<path d="M1 8.71094L4.9264 4.78453" stroke="white" stroke-width="1.2" stroke-linecap="round"/>' +
                    '</svg>' +
                '</div>' +
            '</button>';

        // 3. Multi-Step Wizard Modal Markup (Signature Contact Page Theme)
        var modalHTML = 
            '<div id="luxi-estimate-overlay" aria-hidden="true">' +
                '<div id="luxi-estimate-card" role="dialog" aria-modal="true" aria-labelledby="luxi-modal-heading">' +
                    '<span class="luxi-modal-drag-bar sm:hidden"></span>' +
                    '<button type="button" class="luxi-modal-close" id="luxi-modal-close-btn" aria-label="Close modal">&times;</button>' +
                    
                    '<div class="luxi-modal-header">' +
                        '<div class="luxi-modal-title-row">' +
                            '<h2 class="luxi-modal-title" id="luxi-modal-heading">Free Estimate</h2>' +
                            '<span class="luxi-step-indicator" id="luxi-step-counter">01 / 05</span>' +
                        '</div>' +
                        '<div class="luxi-progress-track">' +
                            '<div class="luxi-progress-bar" id="luxi-progress-fill" style="width: 20%;"></div>' +
                        '</div>' +
                    '</div>' +

                    '<form id="luxi-wizard-form" novalidate>' +
                        // --- STEP 1: REQUIREMENT ---
                        '<div class="luxi-wizard-step is-active" data-step="1">' +
                            '<label class="luxi-step-question">What are you looking to build?</label>' +
                            '<div class="luxi-pill-grid" data-group="scope">' +
                                '<div class="luxi-pill-item is-selected" data-val="Full Turnkey Interiors">Full Turnkey Interiors</div>' +
                                '<div class="luxi-pill-item" data-val="Modular Kitchen & Wardrobe">Modular Kitchen & Wardrobe</div>' +
                                '<div class="luxi-pill-item" data-val="Renovation / Makeover">Renovation / Makeover</div>' +
                                '<div class="luxi-pill-item" data-val="Architectural & Civil">Architectural & Civil</div>' +
                            '</div>' +
                            '<div class="luxi-wizard-actions">' +
                                '<button type="button" class="luxi-next-btn" data-next="2">' +
                                    '<span>Next</span>' +
                                    '<div class="luxi-next-arrow">' +
                                        '<svg viewBox="0 0 6 10" fill="none"><path d="M1 1L4.9264 4.9264" stroke="white" stroke-width="1.2" stroke-linecap="round"/><path d="M1 8.71094L4.9264 4.78453" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg>' +
                                    '</div>' +
                                '</button>' +
                            '</div>' +
                        '</div>' +

                        // --- STEP 2: PROPERTY TYPE ---
                        '<div class="luxi-wizard-step" data-step="2">' +
                            '<label class="luxi-step-question">Select Property Type</label>' +
                            '<div class="luxi-pill-grid" data-group="propertyType">' +
                                '<div class="luxi-pill-item" data-val="1 BHK">1 BHK</div>' +
                                '<div class="luxi-pill-item" data-val="2 BHK">2 BHK</div>' +
                                '<div class="luxi-pill-item is-selected" data-val="3 BHK">3 BHK</div>' +
                                '<div class="luxi-pill-item" data-val="4 BHK / Duplex">4 BHK / Duplex</div>' +
                                '<div class="luxi-pill-item" data-val="Penthouse">Penthouse</div>' +
                                '<div class="luxi-pill-item" data-val="Villa">Villa</div>' +
                                '<div class="luxi-pill-item" data-val="Commercial / Office">Commercial / Office</div>' +
                            '</div>' +
                            '<div class="luxi-wizard-actions">' +
                                '<button type="button" class="luxi-back-btn" data-back="1">&larr; Back</button>' +
                                '<button type="button" class="luxi-next-btn" data-next="3">' +
                                    '<span>Next</span>' +
                                    '<div class="luxi-next-arrow">' +
                                        '<svg viewBox="0 0 6 10" fill="none"><path d="M1 1L4.9264 4.9264" stroke="white" stroke-width="1.2" stroke-linecap="round"/><path d="M1 8.71094L4.9264 4.78453" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg>' +
                                    '</div>' +
                                '</button>' +
                            '</div>' +
                        '</div>' +

                        // --- STEP 3: ESTIMATED BUDGET (Set A Starting at 10L) ---
                        '<div class="luxi-wizard-step" data-step="3">' +
                            '<label class="luxi-step-question">Estimated Project Budget</label>' +
                            '<div class="luxi-pill-grid" data-group="budget">' +
                                '<div class="luxi-pill-item" data-val="₹10L – ₹25L">₹10L – ₹25L</div>' +
                                '<div class="luxi-pill-item is-selected" data-val="₹25L – ₹50L">₹25L – ₹50L</div>' +
                                '<div class="luxi-pill-item" data-val="₹50L – ₹1 Crore">₹50L – ₹1 Crore</div>' +
                                '<div class="luxi-pill-item" data-val="₹1 Crore+">₹1 Crore+</div>' +
                                '<div class="luxi-pill-item" data-val="Flexible / Need Guidance">Flexible / Need Guidance</div>' +
                            '</div>' +
                            '<div class="luxi-wizard-actions">' +
                                '<button type="button" class="luxi-back-btn" data-back="2">&larr; Back</button>' +
                                '<button type="button" class="luxi-next-btn" data-next="4">' +
                                    '<span>Next</span>' +
                                    '<div class="luxi-next-arrow">' +
                                        '<svg viewBox="0 0 6 10" fill="none"><path d="M1 1L4.9264 4.9264" stroke="white" stroke-width="1.2" stroke-linecap="round"/><path d="M1 8.71094L4.9264 4.78453" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg>' +
                                    '</div>' +
                                '</button>' +
                            '</div>' +
                        '</div>' +

                        // --- STEP 4: MOVE-IN TIMELINE ---
                        '<div class="luxi-wizard-step" data-step="4">' +
                            '<label class="luxi-step-question">Estimated Move-in / Possession</label>' +
                            '<div class="luxi-pill-grid" data-group="timeline">' +
                                '<div class="luxi-pill-item" data-val="Immediate">Immediate</div>' +
                                '<div class="luxi-pill-item is-selected" data-val="1 – 3 Months">1 – 3 Months</div>' +
                                '<div class="luxi-pill-item" data-val="3 – 6 Months">3 – 6 Months</div>' +
                                '<div class="luxi-pill-item" data-val="Future Project (6+ Months)">Future Project</div>' +
                            '</div>' +
                            '<div class="luxi-wizard-actions">' +
                                '<button type="button" class="luxi-back-btn" data-back="3">&larr; Back</button>' +
                                '<button type="button" class="luxi-next-btn" data-next="5">' +
                                    '<span>Next</span>' +
                                    '<div class="luxi-next-arrow">' +
                                        '<svg viewBox="0 0 6 10" fill="none"><path d="M1 1L4.9264 4.9264" stroke="white" stroke-width="1.2" stroke-linecap="round"/><path d="M1 8.71094L4.9264 4.78453" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg>' +
                                    '</div>' +
                                '</button>' +
                            '</div>' +
                        '</div>' +

                        // --- STEP 5: DETAILS & SUBMIT ---
                        '<div class="luxi-wizard-step" data-step="5">' +
                            '<label class="luxi-step-question">Where should we send your estimate?</label>' +
                            
                            '<div class="luxi-field-group">' +
                                '<label class="luxi-field-label" for="luxi-input-name">Name *</label>' +
                                '<input type="text" id="luxi-input-name" class="luxi-input-field" placeholder="ENTER HERE" required autocomplete="name">' +
                            '</div>' +

                            '<div class="luxi-field-group">' +
                                '<label class="luxi-field-label" for="luxi-input-phone">Mobile Number (India) *</label>' +
                                '<div class="luxi-phone-box">' +
                                    '<span class="luxi-phone-prefix-tag">+91 <span class="luxi-prefix-divider"></span></span>' +
                                    '<input type="tel" id="luxi-input-phone" class="luxi-input-field luxi-phone-input" placeholder="98765 43210" required maxlength="12" autocomplete="tel">' +
                                '</div>' +
                            '</div>' +

                            '<div class="luxi-field-group">' +
                                '<label class="luxi-field-label" for="luxi-input-loc">Property Location *</label>' +
                                '<input type="text" id="luxi-input-loc" class="luxi-input-field" placeholder="ENTER HERE" required autocomplete="address-level2">' +
                            '</div>' +

                            '<div class="luxi-wizard-actions">' +
                                '<button type="button" class="luxi-back-btn" data-back="4">&larr; Back</button>' +
                                '<button type="submit" class="luxi-submit-pill" id="luxi-wizard-submit">' +
                                    '<span>Submit</span>' +
                                    '<div class="luxi-submit-arrow">' +
                                        '<svg viewBox="0 0 6 10" fill="none"><path d="M1 1L4.9264 4.9264" stroke="white" stroke-width="1.2" stroke-linecap="round"/><path d="M1 8.71094L4.9264 4.78453" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg>' +
                                    '</div>' +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                    '</form>' +
                '</div>' +
            '</div>';

        document.body.insertAdjacentHTML('beforeend', callBtnHTML + estimateBtnHTML + modalHTML);
    }

    function setStep(stepNum) {
        state.currentStep = stepNum;

        // Update step views
        document.querySelectorAll('.luxi-wizard-step').forEach(function (stepEl) {
            var s = parseInt(stepEl.getAttribute('data-step'), 10);
            if (s === stepNum) {
                stepEl.classList.add('is-active');
            } else {
                stepEl.classList.remove('is-active');
            }
        });

        // Update indicator & progress
        var counter = document.getElementById('luxi-step-counter');
        var fill = document.getElementById('luxi-progress-fill');
        if (counter) {
            counter.textContent = '0' + stepNum + ' / 05';
        }
        if (fill) {
            fill.style.width = (stepNum * 20) + '%';
        }

        // Focus first field on Step 5
        if (stepNum === 5) {
            var nameInput = document.getElementById('luxi-input-name');
            if (nameInput && window.innerWidth > 640) {
                setTimeout(function() { nameInput.focus(); }, 150);
            }
        }
    }

    function openModal() {
        var overlay = document.getElementById('luxi-estimate-overlay');
        if (overlay) {
            overlay.classList.add('is-active');
            overlay.setAttribute('aria-hidden', 'false');
            setStep(1);
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
        // Do not auto-pop on contact page
        var path = window.location.pathname.toLowerCase();
        if (path.includes('contact')) {
            return;
        }

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
        // Open via floating Free Estimate pill
        var estimateBtn = document.getElementById('luxi-dock-estimate-btn');
        if (estimateBtn) {
            estimateBtn.addEventListener('click', openModal);
        }

        // Close button
        var closeBtn = document.getElementById('luxi-modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Backdrop click
        var overlay = document.getElementById('luxi-estimate-overlay');
        if (overlay) {
            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) {
                    closeModal();
                }
            });
        }

        // Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });

        // Next buttons
        document.querySelectorAll('.luxi-next-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var next = parseInt(btn.getAttribute('data-next'), 10);
                setStep(next);
            });
        });

        // Back buttons
        document.querySelectorAll('.luxi-back-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var back = parseInt(btn.getAttribute('data-back'), 10);
                setStep(back);
            });
        });

        // Interactive Pills (select + smooth auto-advance)
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
                    if (groupName === 'budget') state.budget = val;
                    if (groupName === 'timeline') state.timeline = val;

                    // Smooth auto-advance to next step
                    if (state.currentStep < 5) {
                        setTimeout(function () {
                            setStep(state.currentStep + 1);
                        }, 220);
                    }
                });
            });
        });

        // Form Submit on Step 5
        var form = document.getElementById('luxi-wizard-form');
        if (form) {
            form.addEventListener('submit', handleSubmit);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (state.isSubmitting) return;

        var nameInput = document.getElementById('luxi-input-name');
        var phoneInput = document.getElementById('luxi-input-phone');
        var locationInput = document.getElementById('luxi-input-loc');
        var submitBtn = document.getElementById('luxi-wizard-submit');

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
            var btnSpan = submitBtn.querySelector('span');
            if (btnSpan) btnSpan.textContent = 'CONNECTING...';
        }

        // 1. Web3Forms background dispatch for fail-safe email capture
        var payload = {
            access_key: CONFIG.web3FormsKey,
            subject: '⚡ LUXiHOME Lead: ' + name + ' — ' + state.propertyType + ' | ' + state.budget + ' (' + location + ')',
            from_name: 'LUXiHOME Estimate Engine',
            name: name,
            phone: '+91 ' + cleanPhone,
            requirement: state.scope,
            property_type: state.propertyType,
            budget: state.budget,
            move_in_timeline: state.timeline,
            location: location,
            page_url: window.location.href,
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

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

        // 2. Pre-fill structured WhatsApp message
        var waMessage = 
            "*New Free Estimate Request — LUXiHOME*\n\n" +
            "• *Client Name:* " + name + "\n" +
            "• *Mobile:* +91 " + cleanPhone + "\n" +
            "• *Property Location:* " + location + "\n" +
            "• *Requirement:* " + state.scope + "\n" +
            "• *Property Type:* " + state.propertyType + "\n" +
            "• *Budget Bracket:* " + state.budget + "\n" +
            "• *Move-in Timeline:* " + state.timeline + "\n\n" +
            "Hello LUXiHOME team, please share a preliminary turnkey project cost estimate.";

        var waUrl = 'https://wa.me/' + CONFIG.whatsAppNumber + '?text=' + encodeURIComponent(waMessage);

        // 3. Smooth redirect after 600ms
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
