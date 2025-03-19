document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el año actual en el footer
    const currentYear = new Date().getFullYear();
    document.getElementById('currentYear').textContent = currentYear;

    // Actualizar la última fecha de modificación
    const lastModified = document.lastModified;
    document.getElementById('lastModified').textContent = lastModified;

    // Calcular Wind Chill
    const temp = 10; // Temperatura en °C
    const windSpeed = 5; // Velocidad del viento en km/h

    function calculateWindChill(temp, windSpeed) {
        return (temp <= 10 && windSpeed > 4.8) ? 
            (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1) + "°C" : "N/A";
    }

    document.getElementById('windChill').textContent = calculateWindChill(temp, windSpeed);
});