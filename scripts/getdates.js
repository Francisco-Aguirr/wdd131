document.addEventListener("DOMContentLoaded", function () {
    // Set the current year dynamically
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    
    // Set the last modified date dynamically
    document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;
});
