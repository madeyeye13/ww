//FOR HEADER

const navIcon = document.querySelector('.nav-icon');
const navigation = document.querySelector('.navigation');
const closeIcon = document.querySelector('.close-icon');
const navItems = document.querySelectorAll('.navigation ul li a');

navIcon.addEventListener('click', () => {
    navigation.style.top = '0';
});

closeIcon.addEventListener('click', () => {
    navigation.style.top = '-100vh';
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.parentElement.classList.remove('active'));
        item.parentElement.classList.add('active');
    });
});


////////HERO IMAGE SECTION


document.addEventListener("DOMContentLoaded", function() {
    let currentIndex = 0;
    const images = document.querySelectorAll('.hero-img');
    const totalImages = images.length;

    function showNextImage() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].classList.add('active');
    }

    setInterval(showNextImage, 6000); // Change image every 6 seconds
});