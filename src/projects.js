const projects = [];

class Project {
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

function createProject(title, description, dueDate, notes) {
    const projectName = `project${projects.length}`;
    window[projectName] = new Project(title, description, dueDate, notes);
    projects.push(window[projectName]);
}

function markProjectAsComplete(project) {
  project.completed = true;
}

export { Project, createProject, projects, markProjectAsComplete };

