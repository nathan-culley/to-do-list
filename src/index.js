import _ from 'lodash';
import './style.css';
import { Project, createProject, projects, markProjectAsComplete } from './projects';
import { Task, createTask, markTaskAsComplete } from './tasks';
import { Ui } from './ui';

const project0 = new Project('Default Project', 'Your tasks will go here by default', '2123-02-11', 'High');

projects.unshift(project0);

console.log(projects);

Ui();


//add ability to filter by complete and incomplete status
//incorporate local storage
//change event listener triggers for form submissions back to "submit" from "click" to allow form validation again
//move object-editing portions of edit modals to the projects.js and tasks.js files
//make it pretty