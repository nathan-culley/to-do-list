import { add } from 'lodash';
import { Project, createProject, projects, markProjectAsComplete, deleteProject, editProject } from './projects';
import { Task, createTask, markTaskAsComplete, deleteTask, editTask } from './tasks';

//FUNCTION TO CREATE CONTENT AREA AND PROMPT DISPLAY CREATION
function Ui() {
    const content = document.createElement("div");
    content.setAttribute("id", "content");
    document.body.appendChild(content);
    createDisplay(content);
}
let hideComplete = false;

//FUNCTION TO GENERATE MAJOR DISPLAY ELEMENTS
function createDisplay(content) {
    removeAllChildNodes(content);
    const title = document.createElement("h1");
    title.setAttribute("id","title");
    title.textContent = "To-Do Wizard";
    content.appendChild(title);
    createInput(content);
    displayProjectSection(content);
    //displayTaskList(content);
}

//FUNCTION TO CREATE NEW-PROJECT FORM 
function createInput(content) {
    //add form header
    const addProjectSection = document.createElement("form");
    addProjectSection.setAttribute("id", "add-project");
    content.appendChild(addProjectSection);
    const addProjectHeader = document.createElement("h3");
    addProjectHeader.textContent = "Add New Project";
    addProjectSection.appendChild(addProjectHeader);

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
    addTitle.setAttribute("minlength", "0");
    addTitle.setAttribute("maxlength", "20");
    addTitle.setAttribute("required","");
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
    addDescription.setAttribute("minlength", "0");
    addDescription.setAttribute("maxlength", "50");
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
    addDueDate.setAttribute("type", "date");
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
    addNotes.setAttribute("minlength", "0");
    addNotes.setAttribute("maxlength", "100");
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
    });
}

//FUNCTION TO DISPLAY PROJECTS SECTION
function displayProjectSection() {
    // generate top-matter of projects section
    const projectListSection = document.createElement("div");
    content.appendChild(projectListSection);    

    const projectList = document.createElement("div");
    projectListSection.appendChild(projectList);
    const projectListHeader = document.createElement("h3");
    projectListHeader.textContent = "Current Projects:";
    projectList.appendChild(projectListHeader);

    
    const hideCompleteBtn = document.createElement("button");
    if (hideComplete == false) {
        hideCompleteBtn.textContent = "Hide Completed Projects";
    }
    if (hideComplete == true) {
        hideCompleteBtn.textContent = "Show Completed Projects";
    }
    // hideCompleteBtn.textContent = "Filter Completed Projects";
    projectList.appendChild(hideCompleteBtn);

    hideCompleteBtn.addEventListener("click", function() {
        
        if (hideComplete == false) {
            hideComplete = true;
        }
        else {
            hideComplete = false;
        }
        createDisplay(content);
    })
    
    //generate list of projects
    displayProjectList(projectList, projects);
}

//FUNCTION TO GENERATE LIST OF PROJECTS
function displayProjectList(projectList, projects) {
    for (let project of projects) {
        if (hideComplete == true) {
            if (project.completed == true) {
                continue;
            }
        }
        
        //create the item representing the project and add it to the project list
        const proj = document.createElement("div");
        proj.setAttribute("id", `project${projects.indexOf(project)}`);
        proj.className = "project-area";
        projectList.appendChild(proj);

        const projTitle = document.createElement("h4");
        projTitle.textContent = `Project Title: ` + project.title;
        proj.appendChild(projTitle);

        if (project.completed == true) {
            projTitle.setAttribute("completed", "true");
        }
        else {
            projTitle.setAttribute("completed", "false");
        }

        //create an edit button and modal for the project
        const editProjBtn = document.createElement("button");
        editProjBtn.className = "edit-button";
        editProjBtn.textContent = "Edit";
        proj.appendChild(editProjBtn);

        const projectModal = editProjectModal(proj, project);

        editProjBtn.addEventListener("click", function() {
            projectModal.showModal();
        })


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
                projTitle.setAttribute("completed", "true");
            }
            else {
                projTitle.setAttribute("completed", "false");
            }
            displayProjectDetails(projDetails, project)
            console.log(projects);
        })

        //create a button to delete the project
        const deleteProjBtn = document.createElement("button");
        deleteProjBtn.className = "delete-button";
        deleteProjBtn.textContent = "Delete";
        proj.appendChild(deleteProjBtn);
        deleteProjBtn.addEventListener("click", function() {
            deleteProject(project);
            console.log("delete");
            createDisplay(content);
        })

        //give the project item a child div to contain expanded info and inputs
        const expandProj = document.createElement("div");
        expandProj.className = "expand-proj";
        expandProj.setAttribute("expanded", "true");
        proj.appendChild(expandProj);

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

