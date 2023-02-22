// import { Ui } from './ui';

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

function createProject(title, description, dueDate, notes, completed) {
    const projectName = `project${projects.length}`;
    window[projectName] = new Project(title, description, dueDate, notes, completed);
    projects.push(window[projectName]);
}

function markProjectAsComplete(project) {
  if (project.completed == true) {
    project.completed = false;
  }
  else {
    project.completed = true;
  }
  console.log(projects);
}

function deleteProject(project) {
  projects.shift(project);
}

function editProject(project, title, description, dueDate, notes) {
  project.title = title;
  project.description = description;
  project.dueDate = dueDate;
  project.notes = notes;
}

export { Project, createProject, projects, markProjectAsComplete, deleteProject, editProject };

