import { Project, projects } from './projects';

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

function checkProjects() {
    if (!localStorage.getItem('projects')) {
        
        setProjects();
      } else {
        getProjects();
      }
}

function setProjects() {
    localStorage.setItem('projects', projects);
}

function getProjects() {
    console.log(localStorage.getItem('projects'));
}

export { storageAvailable, setProjects, getProjects, checkProjects };