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
