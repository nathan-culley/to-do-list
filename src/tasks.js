import { setStorage } from './local';

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
  setStorage();
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
  setStorage();
  console.log(task);
}

function deleteTask(project, task) {
  project.taskList.splice(project.taskList.indexOf(task), 1);
  setStorage();
}

function editTask(task, title, description, dueDate, priority, notes) {
  if (title != "") {
    task.title = title;

  }
  if (description != "") {
    task.description = description;

  }
  if (dueDate != "") {
    task.dueDate = dueDate;

  }
  if (priority != "") {     
    task.priority = priority;
  }
  if (notes != "") {
    task.notes = notes;
  }
  setStorage();
}

export { Task, createTask, markTaskAsComplete, deleteTask, editTask };

