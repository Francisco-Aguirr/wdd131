# TaskManager - TaskPilot

## Overview
TaskManager (TaskPilot) is a simple and efficient task management application that allows users to add, categorize, and manage their daily tasks. It stores tasks using `localStorage`, ensuring data persistence across page reloads. Users can categorize tasks into different groups such as "My Day", "Work", "Social", and "General" and mark tasks as completed or important.

## Features
- **Task Management:** Add, delete, and mark tasks as completed.
- **Task Categorization:** Tasks can be categorized under "My Day", "Work", "Social", and "General".
- **Persistent Storage:** Uses `localStorage` to save tasks, ensuring they are not lost after refreshing the page.
- **Task Filtering:** View tasks based on categories or their importance.
- **Form Validation:** Ensures that the task title is entered before submitting.
- **Responsive Notifications:** Displays success and error messages dynamically.

## Technologies Used
- **JavaScript (ES6+):** Main programming language for task logic and interactivity.
- **HTML5:** Structure of the application.
- **CSS3:** Styling and layout, including responsive design.
- **LocalStorage:** Data persistence for tasks.

## Project Structure
```
project-root/
│── index.html        # Main interface
│── css/
│   ├── styles.css    # Main stylesheet
│── js/
│   ├── tasks.js      # Task management logic
│   ├── form.js       # Form handling logic
│── assets/
│   ├── icons/        # Icons used in the UI
│── README.md         # Project documentation
```

## How It Works
1. **Loading Tasks:**
   - The application first tries to load saved tasks from `localStorage`. If none are found, it initializes with some default tasks.

2. **Adding a Task:**
   - Users fill out the task form, select a category, set a due date (optional), and mark it as important (optional).
   - The task is added to the list and stored in `localStorage`.

3. **Displaying Tasks:**
   - Tasks are displayed based on the selected category.
   - Tasks due today or marked under "My Day" are shown in the default view.

4. **Completing & Deleting Tasks:**
   - Users can mark tasks as completed, which moves them to the "Completed" section.
   - Tasks can also be deleted permanently.

## Installation & Usage
No installation is required. Simply clone or download the repository and open `index.html` in a browser.

```sh
git clone https://github.com/your-username/taskmanager.git
cd taskmanager
open index.html
```

## Future Improvements
- Implement a backend for multi-user support.
- Add a drag-and-drop feature for reordering tasks.
- Introduce a calendar-based task scheduler.

## License
This project is open-source and free to use under the MIT License.

## Author
Developed by Francisco Aguirre. Feel free to contribute and improve the project!

