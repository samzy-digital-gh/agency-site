// about.js – PAGE‑SPECIFIC INTERACTIONS ONLY
// Smooth scroll for "Our Story" button (hero → timeline)
// Subtle fade‑in on scroll for timeline and value cards (optional)

(function() {
    'use strict';
    
    // 1️⃣ SMOOTH SCROLL TO TIMELINE
    const ourStoryBtn = document.querySelector('.about-hero .about-btn-blue');
    if (ourStoryBtn) {
        ourStoryBtn.addEventListener('click', function(e) {
            const timeline = document.getElementById('about-timeline');
            if (timeline) {
                e.preventDefault();
                timeline.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // 2️⃣ SUBTLE FADE‑IN ON SCROLL (optional, enhances UX)
    const fadeElements = document.querySelectorAll(
        '.about-timeline-item, .about-value-card, .about-tech-item, .about-philosophy-item'
    );
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });
        
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
})();