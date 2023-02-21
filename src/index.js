import _ from 'lodash';
import './style.css';
import { Project, createProject, projects, markProjectAsComplete } from './projects';
import { Task, createTask, markTaskAsComplete } from './tasks';
import { Ui } from './ui';

const project0 = new Project('Default Project', 'Your tasks will go here by default', '2123-02-11', 'High');

projects.unshift(project0);

console.log(projects);

Ui();


//add ability to edit project details
//add ability to edit task details
//add form validation
//allow user to add more info to tasks
//rework system for adding unique identifiers for each project and task (find out if this really matters--you may be able to just delete projects and tasks and not worry about it if there are no references to the identifiers you're using)
//add ability to delete projects and tasks
//add ability to filter by complete and incomplete status
//update display of project details after toggling completion ("completed" does not update to yes).
//incorporate local storage
//make it pretty