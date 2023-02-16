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
    removeAllChildNodes(content);
    
    const title = document.createElement("h1");
    title.setAttribute("id","title");
    title.textContent = "To-Do Wizard";
    content.appendChild(title);
    createInput(content);
    displayProjectList(content);
    displayTaskList(content);
}

//function to create new-project form

function createInput(content) {
    const addProjectSection = document.createElement("form");
    addProjectSection.setAttribute("id", "add-project");
    content.appendChild(addProjectSection);
    addProjectSection.innerHTML = "<h3>Add New Project</h3>"

    //add title
    const titleInputLabel = document.createElement("div");
    titleInputLabel.className = "input-label";
    addProjectSection.appendChild(titleInputLabel);

    const addTitleLabel = document.createElement("label");
    addTitleLabel.setAttribute("for", "add-title");
    addTitleLabel.textContent = "Project Title";
    titleInputLabel.appendChild(addTitleLabel);
    
    const addTitle = document.createElement("input");
    addTitle.setAttribute("type", "text");
    addTitle.setAttribute("id", "add-title");
    addTitle.setAttribute("name", "add-title");
    titleInputLabel.appendChild(addTitle);

    //add description
    const descriptionInputLabel = document.createElement("div");
    descriptionInputLabel.className = "input-label";
    addProjectSection.appendChild(descriptionInputLabel);

    const addDescriptionLabel = document.createElement("label");
    addDescriptionLabel.setAttribute("for", "add-description");
    addDescriptionLabel.textContent = "Project Description";
    descriptionInputLabel.appendChild(addDescriptionLabel);

    const addDescription = document.createElement("input");
    addDescription.setAttribute("type", "text");
    addDescription.setAttribute("id", "add-description");
    addDescription.setAttribute("name", "add-description");
    descriptionInputLabel.appendChild(addDescription);

    //add due date
    const dueDateInputLabel = document.createElement("div");
    dueDateInputLabel.className = "input-label";
    addProjectSection.appendChild(dueDateInputLabel);

    const addDueDateLabel = document.createElement("label");
    addDueDateLabel.setAttribute("for", "add-due-date");
    addDueDateLabel.textContent = "Project Due Date";
    dueDateInputLabel.appendChild(addDueDateLabel);

    const addDueDate = document.createElement("input");
    addDueDate.setAttribute("type", "text");
    addDueDate.setAttribute("id", "add-due-date");
    addDueDate.setAttribute("name", "add-due-date");
    dueDateInputLabel.appendChild(addDueDate);

    //add notes
    const notesInputLabel = document.createElement("div");
    notesInputLabel.className = "input-label";
    addProjectSection.appendChild(notesInputLabel);

    const addNotesLabel = document.createElement("label");
    addNotesLabel.setAttribute("for", "add-notes");
    addNotesLabel.textContent = "Project Notes";
    notesInputLabel.appendChild(addNotesLabel);

    const addNotes = document.createElement("input");
    addNotes.setAttribute("type", "text");
    addNotes.setAttribute("id", "add-notes");
    addNotes.setAttribute("name", "add-notes");
    notesInputLabel.appendChild(addNotes);

    //add submit button
    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "Add Project";
    addProjectButton.setAttribute("type", "submit");
    addProjectSection.appendChild(addProjectButton);

    addProjectButton.addEventListener("click", function() {
        event.preventDefault();

        const formData = new FormData(addProjectSection);
        const title = formData.get('add-title');
        const description = formData.get('add-description');
        const dueDate = formData.get('add-due-date');
        const notes = formData.get('add-notes');

        createProject(title, description, dueDate, notes);

        console.log(projects);
        
        createDisplay(content);
    })
}

//function to display list of projects

function displayProjectList() {
    const projectListSection = document.createElement("div");
    content.appendChild(projectListSection);
    

    const projectList = document.createElement("div");
    projectListSection.appendChild(projectList);
    projectList.innerHTML = "<h3>Current Projects:</h3>";
    for (let project of projects) {
        //create the item representing the project and add it to the project list
        const proj = document.createElement("div");
        proj.setAttribute("id", `project${projects.indexOf(project)}`);
        proj.textContent = project.title;
        projectList.appendChild(proj);

        //give the project item a child div that has two child divs
        const expandProj = document.createElement("div");
        expandProj.className = "expand-proj";
        expandProj.setAttribute("expanded", "true");
        proj.appendChild(expandProj);
        
        const projDetails = document.createElement("div");
        projDetails.className = "proj-details";
        const projTasks = document.createElement("div");
        projTasks.className = "proj-tasks";

        expandProj.appendChild(projDetails);
        expandProj.appendChild(projTasks);
        
        displayProjectDetails(projDetails, project);
        displayTaskList(projTasks, project);
    }
}

//function to display info about project

function displayProjectDetails(projDetails, project) {
    const details = document.createElement("ul");
    details.textContent = "Project Details";
    projDetails.appendChild(details);

    //display description
    const description = document.createElement("li");
    description.textContent = `Description: ${project.description}`;
    details.appendChild(description);

    //display due date
    const dueDate = document.createElement("li");
    dueDate.textContent = `Due Date: ${project.dueDate}`;
    details.appendChild(dueDate);

    //display notes
    const notes = document.createElement("li");
    notes.textContent = `Notes: ${project.notes}`;
    details.appendChild(notes);

    //display completion
    const completion = document.createElement("li");
    if (project.completion == true) {
        completion.textContent = 'Completed: Yes';
    }
    else {
        completion.textContent = "Completed: No";
    }
    details.appendChild(completion);
}

//function to display list of tasks under each project

function displayTaskList(proj, project) {

    if (project.taskList != undefined) {

        const tasks = document.createElement("ul");
        tasks.textContent = "Task List";
        proj.appendChild(tasks);
    
        console.log(project.taskList);
        
        for (let task of project.taskList) {
            const todo = document.createElement("li");
            todo.textContent = task.title;
            tasks.appendChild(todo);
        }
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export { Ui };