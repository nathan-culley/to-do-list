import _ from 'lodash';
import './style.css';
import { Project, createProject, projects, markProjectAsComplete } from './projects';
import { Task, createTask, markTaskAsComplete } from './tasks';
import { Ui } from './ui';

const project0 = new Project('Default Project', 'Your tasks will go here by default', '2123-02-11', 'High');

projects.unshift(project0);

const task1 = new Task('Task 1', 'First task', '2023-03-01', 'High', 'Important task');

project0.addTask(task1);

// function createProject(title, description, dueDate, notes) {
//     const projectName = `project${projects.length}`;
//     window[projectName] = new Project(title, description, dueDate, notes);
//     projects.push(window[projectName]);
// }

// function createTask(project, title, description, dueDate, priority, notes) {
//     const taskName = `task${project.taskList.length}`;
//     window[taskName] = new Task(title, description, dueDate, priority, notes);
//     project.taskList.push(window[taskName]);
//   }

// function markProjectAsComplete(project) {
//     project.completed = true;
// }

// function markTaskAsComplete(task) {
//     task.completed = true;
// }


createProject('Project 2', 'My second project', '2023-03-02', 'Medium');
createTask(projects[0], 'Task 1', 'My first task', '2023-03-03', 'High', 'Important');

createTask(projects[1], 'Task 1', 'My first task', '2023-03-03', 'High', 'Important');

console.log(projects);

// markTaskAsComplete(project0.taskList[0]);

// markProjectAsComplete(projects[0]);

// console.log(projects);

Ui();

