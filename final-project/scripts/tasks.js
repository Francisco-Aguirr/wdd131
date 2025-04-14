document.addEventListener("DOMContentLoaded", () => {
    // Elementos del DOM
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskDue = document.getElementById("task-due");
    const taskList = document.getElementById("task-list");
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");
    const filterButtons = document.querySelectorAll(".filter-button");
  
    // Estado inicial
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let currentFilter = "all";
  
    // Inicializar la UI
    renderTasks();
  
    // Event Listeners
    taskForm.addEventListener("submit", addTask);
    filterButtons.forEach(button => {
      button.addEventListener("click", () => setFilter(button.id));
    });
  
    // Función para añadir tarea
    function addTask(e) {
      e.preventDefault();
      
      const title = taskInput.value.trim();
      const dueDate = taskDue.value;
      
      if (title) {
        const newTask = {
          id: Date.now(),
          title,
          dueDate: dueDate || "No deadline",
          completed: false,
          createdAt: new Date().toISOString()
        };
  
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskForm.reset();
      }
    }
  
    // Función para renderizar tareas
    function renderTasks() {
      taskList.innerHTML = "";
  
      const filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
      });
  
      // no tasks
      if (tasks.length === 0) {
        taskList.innerHTML = `
          <li class="empty-state">
            <img src="images/no-tasks.webp" alt="No tasks" width="150" height="150" loading="lazy">
            <p>No tasks yet! Add your first task above 👆</p>
          </li>
        `;
        return;
      }
      // no tasks
      if (filteredTasks.length === 0) {
        taskList.innerHTML = `<li class="empty-state">No tasks found</li>`;
      } else {
        filteredTasks.forEach(task => {
          const taskItem = document.createElement("li");
          taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
          taskItem.innerHTML = `
            <label>
              <input 
                type="checkbox" 
                ${task.completed ? "checked" : ""}
                data-id="${task.id}"
                aria-label="${task.completed ? "Mark as incomplete" : "Mark as complete"}"
              >
              <span class="task-title">${task.title}</span>
              <span class="task-due">${formatDueDate(task.dueDate)}</span>
            </label>
            <button 
              class="delete-button" 
              data-id="${task.id}"
              aria-label="Delete task"
            >×</button>
          `;
          taskList.appendChild(taskItem);
        });
      }
  
      // Actualizar progress bar
      updateProgress();
      
      // Añadir event listeners a los nuevos elementos
      document.querySelectorAll(".task-item input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener("change", toggleTask);
      });
      
      document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener("click", deleteTask);
      });
    }
  
    // Funciones auxiliares
    function toggleTask(e) {
      const taskId = parseInt(e.target.dataset.id);
      tasks = tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      saveTasks();
      renderTasks();
    }
  
    function deleteTask(e) {
      const taskId = parseInt(e.target.dataset.id);
      tasks = tasks.filter(task => task.id !== taskId);
      saveTasks();
      renderTasks();
    }
  
    function setFilter(filterId) {
      currentFilter = filterId.replace("filter-", "");
      filterButtons.forEach(button => {
        button.classList.toggle("active", button.id === filterId);
      });
      renderTasks();
    }
  
    function updateProgress() {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.completed).length;
      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      
      progressFill.style.width = `${progress}%`;
      progressText.textContent = `${progress}%`;
    }
  
    function formatDueDate(dateString) {
      if (dateString === "No deadline") return dateString;
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString("en-US", options);
    }
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });