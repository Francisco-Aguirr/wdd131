document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el año actual en el footer
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;

    // Actualizar la última fecha de modificación
    const lastModified = document.lastModified; 
    document.getElementById('lastModified').textContent = lastModified;
});