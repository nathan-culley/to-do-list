import _ from 'lodash';
import './style.css';
import { Project, createProject, projects, markProjectAsComplete, deleteProject } from './projects';
import { Task, createTask, markTaskAsComplete } from './tasks';
import { Ui } from './ui';
import { checkProjects, getProjects, storageAvailable } from './local';

if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    console.log("Storage is available");
    checkProjects();
  }
else {
    // Too bad, no localStorage for us
    console.log("Storage is not available");

}

const project0 = new Project('Default Project', 'Your tasks will go here by default', '2123-02-11', 'High');
        projects.unshift(project0);


console.log(projects);

getProjects();

Ui();


//incorporate local storage
//change event listener triggers for form submissions back to "submit" from "click" to allow form validation again
//make it pretty