//FUNCTION TO DISPLAY FURTHER DETAILS ABOUT PROJECT
function displayProjectDetails(projDetails, project) {
    //remove existing content
    removeAllChildNodes(projDetails);
    
    //display top content of details section
    const detailsTitle = document.createElement("h4");
    detailsTitle.textContent = "Project Details";
    projDetails.appendChild(detailsTitle);
    
    const details = document.createElement("ul");
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
    if (project.completed == true) {
        completion.textContent = 'Completed: Yes';
    }
    else {
        completion.textContent = "Completed: No";
    }
    details.appendChild(completion);
}

//FUNCTION TO DISPLAY LIST OF TASKS FOR PROJECT
function displayTaskList(proj, project) {
    //display top content of task list
    const taskListTitle = document.createElement("h4");
    taskListTitle.textContent = "Tasks";
    proj.appendChild(taskListTitle);

    //create a form to add a new task and add it to the expanded section

    const addProjBtn = document.createElement("button");
    addProjBtn.textContent = "New Task";
    proj.appendChild(addProjBtn)

    const taskModal = newTaskModal(proj, project);

    addProjBtn.addEventListener("click", function() {
            taskModal.showModal();
        })

    //displayNewTaskForm(proj, project);
    
    //generate table of current tasks
    const taskTable = document.createElement("table");
    proj.appendChild(taskTable);
    const taskHeader = document.createElement("thead");
    taskTable.appendChild(taskHeader);

    const titleHeader = document.createElement("th");
    const dueDateHeader = document.createElement("th");
    const completeHeader = document.createElement("th");

    titleHeader.textContent = "Title";
    dueDateHeader.textContent = "Due Date";
    completeHeader.textContent = "Actions";

    taskHeader.appendChild(titleHeader);
    taskHeader.appendChild(dueDateHeader);
    taskHeader.appendChild(completeHeader);

    //add tasks to table    
    addTableTasks(taskTable, project);

}

//FUNCTION FOR GENERATING AND DISPLAYING A FORM TO CREATE A NEW TASK
// function displayNewTaskForm(proj, project) {
//     const newTaskForm = document.createElement("form");
//     newTaskForm.className = "new-task";
//     proj.appendChild(newTaskForm);
    
//     const newTaskButton = document.createElement("button");
//     newTaskButton.textContent = "New Task";
//     newTaskButton.setAttribute("type", "submit");
//     newTaskForm.appendChild(newTaskButton);

//     const newTaskTitle = document.createElement("input");
//     newTaskTitle.setAttribute("type", "text");
//     newTaskTitle.setAttribute("name", "add-title");
//     newTaskTitle.setAttribute("value", "Task Title");
//     newTaskTitle.setAttribute("minlength", "0");
//     newTaskTitle.setAttribute("maxlength", "20");
//     newTaskTitle.required = true;
//     newTaskForm.appendChild(newTaskTitle);

//     const newTaskDescription = document.createElement("input");
//     newTaskDescription.setAttribute("type", "text");
//     newTaskDescription.setAttribute("name", "add-description");
//     newTaskDescription.setAttribute("value", "Task Description");
//     newTaskTitle.setAttribute("minlength", "0");
//     newTaskTitle.setAttribute("maxlength", "50");
//     newTaskForm.appendChild(newTaskDescription);

//     const newTaskDueDate = document.createElement("input");
//     newTaskDueDate.setAttribute("type", "date");
//     newTaskDueDate.setAttribute("name", "add-due-date");
//     newTaskDueDate.setAttribute("value", "Task Due Date");
//     newTaskForm.appendChild(newTaskDueDate);

//     const newTaskPriority = document.createElement("input");
//     newTaskPriority.setAttribute("type", "number");
//     newTaskPriority.setAttribute("name", "add-priority");
//     newTaskPriority.setAttribute("value", "Task Priority");
//     newTaskPriority.setAttribute("min", "1");
//     newTaskPriority.setAttribute("max", "5");
//     newTaskForm.appendChild(newTaskPriority);

//     const newTaskNotes = document.createElement("input");
//     newTaskNotes.setAttribute("type", "text");
//     newTaskNotes.setAttribute("name", "add-notes");
//     newTaskNotes.setAttribute("value", "Task Notes");
//     newTaskNotes.setAttribute("minlength", "0");
//     newTaskNotes.setAttribute("maxlength", "50");
//     newTaskForm.appendChild(newTaskNotes);
    
//     newTaskButton.addEventListener("click", function() {
//         event.preventDefault();

//         const formData = new FormData(newTaskForm);
//         const title = formData.get('add-title');
//         const description = formData.get('add-description');
//         const dueDate = formData.get('add-due-date');
//         const priority = formData.get('add-priority');
//         const notes = formData.get('add-notes');

//         createTask(project, title, description, dueDate, priority, notes);

//         console.log(project.taskList);
        
//         createDisplay(content);
//     })
// }

//FUNCTION FOR ADDING EACH TASK TO THE TABLE
function addTableTasks(taskTable, project) {
    for (let task of project.taskList) {

        const taskRow = document.createElement("tr");
        // taskRow.setAttribute("completed", "false");
        taskTable.appendChild(taskRow);

        if (task.completed == true) {
            taskRow.setAttribute("completed", "true");
        }
        else {
            taskRow.setAttribute("completed", "false");
        }

        const expandTaskRow = document.createElement("tr");
        expandTaskRow.setAttribute("expanded", "false");
        expandTaskRow.className = "expand-task";
        taskTable.appendChild(expandTaskRow);

        const taskDetails = document.createElement("td");
        // taskDetails.textContent = "hello";
        expandTaskRow.appendChild(taskDetails);
        taskDetails.setAttribute("colspan", "3");

        const taskDescription = document.createElement("ul");
        const taskPriority = document.createElement("ul");
        const taskNotes = document.createElement("ul");

        taskDescription.textContent = "Description: " + task.description;
        taskPriority.textContent = "Priority: " + task.priority;
        taskNotes.textContent = "Notes: " + task.notes;

        taskDetails.appendChild(taskDescription);
        taskDetails.appendChild(taskPriority);
        taskDetails.appendChild(taskNotes);

        const taskTitle = document.createElement("td");
        taskTitle.textContent = task.title;
        taskRow.appendChild(taskTitle);

        const taskDueDate = document.createElement("td");
        taskDueDate.textContent = task.dueDate;
        taskRow.appendChild(taskDueDate);

        const taskActions = document.createElement("td");
        taskRow.appendChild(taskActions);
    

        const expandTaskBtn = document.createElement("button");
        expandTaskBtn.className = "expand-button";
        expandTaskBtn.textContent = "Expand";
        taskActions.appendChild(expandTaskBtn);

        expandTaskBtn.addEventListener("click", () => {
            if (expandTaskRow.getAttribute("expanded") == "true") {
                console.log("expanded");
                expandTaskRow.setAttribute("expanded", "false");
            }
            else if (expandTaskRow.getAttribute("expanded") == "false") {
                console.log("not expanded");
                expandTaskRow.setAttribute("expanded", "true");
            }
        });

        //create an edit button and modal for the task

        const editTaskBtn = document.createElement("button");
        editTaskBtn.className = "edit-button";
        editTaskBtn.textContent = "Edit";
        taskActions.appendChild(editTaskBtn);

        const taskModal = editTaskModal(taskRow, task);

        editTaskBtn.addEventListener("click", function() {
            taskModal.showModal();
        })

        //create a button to mark the task complete
        const completeTaskBtn = document.createElement("button");
        completeTaskBtn.className = "task-button";
        completeTaskBtn.textContent = "Complete";
        taskActions.appendChild(completeTaskBtn);
        completeTaskBtn.addEventListener("click", function() {
            markTaskAsComplete(task);
            if (task.completed == true) {
                taskRow.setAttribute("completed", "true");
            }
            else if (task.completed == false) {
                taskRow.setAttribute("completed", "false");
            }
            console.log(project.taskList);
        });

        //create a button to delete the task
        const deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.className = "delete-button";
        deleteTaskBtn.textContent = "Delete";
        taskActions.appendChild(deleteTaskBtn);
        deleteTaskBtn.addEventListener("click", function() {
            deleteTask(project, task);
            console.log("delete");
            createDisplay(content);
        })



    }
}

