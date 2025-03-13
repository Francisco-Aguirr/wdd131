// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.textContent = navMenu.style.display === 'flex' ? '✕' : '☰';
});

// Update Footer Year and Last Modified Date
const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('last-modified').textContent = lastModified;