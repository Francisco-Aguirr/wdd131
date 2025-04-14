document.addEventListener("DOMContentLoaded", () => {
    console.log("TaskPilot initialized");
    
    // Función para resaltar la página activa en la navegación
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a");
  
    navLinks.forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.setAttribute("aria-current", "page");
      }
    });
  });