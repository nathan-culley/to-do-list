import { Project, projects } from './projects';
import { Task } from './tasks';

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function checkStorage() {
    const isStorageAvailable = storageAvailable('localStorage');
  
    if (isStorageAvailable) {
      const projectsData = localStorage.getItem('projects');
  
      if (!projectsData) {
        // No data in localStorage, call setStorage function to populate data
        console.log("no projects data, set storage");
        const project0 = new Project('Default Project', 'Your tasks will go here by default', '2123-02-11', 'High');
        projects.unshift(project0);
        setStorage();
      } else {
        // Data exists in localStorage, call getStorage function to retrieve data
        console.log("storage data, get data from storage");
        console.log(localStorage.getItem('projects'));
        // const project0 = new Project('Default Project', 'Your tasks will go here by default', '2123-02-11', 'High');
        // projects.unshift(project0);
        getStorage();
      }
    } else {
      console.log('Local storage is not available');
    }
}

function setStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
    console.log(localStorage.getItem('projects'));
}


function getStorage() {
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
  
    if (storedProjects) {
      projects.length = 0;
  
      for (let storedProject of storedProjects) {
        const project = new Project(storedProject.title, storedProject.description);
        
        for (let storedTask of storedProject.taskList) {
          const task = new Task(storedTask.title, storedTask.description, storedTask.dueDate);
          task.completed = storedTask.completed;
          project.taskList.push(task);
        }
        
        projects.push(project);
      }
    } else {
      console.log('No projects found in storage');
    }
}
  

// function getStorage() {
//     const storageData = localStorage.getItem('projects');
  
//     if (storageData !== null) {
//       try {
//         const storedProjects = JSON.parse(storageData);
//         for (let storedProject of storedProjects) {
//           const project = new Project(storedProject.title, storedProject.description, storedProject.dueDate, storedProject.priority);
  
//           for (let storedTask of storedproject.taskList) {
//             const task = new Task(storedTask.title, storedTask.description, storedTask.dueDate, storedTask.priority);
//             task.completed = storedTask.completed;
//             project.addTask(task);
//           }
  
//           projects.push(project);
//         }
//       } catch (error) {
//         console.error('Error parsing projects from local storage:', error);
//       }
//     }
//   }
  

export { storageAvailable, setStorage, getStorage, checkStorage };