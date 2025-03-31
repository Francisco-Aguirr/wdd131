// Update and display review counter
if (localStorage.getItem('reviewCount')) {
    let count = parseInt(localStorage.getItem('reviewCount')) + 1;
    localStorage.setItem('reviewCount', count);
    document.getElementById('reviewCounter').textContent = count;
} else {
    localStorage.setItem('reviewCount', 1);
    document.getElementById('reviewCounter').textContent = 1;
}

// Set current year and last modified date in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;