// FUNCTION FOR CREATING A MODAL FOR EDITING PROJECTS
function editProjectModal(proj, project) {
    const projectModal = document.createElement("dialog");
    projectModal.className = "project-modal";

    const projectModalHeader = document.createElement("h3");
    projectModalHeader.textContent = "Edit Project";
    projectModal.appendChild(projectModalHeader);
    
    const addProjectSection = document.createElement("form");
    addProjectSection.setAttribute("class", "edit-project");
    projectModal.appendChild(addProjectSection);
    // addProjectSection.innerHTML = "<h3>Edit New Project</h3>"

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
    addTitle.setAttribute("minlength", "0");
    addTitle.setAttribute("maxlength", "20");
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
    addDescription.setAttribute("minlength", "0");
    addDescription.setAttribute("maxlength", "50");
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
    addDueDate.setAttribute("type", "date");
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
    addNotes.setAttribute("minlength", "0");
    addNotes.setAttribute("maxlength", "100");
    notesInputLabel.appendChild(addNotes);

    //add submit button
    const addProjectButton = document.createElement("button");
    addProjectButton.textContent = "Edit Project";
    addProjectButton.setAttribute("type", "submit");
    addProjectSection.appendChild(addProjectButton);

    const closeModalBtn = document.createElement("button");
    closeModalBtn.textContent = "Cancel";
    closeModalBtn.setAttribute("type", "submit");
    addProjectSection.appendChild(closeModalBtn);
    closeModalBtn.addEventListener("click", function() {
        projectModal.close();
    })

    addProjectButton.addEventListener("click", function() {
        event.preventDefault();

        const formData = new FormData(addProjectSection);
        const title = formData.get('add-title');
        const description = formData.get('add-description');
        const dueDate = formData.get('add-due-date');
        const notes = formData.get('add-notes');

        editProject(project, title, description, dueDate, notes);

        console.log(projects);
        
        createDisplay(content);
    })


    proj.appendChild(projectModal);

    return projectModal;
}

