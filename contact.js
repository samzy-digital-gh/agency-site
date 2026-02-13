// ===== CONTACT.JS – PAGE‑SPECIFIC INTERACTIVITY =====
// No global header/footer/chatbot code – only Contact page behaviour

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ---------- 1. FORM VALIDATION & AJAX SUBMISSION (Formspree) ----------
    const contactForm = document.getElementById('contactForm');
    const successDiv = document.getElementById('formSuccessMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // we handle via fetch

            // Clear previous errors
            clearFormErrors();
            successDiv.style.display = 'none';

            // Validate fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            if (!name.value.trim()) {
                showError('name', 'Name is required.');
                isValid = false;
            }
            if (!email.value.trim()) {
                showError('email', 'Email address is required.');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError('email', 'Please enter a valid email address.');
                isValid = false;
            }
            if (!message.value.trim()) {
                showError('message', 'Message cannot be blank.');
                isValid = false;
            }

            if (!isValid) return;

            // Prepare FormData
            const formData = new FormData(contactForm);

            // Submit to Formspree
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Success – show message, reset form
                    successDiv.textContent = '✅ Thank you! Your message has been sent. We’ll reply within 24 hours.';
                    successDiv.style.display = 'block';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        data.errors.forEach(err => {
                            if (err.field) showError(err.field, err.message);
                        });
                    } else {
                        alert('Form submission failed. Please try again later.');
                    }
                }
            } catch (error) {
                alert('Network error. Please check your connection and try again.');
            }
        });
    }

    // Helper: validate email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Helper: show inline error
    function showError(fieldId, msg) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.add('error');
            const errorDiv = document.getElementById(`error-${fieldId}`);
            if (errorDiv) errorDiv.textContent = msg;
        }
    }

    // Helper: clear all errors
    function clearFormErrors() {
        const errorFields = ['name', 'email', 'message'];
        errorFields.forEach(id => {
            const field = document.getElementById(id);
            if (field) field.classList.remove('error');
            const errDiv = document.getElementById(`error-${id}`);
            if (errDiv) errDiv.textContent = '';
        });
    }

    // ---------- 2. CALLBACK DRAWER TOGGLE ----------
    const callbackToggle = document.getElementById('callbackToggleBtn');
    const callbackDrawer = document.getElementById('callbackDrawer');
    const callbackClose = document.getElementById('callbackCloseBtn');
    const callbackForm = document.getElementById('callbackForm');

    if (callbackToggle && callbackDrawer) {
        function openDrawer() {
            callbackDrawer.classList.add('open');
        }
        function closeDrawer() {
            callbackDrawer.classList.remove('open');
        }

        callbackToggle.addEventListener('click', openDrawer);
        if (callbackClose) callbackClose.addEventListener('click', closeDrawer);

        // Close drawer when clicking outside the drawer content (optional)
        callbackDrawer.addEventListener('click', function(e) {
            if (e.target === callbackDrawer) closeDrawer();
        });

        // Callback form submission (mockup – no backend)
        if (callbackForm) {
            callbackForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('✅ Callback request received! We will call you soon.');
                callbackForm.reset();
                closeDrawer();
            });
        }
    }

    // ---------- 3. LIVE CHAT MOCKUP TOGGLE ----------
    const chatMockupBtn = document.getElementById('chatMockupBtn');
    const chatWidget = document.getElementById('chatMockupWidget');
    const chatClose = document.getElementById('chatMockupClose');

    if (chatMockupBtn && chatWidget) {
        function openChat() {
            chatWidget.classList.add('open');
        }
        function closeChat() {
            chatWidget.classList.remove('open');
        }

        chatMockupBtn.addEventListener('click', openChat);
        if (chatClose) chatClose.addEventListener('click', closeChat);

        // Close widget if user clicks outside? (optional, but keep simple)
        // Avoid interfering with real chatbot
        document.addEventListener('click', function(e) {
            if (chatWidget.classList.contains('open') &&
                !chatWidget.contains(e.target) &&
                !chatMockupBtn.contains(e.target)) {
                closeChat();
            }
        });
    }

    // ---------- 4. ACTIVE CLASS ON HEADER IS ALREADY SET IN HTML ----------
    // (no need to modify anything – already 'active' on contact.html)
});