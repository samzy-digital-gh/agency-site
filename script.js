const hero = document.getElementById('hero-slider');
const imgs = ['image-1.jpg', 'image-2.jpg', 'image-3.jpg'];
let i = 0;

function slide() {
    // We update the background image while the CSS handles the gold overlay
    hero.style.backgroundImage = `url(${imgs[i]})`;
    i = (i + 1) % imgs.length;
}

// Change image every 5 seconds
setInterval(slide, 5000);

// Run immediately on load
slide();
function reveal() {
  var reveals = document.querySelectorAll(".section-padding, .price-card, .v-detail-card");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

// Attach the animation to the scroll event
window.addEventListener("scroll", reveal);

// Run once on load to show elements already in view
reveal();
