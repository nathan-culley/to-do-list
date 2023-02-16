class Task {
    constructor(title, description, dueDate, priority, notes) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.notes = notes;
      this.completed = false;
    }
}

function createTask(project, title, description, dueDate, priority, notes) {
  const taskName = `task${project.taskList.length}`;
  window[taskName] = new Task(title, description, dueDate, priority, notes);
  project.taskList.push(window[taskName]);
}

// function markTaskAsComplete(task) {
//   task.completed = true;
// }

function markTaskAsComplete(task) {
  if (task.completed == true) {
    task.completed = false;
  }
  else if (task.completed == false) {
    task.completed = true;
  }
  console.log(task);
}

export { Task, createTask, markTaskAsComplete };

