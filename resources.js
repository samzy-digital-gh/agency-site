// resources.js – page‑specific interactivity (download tracking, gentle animations)
// NO header/footer/chatbot code

(function() {
    'use strict';
    
    // Track PDF downloads (simple console log – can be extended to analytics)
    const downloadBtn = document.querySelector('.resources-btn-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            console.log('📥 Starter Guide PDF download initiated');
            // Optional: you could fire a custom event or Google Analytics here
        });
    }
    
    // Subtle fade-in animation on scroll for cards (respects reduced motion)
    const animatedElements = document.querySelectorAll(
        '.resources-pdf-card, .resources-path-card, .resources-community-card, .resources-tool-item'
    );
    
    if (animatedElements.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '20px' });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(15px)';
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease, box-shadow 0.2s ease';
            observer.observe(el);
        });
    }
    
})();