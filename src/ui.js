import { add } from 'lodash';
import { Project, createProject, projects, markProjectAsComplete } from './projects';

function Ui() {
    const content = document.createElement("div");
    content.setAttribute("id", "content");
    document.body.appendChild(content);

    createDisplay(content);

    
}

//function to create overall display

function createDisplay(content) {
    console.log("createDisplay");
    console.log(content);
    console.log(projects);
    createInput(content);
    createProjectList(content);
    createTaskList(content);
}

//function to create new-project form

function createInput(content) {
    const newProjectSection = document.createElement("div");
    content.appendChild(newProjectSection);
    newProjectSection.innerHTML = "<h1>Add New Project</h1>"

    //add title
    const addTitle = document.createElement("input");
    addTitle.setAttribute("type", "text");
    newProjectSection.appendChild(addTitle);

    //add description
    const addDescription = document.createElement("input");
    addDescription.setAttribute("type", "text");
    newProjectSection.appendChild(addDescription);

    //add due date
    const addDueDate = document.createElement("input");
    addDueDate.setAttribute("type", "text");
    newProjectSection.appendChild(addDueDate);

    //add notes
    const addNotes = document.createElement("input");
    addNotes.setAttribute("type", "text");
    newProjectSection.appendChild(addNotes);


}

//function to display list of projects

function createProjectList() {
    const projectListSection = document.createElement("div");
    content.appendChild(projectListSection);
    

    const projectList = document.createElement("ul");
    projectListSection.appendChild(projectList);
    projectList.textContent = "Current Projects:";
    for (let project of projects) {
        const proj = document.createElement("li");
        proj.setAttribute("id", `project${projects.indexOf(project)}`);
        proj.textContent = project.title;
        projectList.appendChild(proj);
        createTaskList(proj, project);
    }
}

//function to display list of tasks under each project

function createTaskList(proj, project) {
    const tasks = document.createElement("ul");
    proj.appendChild(tasks);

    console.log(project.taskList);
    
    for (let task of project.taskList) {
        const todo = document.createElement("li");
        todo.textContent = task.title;
        tasks.appendChild(todo);
    }
}

export { Ui };




// const newProjectBtn = document.createElement("button");
//     content.appendChild(newProjectBtn);
//     newProjectBtn.addEventListener("click", function() {
//         createProject('Project 2', 'My second project', '2023-03-02', 'Medium');
//     });

//     const consoleBtn = document.createElement("button");
//     content.appendChild(consoleBtn);
//     consoleBtn.addEventListener("click", function() {
//         console.log(projects);
//     })