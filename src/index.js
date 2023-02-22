import _ from 'lodash';
import './style.css';
import { Project, createProject, projects, markProjectAsComplete, deleteProject } from './projects';
import { Task, createTask, markTaskAsComplete } from './tasks';
import { Ui } from './ui';

const project0 = new Project('Default Project', 'Your tasks will go here by default', '2123-02-11', 'High');

projects.unshift(project0);

console.log(projects);

Ui();


//incorporate local storage
//change event listener triggers for form submissions back to "submit" from "click" to allow form validation again
//modularize further
//fix display of complete tasks (same issue as complete projects showing incomplete when new projects added)
//make it pretty