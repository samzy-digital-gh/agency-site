// ============================================
// SAMZY-DIGITAL GLOBAL HEADER & FOOTER INTERACTIONS
// Version 5.0 – iOS 26 Glass, compact mobile menu
// ============================================

(function() {
    'use strict';
    
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    
    ready(function() {
        // ---------- MOBILE NAVIGATION ----------
        const mobileToggle = document.getElementById('mobileToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileClose = document.getElementById('mobileClose');
        const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
        
        if (mobileToggle && mobileMenu) {
            function closeMobileMenu() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                if (mobileToggle) mobileToggle.style.transform = '';
                const overlay = document.getElementById('mobileOverlay');
                if (overlay) overlay.remove();
            }
            
            mobileToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                this.style.transform = 'rotate(90deg)';
                
                let overlay = document.getElementById('mobileOverlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.id = 'mobileOverlay';
                    overlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        backdrop-filter: blur(5px);
                        z-index: 9997;
                    `;
                    document.body.appendChild(overlay);
                    overlay.addEventListener('click', closeMobileMenu);
                }
            });
            
            if (mobileClose) {
                mobileClose.addEventListener('click', closeMobileMenu);
            }
            
            mobileLinks.forEach(link => {
                link.addEventListener('click', closeMobileMenu);
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
        }
        
        // ---------- FLOATING NAVIGATION SCROLL EFFECT (NO HIDE) ----------
        const navbar = document.querySelector('.navbar');
        const navContainer = document.querySelector('.nav-container');
        
        if (navbar) {
            window.addEventListener('scroll', function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                if (navContainer) {
                    navContainer.style.boxShadow = scrollTop > 50 ?
                        '0 8px 32px rgba(0, 0, 0, 0.15)' :
                        '0 8px 32px rgba(0, 0, 0, 0.08)';
                }
            });
        }
        
        // ---------- BACK TO TOP BUTTON ----------
        let backToTop = document.querySelector('.back-to-top');
        if (!backToTop) {
            backToTop = document.createElement('button');
            backToTop.className = 'back-to-top';
            backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
            backToTop.setAttribute('aria-label', 'Back to top');
            document.body.appendChild(backToTop);
        }
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.style.display = 'flex';
                setTimeout(() => {
                    backToTop.style.opacity = '1';
                    backToTop.style.transform = 'translateY(0)';
                }, 10);
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (window.scrollY <= 300) {
                        backToTop.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // ---------- UPDATE COPYRIGHT YEAR ----------
        const yearElements = document.querySelectorAll('.footer-legal p');
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            el.innerHTML = el.innerHTML.replace(/\d{4}/, currentYear);
        });
        
        // ---------- SMOOTH SCROLL FOR ANCHOR LINKS ----------
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                        const overlay = document.getElementById('mobileOverlay');
                        if (overlay) overlay.remove();
                    }
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // ---------- ACTIVE LINK BASED ON CURRENT PAGE ----------
        function setActiveLink() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
        setActiveLink();
    });
})();