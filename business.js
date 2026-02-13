/**
 * business.js – page-specific, no header/footer/chatbot code
 * ROI calculator, accordion, scroll reveal, back to top, smooth anchors
 */
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // ----- 1. ROI CALCULATOR -----
  const salesSlider = document.getElementById('business-sales');
  const customersSlider = document.getElementById('business-customers');
  const salesVal = document.getElementById('business-sales-val');
  const customersVal = document.getElementById('business-customers-val');
  const serviceSelect = document.getElementById('business-service-type');
  const timeframeSelect = document.getElementById('business-timeframe');
  const calcBtn = document.getElementById('business-calc-btn');
  const resSales = document.getElementById('result-sales');
  const resCustomers = document.getElementById('result-customers');
  const resHours = document.getElementById('result-hours');
  const resRoi = document.getElementById('result-roi');
  
  function updateSliderReadout() {
    if (salesVal) salesVal.textContent = Number(salesSlider.value).toLocaleString();
    if (customersVal) customersVal.textContent = customersSlider.value;
  }
  if (salesSlider) salesSlider.addEventListener('input', updateSliderReadout);
  if (customersSlider) customersSlider.addEventListener('input', updateSliderReadout);
  updateSliderReadout();
  
  function calculateROI() {
    const monthlySales = parseFloat(salesSlider?.value) || 0;
    const monthlyCustomers = parseFloat(customersSlider?.value) || 0;
    const service = serviceSelect?.value || 'web';
    const months = parseInt(timeframeSelect?.value, 10) || 12;
    const factor = { web: 1.0, ecom: 1.4, auto: 1.6, brand: 1.2 } [service] || 1.0;
    const timeFactor = months / 6;
    return {
      salesIncrease: Math.round(monthlySales * 0.18 * factor * timeFactor),
      newCustomers: Math.round(monthlyCustomers * 0.12 * factor * timeFactor),
      timeSaved: Math.round(15 + factor * 10 + months * 2),
      roiPercent: Math.round((monthlySales * 0.18 * factor * timeFactor) / (monthlySales || 1) * 100 * 1.2)
    };
  }
  
  function animateNumber(element, target, suffix = '', isCurrency = false) {
    if (!element) return;
    let current = 0;
    const increment = target / 50;
    let timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      let formatted = isCurrency ? 'GHS ' + Math.round(current).toLocaleString() : Math.round(current).toLocaleString();
      if (suffix) formatted += suffix;
      element.textContent = formatted;
    }, 16);
  }
  
  if (calcBtn) {
    calcBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const roi = calculateROI();
      animateNumber(resSales, roi.salesIncrease, '', true);
      animateNumber(resCustomers, roi.newCustomers, '');
      animateNumber(resHours, roi.timeSaved, ' hrs');
      animateNumber(resRoi, roi.roiPercent, '%');
    });
  }
  
  setTimeout(() => {
    const roi = calculateROI();
    if (resSales) resSales.textContent = 'GHS ' + roi.salesIncrease.toLocaleString();
    if (resCustomers) resCustomers.textContent = roi.newCustomers.toLocaleString();
    if (resHours) resHours.textContent = roi.timeSaved + ' hrs';
    if (resRoi) resRoi.textContent = roi.roiPercent + '%';
  }, 100);
  
  // ----- 2. FAQ ACCORDION -----
  const accordionItems = document.querySelectorAll('.business-accordion-item');
  accordionItems.forEach(item => {
    const btn = item.querySelector('.business-accordion-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        accordionItems.forEach(i => {
          if (i !== item && i.classList.contains('active')) i.classList.remove('active');
        });
        item.classList.toggle('active');
      });
    }
  });
  
  // ----- 3. SCROLL REVEAL -----
  const revealElements = document.querySelectorAll('.business-timeline-step, .business-pricing-card, .business-deepdive-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => observer.observe(el));
  
  // ----- 4. BACK TO TOP -----
  const backToTop = document.getElementById('business-back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.pageYOffset > 500);
    });
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // ----- 5. SMOOTH SCROLL FOR ANCHORS -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href === '#' || !href) return;
    const target = document.querySelector(href);
    if (target) {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });
});