//FUNCTION FOR CREATING A MODAL FOR CREATING NEW TASKS
function newTaskModal(proj, project) {
    const taskModal = document.createElement("dialog");
    taskModal.className = "project-modal";

    const taskModalHeader = document.createElement("h3");
    taskModalHeader.textContent = "Add New Task";
    taskModal.appendChild(taskModalHeader);
    
    const newTaskForm = document.createElement("form");
    newTaskForm.className = "new-task";
    taskModal.appendChild(newTaskForm);

    //add title
    const titleInputLabel = document.createElement("div");
    titleInputLabel.className = "input-label";
    newTaskForm.appendChild(titleInputLabel);

    const addTitleLabel = document.createElement("label");
    addTitleLabel.setAttribute("for", "add-title");
    addTitleLabel.textContent = "Task Title";
    titleInputLabel.appendChild(addTitleLabel);
    
    const newTaskTitle = document.createElement("input");
    newTaskTitle.setAttribute("type", "text");
    newTaskTitle.setAttribute("name", "add-title");
    // newTaskTitle.setAttribute("value", "Task Title");
    newTaskTitle.setAttribute("minlength", "0");
    newTaskTitle.setAttribute("maxlength", "20");
    newTaskTitle.required = true;
    titleInputLabel.appendChild(newTaskTitle);

    //add description
    const descriptionInputLabel = document.createElement("div");
    descriptionInputLabel.className = "input-label";
    newTaskForm.appendChild(descriptionInputLabel);

    const addDescriptionLabel = document.createElement("label");
    addDescriptionLabel.setAttribute("for", "add-title");
    addDescriptionLabel.textContent = "Task Description";
    descriptionInputLabel.appendChild(addDescriptionLabel);

    const newTaskDescription = document.createElement("input");
    newTaskDescription.setAttribute("type", "text");
    newTaskDescription.setAttribute("name", "add-description");
    // newTaskDescription.setAttribute("value", "Task Description");
    newTaskDescription.setAttribute("minlength", "0");
    newTaskDescription.setAttribute("maxlength", "50");
    descriptionInputLabel.appendChild(newTaskDescription);

    //add due date
    const dueDateInputLabel = document.createElement("div");
    dueDateInputLabel.className = "input-label";
    newTaskForm.appendChild(dueDateInputLabel);

    const addDueDateLabel = document.createElement("label");
    addDueDateLabel.setAttribute("for", "add-title");
    addDueDateLabel.textContent = "Task Due Date";
    dueDateInputLabel.appendChild(addDueDateLabel);

    const newTaskDueDate = document.createElement("input");
    newTaskDueDate.setAttribute("type", "date");
    newTaskDueDate.setAttribute("name", "add-due-date");
    newTaskDueDate.setAttribute("value", "Task Due Date");
    dueDateInputLabel.appendChild(newTaskDueDate);

    //add priority
    const priorityInputLabel = document.createElement("div");
    priorityInputLabel.className = "input-label";
    newTaskForm.appendChild(priorityInputLabel);

    const addPriorityLabel = document.createElement("label");
    addPriorityLabel.setAttribute("for", "add-title");
    addPriorityLabel.textContent = "Task Priority";
    priorityInputLabel.appendChild(addPriorityLabel);

    const newTaskPriority = document.createElement("input");
    newTaskPriority.setAttribute("type", "number");
    newTaskPriority.setAttribute("name", "add-priority");
    newTaskPriority.setAttribute("value", "Task Priority");
    newTaskPriority.setAttribute("min", "1");
    newTaskPriority.setAttribute("max", "5");
    priorityInputLabel.appendChild(newTaskPriority);

    //add notes
    const notesInputLabel = document.createElement("div");
    notesInputLabel.className = "input-label";
    newTaskForm.appendChild(notesInputLabel);

    const addNotesLabel = document.createElement("label");
    addNotesLabel.setAttribute("for", "add-title");
    addNotesLabel.textContent = "Task Notes";
    notesInputLabel.appendChild(addNotesLabel);

    const newTaskNotes = document.createElement("input");
    newTaskNotes.setAttribute("type", "text");
    newTaskNotes.setAttribute("name", "add-notes");
    newTaskNotes.setAttribute("value", "Task Notes");
    newTaskNotes.setAttribute("minlength", "0");
    newTaskNotes.setAttribute("maxlength", "50");
    notesInputLabel.appendChild(newTaskNotes);

    const newTaskButton = document.createElement("button");
    newTaskButton.textContent = "New Task";
    newTaskButton.setAttribute("type", "submit");
    newTaskForm.appendChild(newTaskButton);
    
    newTaskButton.addEventListener("click", function() {
        event.preventDefault();

        const formData = new FormData(newTaskForm);
        const title = formData.get('add-title');
        const description = formData.get('add-description');
        const dueDate = formData.get('add-due-date');
        const priority = formData.get('add-priority');
        const notes = formData.get('add-notes');

        createTask(project, title, description, dueDate, priority, notes);

        console.log(project.taskList);
        
        createDisplay(content);
    })

    const closeModalBtn = document.createElement("button");
    closeModalBtn.textContent = "Cancel";
    closeModalBtn.setAttribute("type", "submit");
    newTaskForm.appendChild(closeModalBtn);
    closeModalBtn.addEventListener("click", function() {
        taskModal.close();
    })


    proj.appendChild(taskModal);

    return taskModal;
}

