/**
 * home.js – strictly follows master sitemap rules.
 * Count‑up animation + testimonial slider with Ghanaian‑authentic voices.
 * - ruby.jpg & kofi.jpg remain as photo avatars
 * - Other testimonials use alphabet initials with inline styles
 */
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ---------- COUNT-UP STATS (Intersection Observer) ----------
    const statNumbers = document.querySelectorAll('.home-stat-number');
    
    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                let current = 0;
                const increment = target / 60;
                
                const updateNumber = () => {
                    current += increment;
                    if (current < target) {
                        el.innerText = Math.ceil(current);
                        requestAnimationFrame(updateNumber);
                    } else {
                        el.innerText = target + (el.dataset.target === '247' ? '' : '+');
                    }
                };
                updateNumber();
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(el => countUpObserver.observe(el));

    // ---------- TESTIMONIALS – GHANAIAN VOICES, PHOTO + INITIAL AVATARS ----------
    const testimonials = [
        {
            name: "Ama Mensah",
            role: "Parent, Accra",
            text: "As for SamzyDigital, dem good no be small! My daughter’s business booking don triple. Even me I learn small small. God bless dem.",
            avatar: "ruby.jpg",      // photo – stays as image
            rating: 5
        },
        {
            name: "Kofi Asare",
            role: "Business Owner, Tema",
            text: "Ei, these guys understand Ghana market. No white man template, dem build am well well. My sales don up, abeg join dem.",
            avatar: "kofi.jpg",      // photo – stays as image
            rating: 5
        },
        {
            name: "Esi Thompson",
            role: "Community Member",
            text: "The community support sef, e dey burst my brain. I don meet mentors, I don learn coding. Accra needs more of this.",
            avatar: "initials",      // flag – we'll use initials
            initials: "ET",
            rating: 5
        },
        {
            name: "Yaw Osei",
            role: "E‑commerce Client",
            text: "Before, I dey sell small. Now with the online store, I dey sell go Togo and Benin. Samzy na serious helper.",
            avatar: "initials",      // flag – we'll use initials
            initials: "YO",
            rating: 5
        }
    ];

    let currentSlide = 0;
    let slideInterval;
    const sliderContainer = document.getElementById('homeTestimonialSlider');
    const dotsContainer = document.getElementById('homeTestimonialDots');
    const prevBtn = document.getElementById('homePrevTestimonial');
    const nextBtn = document.getElementById('homeNextTestimonial');
    const testimonialSection = document.querySelector('.home-testimonials');

    function renderTestimonials() {
        if (!sliderContainer) return;
        sliderContainer.innerHTML = testimonials.map((t, index) => {
            const stars = Array(t.rating).fill('<i class="fas fa-star"></i>').join('');
            
            // Avatar HTML: photo or initials
            let avatarHtml = '';
            if (t.avatar === 'initials') {
                // Alphabet avatar with inline styles – no CSS changes needed
                avatarHtml = `<div class="home-testimonial-avatar" style="background: #2563eb; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.8rem; text-transform: uppercase; border-radius: 50%; width: 90px; height: 90px; margin: 0 auto 1.2rem; border: 3px solid white; box-shadow: 0 8px 20px rgba(0,0,0,0.08);">${t.initials}</div>`;
            } else {
                // Photo avatar
                avatarHtml = `<div class="home-testimonial-avatar" style="background-image: url('${t.avatar}');"></div>`;
            }

            return `
                <div class="home-testimonial-slide ${index === currentSlide ? 'active' : ''}" data-index="${index}">
                    ${avatarHtml}
                    <div class="home-testimonial-stars">${stars}</div>
                    <div class="home-testimonial-content">
                        <p>“${t.text}”</p>
                    </div>
                    <div class="home-testimonial-author">
                        <div class="author-info">
                            <h4>${t.name}</h4>
                            <p>${t.role}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        if (dotsContainer) {
            dotsContainer.innerHTML = testimonials.map((_, index) => `
                <span class="home-testimonial-dot ${index === currentSlide ? 'active' : ''}" data-index="${index}"></span>
            `).join('');
        }
    }

    function showSlide(index) {
        const slides = document.querySelectorAll('.home-testimonial-slide');
        const dots = document.querySelectorAll('.home-testimonial-dot');
        if (slides.length === 0) return;
        
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    function startAutoRotate() {
        stopAutoRotate();
        slideInterval = setInterval(nextSlide, 6000);
    }
    function stopAutoRotate() { clearInterval(slideInterval); }

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoRotate(); startAutoRotate(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoRotate(); startAutoRotate(); });
    
    if (dotsContainer) {
        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('home-testimonial-dot')) {
                const index = parseInt(e.target.dataset.index, 10);
                showSlide(index);
                stopAutoRotate();
                startAutoRotate();
            }
        });
    }

    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', stopAutoRotate);
        testimonialSection.addEventListener('mouseleave', startAutoRotate);
    }

    renderTestimonials();
    startAutoRotate();
});