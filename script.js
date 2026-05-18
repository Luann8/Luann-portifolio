// Theme
const themeSelector = document.getElementById('themeSelector');
const currentTheme = localStorage.getItem('theme') || 'default';
document.documentElement.setAttribute('data-theme', currentTheme);
themeSelector.value = currentTheme;
themeSelector.addEventListener('change', (e) => {
    document.documentElement.setAttribute('data-theme', e.target.value);
    localStorage.setItem('theme', e.target.value);
});

// Mobile sidebar
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebarOverlay');

hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
});
overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
});

// Smooth scroll + active nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        }
    });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.sidebar-nav a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
});

// Carousel
const carousel = document.getElementById('projectsCarousel');
const carouselContainer = document.querySelector('.carousel-container');
let originalSlides = document.querySelectorAll('.carousel-slide');
const originalCount = originalSlides.length;

for (let i = 0; i < 2; i++) {
    originalSlides.forEach(slide => carousel.appendChild(slide.cloneNode(true)));
}

const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');

let isAutoPlaying = true;
let offset = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;
const speed = 0.6;

function getOriginalWidth() {
    const slide = originalSlides[0];
    const gap = 24;
    return (slide.offsetWidth + gap) * originalCount;
}

function animate() {
    if (!isDragging && isAutoPlaying) offset -= speed;
    const originalWidth = getOriginalWidth();
    if (offset <= -originalWidth) offset += originalWidth;
    else if (offset > 0) offset -= originalWidth;
    carousel.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(animate);
}

carouselContainer.addEventListener('mousedown', (e) => {
    isDragging = true; startX = e.pageX; currentX = offset;
    carouselContainer.style.cursor = 'grabbing';
});
window.addEventListener('mouseup', () => { isDragging = false; carouselContainer.style.cursor = 'grab'; });
window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    offset = currentX + (e.pageX - startX) * 1.5;
});
carouselContainer.addEventListener('touchstart', (e) => {
    isDragging = true; startX = e.touches[0].pageX; currentX = offset;
}, { passive: true });
window.addEventListener('touchend', () => { isDragging = false; });
window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    offset = currentX + (e.touches[0].pageX - startX) * 1.5;
}, { passive: true });
carousel.querySelectorAll('a, img, i').forEach(el => el.addEventListener('dragstart', e => e.preventDefault()));

playPauseBtn.addEventListener('click', () => {
    isAutoPlaying = !isAutoPlaying;
    playPauseIcon.className = isAutoPlaying ? 'fas fa-pause' : 'fas fa-play';
});

requestAnimationFrame(animate);
