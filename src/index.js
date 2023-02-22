import _ from 'lodash';
import './style.css';
import { Project, createProject, projects, markProjectAsComplete, deleteProject } from './projects';
import { Task, createTask, markTaskAsComplete } from './tasks';
import { Ui } from './ui';
import { checkStorage, getStorage, storageAvailable } from './local';

if (storageAvailable('localStorage')) {
    // Yippee! We can use localStorage awesomeness
    console.log("Storage is available");
    checkStorage();
  }
else {
    // Too bad, no localStorage for us
    const project0 = new Project('Default Project', 'Your tasks will go here by default', '2123-02-11', 'High');
    projects.unshift(project0);
    console.log("Storage is not available");

}

Ui();


//make it pretty (switch color scheme from purple to dark blue and gold)
//clean up code