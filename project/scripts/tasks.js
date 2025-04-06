/**
 * tasks.js - Maneja la lógica de las tareas con JSON
 */

class TaskManager {
    constructor() {
        this.tasks = this.loadInitialTasks();
        this.saveTasks(); // Guardar en localStorage inicialmente
    }
    
    loadInitialTasks() {
        // Primero intenta cargar desde localStorage
        const savedTasks = localStorage.getItem('taskpilot-tasks');
        if (savedTasks) {
            return JSON.parse(savedTasks);
        }
        
        // Si no hay en localStorage, carga el JSON inicial
        return [
            {
                "id": 1,
                "title": "Morning workout",
                "description": "30 minutes of cardio",
                "category": "myDay",
                "dueDate": "2025-04-05",
                "important": true,
                "completed": false,
                "createdAt": "2025-04-01T08:00:00Z"
            },
            {
                "id": 2,
                "title": "Team meeting",
                "description": "Weekly project sync",
                "category": "work",
                "dueDate": "2025-04-05",
                "important": true,
                "completed": false,
                "createdAt": "2025-04-01T09:00:00Z"
              },
              {
                "id": 3,
                "title": "Lunch with Sarah",
                "description": "Catch up with college friend",
                "category": "social",
                "dueDate": "2025-04-06",
                "important": false,
                "completed": false,
                "createdAt": "2025-04-02T12:00:00Z"
              },
              {
                "id": 4,
                "title": "Finish project report",
                "description": "Submit to manager by EOD",
                "category": "work",
                "dueDate": "2025-04-04",
                "important": true,
                "completed": true,
                "createdAt": "2025-03-30T14:00:00Z"
              },
              {
                "id": 5,
                "title": "Buy groceries",
                "description": "Milk, eggs, bread, fruits",
                "category": "myDay",
                "dueDate": "2025-04-05",
                "important": false,
                "completed": false,
                "createdAt": "2025-04-03T18:00:00Z"
              }
        ];
    }
    
    saveTasks() {
        localStorage.setItem('taskpilot-tasks', JSON.stringify(this.tasks));
    }
    
    addTask(taskData) {
        const newTask = {
            id: Date.now(),
            title: taskData.title,
            description: taskData.description || '',
            category: taskData.category || 'general',
            dueDate: taskData.dueDate || null,
            important: taskData.important || false,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    }
    
    getTasksByCategory(category) {
        switch(category) {
            case 'important':
                return this.tasks.filter(task => task.important && !task.completed);
            case 'social':
                return this.tasks.filter(task => task.category === 'social' && !task.completed);
            case 'work':
                return this.tasks.filter(task => task.category === 'work' && !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            case 'myDay':
            default:
                const today = new Date().toISOString().split('T')[0];
                return this.tasks.filter(task => 
                    (task.dueDate === today || task.category === 'myDay') && !task.completed
                );
        }
    }
    
    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            return true;
        }
        return false;
    }
    
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveTasks();
    }
}

// Uso en la página
document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();
    const taskList = document.getElementById('taskList');
    
    // Determinar la categoría actual basada en la página
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    let currentCategory = 'myDay';
    
    if (currentPage.includes('important')) currentCategory = 'important';
    else if (currentPage.includes('social')) currentCategory = 'social';
    else if (currentPage.includes('work')) currentCategory = 'work';
    else if (currentPage.includes('completed')) currentCategory = 'completed';
    
    // Renderizar tareas
    renderTasks(taskManager.getTasksByCategory(currentCategory));
    
    function renderTasks(tasks) {
        if (tasks.length === 0) {
            taskList.innerHTML = '<p class="no-tasks">No tasks found in this category.</p>';
            return;
        }
        
        taskList.innerHTML = tasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-content">
                    <h3>${task.title}</h3>
                    ${task.description ? `<p>${task.description}</p>` : ''}
                    <div class="task-meta">
                        ${task.category !== 'general' ? 
                          `<span class="task-category ${task.category}">${task.category}</span>` : ''}
                        ${task.dueDate ? 
                          `<span class="task-due">Due: ${formatDate(task.dueDate)}</span>` : ''}
                        ${task.important ? 
                          '<span class="task-important">⭐ Important</span>' : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
        `).join('');
        
        // Añadir event listeners
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = parseInt(e.target.closest('.task-item').dataset.id);
                if (taskManager.toggleTaskCompletion(taskId)) {
                    renderTasks(taskManager.getTasksByCategory(currentCategory));
                }
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (confirm('Are you sure you want to delete this task?')) {
                    const taskId = parseInt(e.target.closest('.task-item').dataset.id);
                    taskManager.deleteTask(taskId);
                    renderTasks(taskManager.getTasksByCategory(currentCategory));
                }
            });
        });
    }
    
    function formatDate(dateString) {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});