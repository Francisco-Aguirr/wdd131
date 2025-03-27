window.addEventListener('load', function() {
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

    const gallery = document.querySelector('.gallery');
    const navLinks = document.querySelectorAll('#nav-menu a');
    const h2 = document.querySelector('main h2');

    // Función para crear tarjetas de templo
    function createTempleCard(temple) {
        const card = document.createElement('div');
        card.className = 'temple-card';
        
        card.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
            <h3>${temple.templeName}</h3>
            <p><strong>Location:</strong> ${temple.location}</p>
            <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
            <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
        `;
        
        return card;
    }

    // Función para mostrar todos los templos
    function displayAllTemples() {
        h2.textContent = 'All Temples';
        gallery.innerHTML = '';
        temples.forEach(temple => {
            gallery.appendChild(createTempleCard(temple));
        });
    }

    // Función para filtrar templos antiguos (antes de 1900)
    function displayOldTemples() {
        h2.textContent = 'Old Temples (Before 1900)';
        gallery.innerHTML = '';
        const oldTemples = temples.filter(temple => {
            const year = parseInt(temple.dedicated.split(',')[0]);
            return year < 1900;
        });
        oldTemples.forEach(temple => {
            gallery.appendChild(createTempleCard(temple));
        });
    }

    // Función para filtrar templos nuevos (después de 2000)
    function displayNewTemples() {
        h2.textContent = 'New Temples (After 2000)';
        gallery.innerHTML = '';
        const newTemples = temples.filter(temple => {
            const year = parseInt(temple.dedicated.split(',')[0]);
            return year > 2000;
        });
        newTemples.forEach(temple => {
            gallery.appendChild(createTempleCard(temple));
        });
    }

    // Función para filtrar templos grandes (>90,000 sq ft)
    function displayLargeTemples() {
        h2.textContent = 'Large Temples (>90,000 sq ft)';
        gallery.innerHTML = '';
        const largeTemples = temples.filter(temple => temple.area > 90000);
        largeTemples.forEach(temple => {
            gallery.appendChild(createTempleCard(temple));
        });
    }

    // Función para filtrar templos pequeños (<10,000 sq ft)
    function displaySmallTemples() {
        h2.textContent = 'Small Temples (<10,000 sq ft)';
        gallery.innerHTML = '';
        const smallTemples = temples.filter(temple => temple.area < 10000);
        smallTemples.forEach(temple => {
            gallery.appendChild(createTempleCard(temple));
        });
    }

    // Event listeners para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const linkText = link.textContent;
            
            switch(linkText) {
                case 'Home':
                    displayAllTemples();
                    break;
                case 'Old':
                    displayOldTemples();
                    break;
                case 'New':
                    displayNewTemples();
                    break;
                case 'Large':
                    displayLargeTemples();
                    break;
                case 'Small':
                    displaySmallTemples();
                    break;
            }
        });
    });

    // Mostrar todos los templos al cargar la página
    displayAllTemples();
});