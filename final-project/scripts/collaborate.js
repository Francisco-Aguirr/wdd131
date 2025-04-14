document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const projectsGrid = document.getElementById("projects-grid");
    const assignForm = document.getElementById("assign-form");
  
    // Datos de proyectos (simulados)
    const projects = [
      {
        id: 1,
        name: "Website Redesign",
        progress: 65,
        members: ["alice", "bob"],
        dueDate: "2024-06-15"
      },
      {
        id: 2,
        name: "Marketing Campaign",
        progress: 30,
        members: ["carol", "alice"],
        dueDate: "2024-05-30"
      }
    ];
  
    // Datos de miembros (simulados)
    const teamMembers = {
      alice: { name: "Alice", role: "Designer", avatar: "images/avatar2.webp" },
      bob: { name: "Bob", role: "Developer", avatar: "images/avatar1.webp" },
      carol: { name: "Carol", role: "Marketer", avatar: "images/avatar3.webp" }
    };
  
    // Inicializar la UI
    renderProjects();
  
    // Event Listeners
    assignForm.addEventListener("submit", assignTask);
  
    // Función para renderizar proyectos
    function renderProjects() {
      projectsGrid.innerHTML = "";
  
      if (projects.length === 0) {
        projectsGrid.innerHTML = `<p class="empty-state">No active projects</p>`;
        return;
      }
  
      projects.forEach(project => {
        const projectCard = document.createElement("article");
        projectCard.className = "project-card";
        projectCard.innerHTML = `
          <div class="project-header">
            <h3>${project.name}</h3>
            <span class="due-date">Due: ${formatDate(project.dueDate)}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${project.progress}%"></div>
          </div>
          <div class="project-members">
            ${renderMembers(project.members)}
          </div>
          <button 
            class="join-button" 
            data-project="${project.id}"
            aria-label="Join ${project.name} project"
          >
            Join Project
          </button>
        `;
        projectsGrid.appendChild(projectCard);
      });
  
      // Añadir event listeners a los botones
      document.querySelectorAll(".join-button").forEach(button => {
        button.addEventListener("click", joinProject);
      });
    }
  
    // Función para renderizar miembros
    function renderMembers(memberIds) {
      return memberIds.map(id => `
        <div class="member" aria-label="${teamMembers[id].name} (${teamMembers[id].role})">
          <img 
            src="${teamMembers[id].avatar}" 
            alt="${teamMembers[id].name}" 
            width="40" 
            height="40" 
            loading="lazy"
          >
        </div>
      `).join("");
    }
  
    // Función para unirse a proyecto (simulación)
    function joinProject(e) {
      const projectId = parseInt(e.target.dataset.project);
      const project = projects.find(p => p.id === projectId);
      
      alert(`Simulation: You've joined the "${project.name}" project!`);
      localStorage.setItem(`joined-${projectId}`, "true");
      e.target.disabled = true;
    }
  
    // Función para asignar tarea (simulación)
    function assignTask(e) {
      e.preventDefault();
      const taskName = document.getElementById("task-name").value;
      const assignee = document.getElementById("assign-to").value;
      
      alert(`Simulation: Task "${taskName}" assigned to ${teamMembers[assignee].name}!`);
      e.target.reset();
    }
  
    // Función auxiliar para formatear fechas
    function formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString("en-US", options);
    }
  });