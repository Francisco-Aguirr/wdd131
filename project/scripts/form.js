document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addTaskForm');
    const taskManager = new TaskManager();
    const taskList = document.getElementById('taskList'); // Asegurar que taskList está definido

    // Cargar categorías disponibles
    const categorySelect = document.getElementById('taskCategory');
    const categories = [
        { value: 'myDay', label: 'My Day' },
        { value: 'work', label: 'Work' },
        { value: 'social', label: 'Social' },
        { value: 'general', label: 'General' }
    ];
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.value;
        option.textContent = category.label;
        categorySelect.appendChild(option);
    });
    
    // Configurar fecha mínima (hoy)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('taskDueDate').min = today;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const taskData = {
            title: document.getElementById('taskTitle').value.trim(),
            description: document.getElementById('taskDescription').value.trim(),
            category: document.getElementById('taskCategory').value,
            dueDate: document.getElementById('taskDueDate').value || null,
            important: document.getElementById('taskImportant').checked
        };
        
        if (taskData.title) {
            taskManager.addTask(taskData);
            
            // Mostrar feedback
            showNotification('Task added successfully!');
            
            // Resetear formulario
            form.reset();
            
            // Asegurar que taskList existe antes de renderizar
            if (taskList) {
                renderTasks(taskManager.getTasksByCategory('myDay'));
            }
        } else {
            showNotification('Please enter a task title', 'error');
        }
    });
    
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
});
