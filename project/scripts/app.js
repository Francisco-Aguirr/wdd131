/**
 * app.js - Configura la interfaz principal de iconos
 */

function setupIcons() {
    const iconContainer = document.createElement('div');
    iconContainer.className = 'icon-grid';
    
    const icons = [
        { name: 'My Day', icon: 'images/myday.svg', page: 'index.html' },
        { name: 'Important', icon: 'images/important.svg', page: 'important.html' },
        { name: 'Social', icon: 'images/social.svg', page: 'social.html' },
        { name: 'Work', icon: 'images/work.svg', page: 'work.html' },
        { name: 'Completed', icon: 'images/completed.svg', page: 'completed.html' },
        { name: 'Add New', icon: 'images/add.svg', page: 'add.html' }
    ];
    
    // Crear HTML de los iconos
    iconContainer.innerHTML = icons.map(icon => `
        <a href="${icon.page}" class="icon-link ${window.location.pathname.includes(icon.page) ? 'active' : ''}">
            <img src="${icon.icon}" alt="${icon.name}" loading="lazy" class="icon">
            <span>${icon.name}</span>
        </a>
    `).join('');
    
    // Insertar antes del contenido principal
    document.querySelector('main').prepend(iconContainer);
}

document.addEventListener('DOMContentLoaded', () => {
    // Solo configura los iconos
    setupIcons();
});