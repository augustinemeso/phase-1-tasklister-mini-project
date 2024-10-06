document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-task-form');
  const taskList = document.getElementById('tasks');
  const sortButton = document.getElementById('sort-tasks');

  form.addEventListener('submit', function(event) {
      event.preventDefault();

      const taskDescription = document.getElementById('new-task-description').value;
      const priority = document.getElementById('priority').value;
      const dueDate = document.getElementById('due-date').value;

      if (taskDescription && dueDate) {
          addTask(taskDescription, priority, dueDate);
          form.reset(); // Clear the form
      }
  });

  function addTask(description, priority, dueDate) {
      const li = document.createElement('li');
      li.classList.add(priority);
      li.innerHTML = `${description} (Due: ${dueDate})`;

      // Create delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
          taskList.removeChild(li);
      });

      // Create edit button
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => {
          const newDescription = prompt('Edit your task:', description);
          const newDueDate = prompt('Edit due date:', dueDate);
          if (newDescription) {
              li.innerHTML = `${newDescription} (Due: ${newDueDate})`;
              li.className = ''; // Clear current priority classes
              li.classList.add(priority); // Reapply the original priority
              li.classList.add(priority);
          }
      });

      li.appendChild(editButton);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
  }

  sortButton.addEventListener('click', () => {
      const tasks = Array.from(taskList.children);
      const sortedTasks = tasks.sort((a, b) => {
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          const priorityA = a.classList[0];
          const priorityB = b.classList[0];
          return priorityOrder[priorityA] - priorityOrder[priorityB];
      });

      taskList.innerHTML = ''; // Clear the list
      sortedTasks.forEach(task => taskList.appendChild(task)); // Append sorted tasks
  });
});
