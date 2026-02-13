/**
 * COMMUNITY PAGE – INTERACTIVITY
 * Carousel, accordion, progress bars, form validation (allows Formspree submit)
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ---------- MENTOR CAROUSEL ----------
    const mentors = [
        { name: 'Samuel Ahiaba', title: 'Full‑Stack Engineer', bio: '5+ years, passionate about teaching React & Node.' },
        { name: 'Ama Boateng', title: 'UI/UX Lead', bio: 'Design mentor, helped 20+ juniors land first roles.' },
        { name: 'Kwame Osei', title: 'Mobile Dev', bio: 'Flutter & Kotlin expert, Google Certified.' },
        { name: 'Esi Thompson', title: 'Data Scientist', bio: 'Python, SQL, Power BI – builds real‑world models.' }
    ];

    const carouselDiv = document.getElementById('mentorCarousel');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    let currentIndex = 0;
    let interval;

    function renderMentor(index) {
        const m = mentors[index];
        const html = `
            <div class="community-mentor-card">
                <div class="community-avatar"><i class="fas fa-user-circle"></i></div>
                <h3 style="font-size:1.4rem; margin-bottom:0.3rem;">${m.name}</h3>
                <p style="color: var(--community-orange); font-weight: 600;">${m.title}</p>
                <p style="margin-top: 1rem; color: var(--community-text-soft);">${m.bio}</p>
            </div>
        `;
        carouselDiv.innerHTML = html;
        const dots = document.querySelectorAll('.community-dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        mentors.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('community-dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                renderMentor(currentIndex);
                resetAutoRotate();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % mentors.length;
        renderMentor(currentIndex);
    }
    function prevSlide() {
        currentIndex = (currentIndex - 1 + mentors.length) % mentors.length;
        renderMentor(currentIndex);
    }
    function startAutoRotate() { interval = setInterval(nextSlide, 6000); }
    function stopAutoRotate() { clearInterval(interval); }
    function resetAutoRotate() { stopAutoRotate(); startAutoRotate(); }

    if (carouselDiv && dotsContainer) {
        createDots();
        renderMentor(0);
        startAutoRotate();
        const carouselContainer = document.querySelector('.community-carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoRotate);
            carouselContainer.addEventListener('mouseleave', startAutoRotate);
        }
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoRotate(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoRotate(); });
    }

    // ---------- ACCORDION ----------
    const accordionItems = document.querySelectorAll('.community-accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.community-accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                accordionItems.forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        }
    });

    // ---------- PROGRESS BARS ----------
    const progressFills = document.querySelectorAll('.community-progress-fill');
    progressFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        if (width) setTimeout(() => { fill.style.width = width + '%'; }, 200);
    });

    // ---------- FORM VALIDATION + FORMSPREE SUBMIT ----------
    const form = document.getElementById('communityForm');
    if (form) {
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const experience = document.getElementById('experience');
        const successDiv = document.getElementById('formSuccess');

        // Helper to show/hide error messages
        function showError(fieldId, msg) {
            const err = document.getElementById(`error${fieldId}`);
            if (err) err.textContent = msg || '';
        }

        // Individual field validators
        function validateFullName() {
            const val = fullName.value.trim();
            showError('FullName', val === '' ? 'Full name is required' : '');
            return val !== '';
        }
        function validateEmail() {
            const val = email.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (val === '') {
                showError('Email', 'Email is required');
                return false;
            } else if (!emailRegex.test(val)) {
                showError('Email', 'Enter a valid email');
                return false;
            } else {
                showError('Email', '');
                return true;
            }
        }
        function validatePhone() {
            const val = phone.value.trim();
            showError('Phone', val === '' ? 'Phone number is required' : '');
            return val !== '';
        }
        function validateExperience() {
            const val = experience.value;
            showError('Experience', val === '' ? 'Select your experience level' : '');
            return val !== '';
        }

        // Attach live validation on blur
        fullName.addEventListener('blur', validateFullName);
        email.addEventListener('blur', validateEmail);
        phone.addEventListener('blur', validatePhone);
        experience.addEventListener('blur', validateExperience);

        // Intercept submit – run validation, then either block or allow Formspree
        form.addEventListener('submit', function(e) {
            const isValidName = validateFullName();
            const isValidEmail = validateEmail();
            const isValidPhone = validatePhone();
            const isValidExp = validateExperience();

            if (!isValidName || !isValidEmail || !isValidPhone || !isValidExp) {
                e.preventDefault(); // Stop Formspree submission
                successDiv.style.display = 'none';
            } else {
                // Optional: show a sending message while Formspree processes
                successDiv.style.display = 'block';
                successDiv.innerHTML = '✅ Sending your information...';
                // Form will submit normally to Formspree
            }
        });

        // Optional: if you want to show a custom success message after Formspree redirect,
        // you can add a redirect parameter in the form action URL.
        // For now, Formspree will show its own thank-you page.
    }

    // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
    const anchorLinks = document.querySelectorAll('a[href="#events"], a[href="#registration"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});