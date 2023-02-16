import _ from 'lodash';
import './style.css';
import { Project, createProject, projects, markProjectAsComplete } from './projects';
import { Task, createTask, markTaskAsComplete } from './tasks';
import { Ui } from './ui';

const project0 = new Project('Default Project', 'Your tasks will go here by default', '2123-02-11', 'High');

projects.unshift(project0);

Ui();

