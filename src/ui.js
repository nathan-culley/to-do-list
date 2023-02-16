import { add } from 'lodash';
import { Project, createProject, projects, markProjectAsComplete } from './projects';
import { Task, createTask, markTaskAsComplete } from './tasks';

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
    //displayTaskList(content);
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
        // event.preventDefault();

        // const formData = new FormData(addProjectSection);
        // const title = formData.get('add-title');
        // const description = formData.get('add-description');
        // const dueDate = formData.get('add-due-date');
        // const notes = formData.get('add-notes');

        // createProject(title, description, dueDate, notes);

        // console.log(projects);
        
        // createDisplay(content);
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

        //create a button for toggling expansion of details (event listener comes later)
        const expandBtn = document.createElement("button");
        expandBtn.className = "expand-button";
        expandBtn.textContent = "Toggle Details";
        proj.appendChild(expandBtn);

        //create a button to toggle the complete/incomplete status of the project
        const completeProjBtn = document.createElement("button");
        completeProjBtn.className = "complete-button";
        completeProjBtn.textContent = "Toggle Complete";
        proj.appendChild(completeProjBtn);
        completeProjBtn.addEventListener("click", function() {
            markProjectAsComplete(project);
            if (project.completed == true) {
                proj.setAttribute("completed", "true");
            }
            else if (project.completed == false) {
                proj.setAttribute("completed", "false");
            }
            console.log(projects);
        })

        

        


        //give the project item a child div to contain expanded info and inputs
        const expandProj = document.createElement("div");
        expandProj.className = "expand-proj";
        expandProj.setAttribute("expanded", "true");
        proj.appendChild(expandProj);

        const newTaskForm = document.createElement("form");
        expandProj.appendChild(newTaskForm);

        //create a button to add a new task and add it to the expanded section
        const newTaskButton = document.createElement("button");
        newTaskButton.textContent = "New Task";
        newTaskButton.setAttribute("type", "submit");
        newTaskForm.appendChild(newTaskButton);

        const newTaskTitle = document.createElement("input");
        newTaskTitle.setAttribute("type", "text");
        newTaskTitle.setAttribute("name", "add-title");
        newTaskTitle.setAttribute("value", "Task Title");
        newTaskForm.appendChild(newTaskTitle);

        const newTaskDueDate = document.createElement("input");
        newTaskDueDate.setAttribute("type", "text");
        newTaskDueDate.setAttribute("name", "add-due-date");
        newTaskDueDate.setAttribute("value", "Task Due Date");
        newTaskForm.appendChild(newTaskDueDate);
        
        newTaskButton.addEventListener("click", function() {
            event.preventDefault();
    
            const formData = new FormData(newTaskForm);
            const title = formData.get('add-title');
            const dueDate = formData.get('add-due-date');
    
            createTask(project, title, '', dueDate, '', '');
    
            console.log(project.taskList);
            
            createDisplay(content);
        })

        //create section to contain the project details and task list
        const expandSections = document.createElement("div");
        expandSections.className = "expand-sections";
        expandProj.appendChild(expandSections);
        
        const projDetails = document.createElement("div");
        projDetails.className = "proj-details";
        const projTasks = document.createElement("div");
        projTasks.className = "proj-tasks";

        expandSections.appendChild(projDetails);
        expandSections.appendChild(projTasks);
        
        displayProjectDetails(projDetails, project);
        displayTaskList(projTasks, project);

        //add event listener to expandBtn that toggles the 'expanded' property of expandProj
        expandBtn.addEventListener("click", () => {
            if (expandProj.getAttribute("expanded") == "true") {
                console.log("expanded");
                expandProj.setAttribute("expanded", "false");
            }
            else if (expandProj.getAttribute("expanded") == "false") {
                console.log("not expanded");
                expandProj.setAttribute("expanded", "true");
            }
        });

        
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
    const taskListTitle = document.createElement("h4");
    taskListTitle.textContent = "Task List";
    proj.appendChild(taskListTitle);
    
    const taskTable = document.createElement("table");
    proj.appendChild(taskTable);
    const taskHeader = document.createElement("tr");
    taskTable.appendChild(taskHeader);

    const titleHeader = document.createElement("th");
    const dueDateHeader = document.createElement("th");
    const completeHeader = document.createElement("th");

    titleHeader.textContent = "Title";
    dueDateHeader.textContent = "Due Date";
    completeHeader.textContent = "Toggle Complete";

    taskHeader.appendChild(titleHeader);
    taskHeader.appendChild(dueDateHeader);
    taskHeader.appendChild(completeHeader);

        
    for (let task of project.taskList) {
        // const todo = document.createElement("li");
        // todo.textContent = task.title + " (" + task.dueDate + "}";
        // tasks.appendChild(todo);

        const taskRow = document.createElement("tr");
        taskRow.setAttribute("completed", "false");
        taskTable.appendChild(taskRow);

        const taskTitle = document.createElement("td");
        taskTitle.textContent = task.title;
        taskRow.appendChild(taskTitle);

        const taskDueDate = document.createElement("td");
        taskDueDate.textContent = task.dueDate;
        taskRow.appendChild(taskDueDate);

        const taskComplete = document.createElement("td");
        taskRow.appendChild(taskComplete);
        
        // const completeTaskBtn = document.createElement("button");
        // completeTaskBtn.setAttribute("type", "submit");
        // completeTaskBtn.textContent = "Toggle";
        // taskComplete.appendChild(completeTaskBtn);

        const completeTaskBtn = document.createElement("button");
        completeTaskBtn.className = "task-button";
        completeTaskBtn.textContent = "Toggle";
        taskComplete.appendChild(completeTaskBtn);
        completeTaskBtn.addEventListener("click", function() {
            markTaskAsComplete(task);
            if (task.completed == true) {
                taskRow.setAttribute("completed", "true");
            }
            else if (task.completed == false) {
                taskRow.setAttribute("completed", "false");
            }
            console.log(project.taskList);
        })


    }

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export { Ui };