//FUNCITON FOR CREATING A MODAL FOR EDITING TASKS
function editTaskModal(taskRow, task) {
    const taskModal = document.createElement("dialog");
    taskModal.className = "project-modal";
    
    const newTaskForm = document.createElement("form");
        taskModal.appendChild(newTaskForm);

        //REPLACE FROM HERE
        
        //add title
    const titleInputLabel = document.createElement("div");
    titleInputLabel.className = "input-label";
    newTaskForm.appendChild(titleInputLabel);

    const addTitleLabel = document.createElement("label");
    addTitleLabel.setAttribute("for", "add-title");
    addTitleLabel.textContent = "Task Title";
    titleInputLabel.appendChild(addTitleLabel);
    
    const newTaskTitle = document.createElement("input");
    newTaskTitle.setAttribute("type", "text");
    newTaskTitle.setAttribute("name", "add-title");
    // newTaskTitle.setAttribute("value", "Task Title");
    newTaskTitle.setAttribute("minlength", "0");
    newTaskTitle.setAttribute("maxlength", "20");
    newTaskTitle.required = true;
    titleInputLabel.appendChild(newTaskTitle);

    //add description
    const descriptionInputLabel = document.createElement("div");
    descriptionInputLabel.className = "input-label";
    newTaskForm.appendChild(descriptionInputLabel);

    const addDescriptionLabel = document.createElement("label");
    addDescriptionLabel.setAttribute("for", "add-title");
    addDescriptionLabel.textContent = "Task Description";
    descriptionInputLabel.appendChild(addDescriptionLabel);

    const newTaskDescription = document.createElement("input");
    newTaskDescription.setAttribute("type", "text");
    newTaskDescription.setAttribute("name", "add-description");
    // newTaskDescription.setAttribute("value", "Task Description");
    newTaskDescription.setAttribute("minlength", "0");
    newTaskDescription.setAttribute("maxlength", "50");
    descriptionInputLabel.appendChild(newTaskDescription);

    //add due date
    const dueDateInputLabel = document.createElement("div");
    dueDateInputLabel.className = "input-label";
    newTaskForm.appendChild(dueDateInputLabel);

    const addDueDateLabel = document.createElement("label");
    addDueDateLabel.setAttribute("for", "add-title");
    addDueDateLabel.textContent = "Task Due Date";
    dueDateInputLabel.appendChild(addDueDateLabel);

    const newTaskDueDate = document.createElement("input");
    newTaskDueDate.setAttribute("type", "date");
    newTaskDueDate.setAttribute("name", "add-due-date");
    newTaskDueDate.setAttribute("value", "Task Due Date");
    dueDateInputLabel.appendChild(newTaskDueDate);

    //add priority
    const priorityInputLabel = document.createElement("div");
    priorityInputLabel.className = "input-label";
    newTaskForm.appendChild(priorityInputLabel);

    const addPriorityLabel = document.createElement("label");
    addPriorityLabel.setAttribute("for", "add-title");
    addPriorityLabel.textContent = "Task Priority";
    priorityInputLabel.appendChild(addPriorityLabel);

    const newTaskPriority = document.createElement("input");
    newTaskPriority.setAttribute("type", "number");
    newTaskPriority.setAttribute("name", "add-priority");
    newTaskPriority.setAttribute("value", "Task Priority");
    newTaskPriority.setAttribute("min", "1");
    newTaskPriority.setAttribute("max", "5");
    priorityInputLabel.appendChild(newTaskPriority);

    //add notes
    const notesInputLabel = document.createElement("div");
    notesInputLabel.className = "input-label";
    newTaskForm.appendChild(notesInputLabel);

    const addNotesLabel = document.createElement("label");
    addNotesLabel.setAttribute("for", "add-title");
    addNotesLabel.textContent = "Task Notes";
    notesInputLabel.appendChild(addNotesLabel);

    const newTaskNotes = document.createElement("input");
    newTaskNotes.setAttribute("type", "text");
    newTaskNotes.setAttribute("name", "add-notes");
    newTaskNotes.setAttribute("value", "Task Notes");
    newTaskNotes.setAttribute("minlength", "0");
    newTaskNotes.setAttribute("maxlength", "50");
    notesInputLabel.appendChild(newTaskNotes);

    const newTaskButton = document.createElement("button");
    newTaskButton.textContent = "Edit Task";
    newTaskButton.setAttribute("type", "submit");
    newTaskForm.appendChild(newTaskButton);

        //REPLACE TO HERE
        
        newTaskButton.addEventListener("click", function() {
            event.preventDefault();
    
            const formData = new FormData(newTaskForm);
            const title = formData.get('add-title');
            const description = formData.get('add-description');
            const dueDate = formData.get('add-due-date');
            const priority = formData.get('add-priority');
            const notes = formData.get('add-notes');
    
            editTask(task, title, description, dueDate, priority, notes);
            
            createDisplay(content);
        })

        const closeModalBtn = document.createElement("button");
        closeModalBtn.textContent = "Cancel";
        closeModalBtn.setAttribute("type", "submit");
        newTaskForm.appendChild(closeModalBtn);
        closeModalBtn.addEventListener("click", function() {
            taskModal.close();
        })


    taskRow.appendChild(taskModal);

    return taskModal;
}

//FUNCTION FOR REMOVING ALL CHILDREN OF A PARENT NODE
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export { Ui };