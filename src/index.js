document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("create-task-form");
    const taskList = document.getElementById("list");
    const sortButton = document.getElementById("sort-tasks");
    let tasks = []; 
  
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault(); 
  
        const taskDescription = document.getElementById("new-task-description").value;
        const taskPriority = document.getElementById("task-priority").value;
        const taskUser = document.getElementById("task-user").value;
        const taskDuration = document.getElementById("task-duration").value;
        const taskDueDate = document.getElementById("task-due-date").value;
  
        if (taskDescription) {
            const newTask = {
                description: taskDescription,
                priority: taskPriority,
                user: taskUser,
                duration: taskDuration,
                dueDate: taskDueDate
            };
  
            tasks.push(newTask);
            renderTasks();
            taskForm.reset(); 
        }
    });
  
    
    function renderTasks() {
        taskList.innerHTML = ""; 
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = `${task.description} (Assigned to: ${task.user}, Duration: ${task.duration}, Due: ${task.dueDate})`;
            li.className = task.priority; 
  
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit-button"; 
            editButton.addEventListener("click", () => {
                editTask(index);
            });
  
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-button"; 
            deleteButton.addEventListener("click", () => {
                deleteTask(index); 
            });
  
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }
  
    
    function deleteTask(index) {
        tasks.splice(index, 1); 
        renderTasks(); 
    }
  
    
    function editTask(index) {
        const task = tasks[index];
        document.getElementById("new-task-description").value = task.description;
        document.getElementById("task-priority").value = task.priority;
        document.getElementById("task-user").value = task.user;
        document.getElementById("task-duration").value = task.duration;
        document.getElementById("task-due-date").value = task.dueDate;
  
        
        deleteTask(index);
    }
  
    
    sortButton.addEventListener("click", () => {
        tasks.sort((a, b) => {
            const priorities = { high: 1, medium: 2, low: 3 };
            return priorities[a.priority] - priorities[b.priority]; 
        });
        renderTasks(); 
    });
  });
  