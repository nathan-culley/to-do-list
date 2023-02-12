export default class Project {
    constructor(title, description, dueDate, notes) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.notes = notes;
      this.completed = false;
      this.taskList = [];
    }
  
    addTask(task) {
      this.taskList.push(task);
    }
  }