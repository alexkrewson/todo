import { clearContent, makeDomThing, makeInput, printBottom } from "./print";
import { printAllTasks, taskList } from "./task";

var bottomDiv = document.createElement('div')

const getDomStuff = () => {
    bottomDiv = document.getElementById('bottom-div')
}

const projectFactory = (title, description, dueDate, priority, notes) => {
    return {
        title,
        description,
        dueDate,
        priority,
        notes
    }
}

const project1 = projectFactory('Survival', 'stay alive', 'Jan 1', 'high', 'no giving up');
const project2 = projectFactory('Career', 'get one it', 'Jan 1', 'moderate', 'you are so close');
// var projectList = [project1, project2];
var projectList = []

const addProject = () => {
    const projectTitleInput = document.getElementById('project-title-field').value;
    const projectDescriptionInput = document.getElementById('project-description-field').value;
    const projectDueDateInput = document.getElementById('project-duedate-field').value;
    const projectPriorityInput = document.getElementById('project-priority-field').value;
    const projectNotesInput = document.getElementById('project-notes-field').value;
    const newProject = projectFactory(projectTitleInput, projectDescriptionInput, projectDueDateInput, projectPriorityInput, projectNotesInput);
    projectList.push(newProject);
}

const printEditProject = (_index) => {
    var _project = projectList[_index]    
    var editFieldsDiv = makeDomThing('edit-project-fields-div', 'div', bottomDiv)
    editFieldsDiv.setAttribute('class', 'new-entry-div')
    var editFieldsInputs = makeDomThing('edit-project-fields-inputs', 'div', editFieldsDiv)
    editFieldsInputs.setAttribute('class', 'input-fields')

    var titleField = makeInput('edit-title-field-project', _project.title, editFieldsInputs);
    titleField.setAttribute('class', 'project-input-field')
    var descriptionField = makeInput('edit-description-field-project', _project.description, editFieldsInputs);
    descriptionField.setAttribute('class', 'project-input-field')
    var duedateField = makeInput('edit-duedate-field-project', _project.duedate, editFieldsInputs);
    duedateField.setAttribute('class', 'project-input-field')
    var priorityField = makeInput('edit-priority-field-project', _project.priority, editFieldsInputs);
    priorityField.setAttribute('class', 'project-input-field')
    var notesField = makeInput('edit-notes-field-project', _project.notes, editFieldsInputs);
    notesField.setAttribute('class', 'project-input-field')

    const submitEditButton = makeDomThing('project-submit-edit-button', 'button', editFieldsDiv);
    submitEditButton.innerHTML = 'Save Changes';
    submitEditButton.addEventListener('click', () => {
        editProject(_project);
        projectList.forEach(setStorage)
        clearContent(bottomDiv);
        createProjectDivs()
        printProjectInputs()
        printAllProjects();
    });
}

const editProject = (project) => {
    project.title = document.getElementById('edit-title-field-project').value;
    project.description = document.getElementById('edit-description-field-project').value;
    project.duedate = document.getElementById('edit-duedate-field-project').value;
    project.priority = document.getElementById('edit-priority-field-project').value;
    project.notes = document.getElementById('edit-notes-field-project').value;
}

const removeProject = () => {
    var _index = document.activeElement.parentNode.parentNode.id;
    var _project = projectList[_index]
    projectList.splice(_index, 1);
}

const printProjectProperties = (project) => {
    var propertiesDiv = makeDomThing('properties-div', 'div', bottomDiv)
    var propertyText = makeDomThing('property-text', 'h1', propertiesDiv)
    propertyText.innerHTML = 'Project: ' + project.title

    Object.keys(project).forEach(function (property) {
        var propertyRow = document.createElement('div')
        propertyRow.setAttribute('class', 'property-row')
        propertiesDiv.appendChild(propertyRow)
        var nameDiv = document.createElement('div')
        propertyRow.appendChild(nameDiv)
        var valueDiv = document.createElement('div')
        propertyRow.appendChild(valueDiv)
        nameDiv.innerHTML = _.startCase(property) + ':'
        valueDiv.innerHTML = project[property]
    });

}

const printProjectTasks = (thisProject) => {

    

    var projectTasksDiv = makeDomThing('project-tasks-div', 'div', bottomDiv)

    var projectTasksArray = []

    taskList.forEach(function (task) {
        if (_.startCase(task.project) == thisProject.title) {
            projectTasksArray.push(task)
        }
    })

    var projectTasksText = makeDomThing('project-tasks-text', 'h1', projectTasksDiv)
    projectTasksText.innerHTML = 'Tasks within this project:'

    projectTasksArray.forEach(function (task) {
        var projectTasksRow = makeDomThing('project-task-row', 'p', projectTasksDiv)
        projectTasksRow.innerHTML = _.startCase(task.title)
    })
}

const printProject = (project) => {
    var _index = projectList.indexOf(project)
    var projectListDiv = document.getElementById('project-list-div')
    var newRow = makeDomThing(projectList.indexOf(project), 'div', projectListDiv)
    newRow.setAttribute('class', 'project-row');
    var titleColumn = makeDomThing('project-title-column', 'div', newRow)
    var titleAnchor = makeDomThing('project-title-anchor', 'a', titleColumn)
    titleAnchor.innerHTML = project.title;
    titleAnchor.addEventListener('click', () => {
        clearContent(bottomDiv)
        printProjectProperties(project)
        printProjectTasks(project)
    });
    titleColumn.setAttribute('class', 'title-column');
    var controlColumn = makeDomThing('project-control-column', 'div', newRow)
    controlColumn.setAttribute('class', 'control-column')

    var editButton = makeDomThing('project-edit-button', 'button', controlColumn)
    editButton.addEventListener('click', () => {
        clearContent(bottomDiv)
        createProjectDivs()
        printEditProject(_index)
    });
    editButton.innerHTML = 'edit'

    var removeButton = makeDomThing('project-remove-button', 'button', controlColumn)
    removeButton.addEventListener('click', () => {
        removeProject();
        clearContent(bottomDiv);
        createProjectDivs()
        printProjectInputs()
        printAllProjects();
    });
    removeButton.innerHTML = 'remove'

}


const printAllProjects = () => {
    if (projectList.length > 0) {
        const projectListDiv = makeDomThing('project-list-div', 'div', bottomDiv);
        projectList.forEach(printProject);
    }
}

const printProjectInputs = () => {

    var newProjectDiv = document.getElementById('new-project-div')
    var titleField = makeInput('project-title-field', '', newProjectDiv);
    titleField.setAttribute('class', 'project-input-field')
    var descriptionField = makeInput('project-description-field', '', newProjectDiv);
    descriptionField.setAttribute('class', 'project-input-field')
    var duedateField = makeInput('project-duedate-field', '', newProjectDiv);
    duedateField.setAttribute('class', 'project-input-field')
    var priorityField = makeInput('project-priority-field', '', newProjectDiv);
    priorityField.setAttribute('class', 'project-input-field')
    var notesField = makeInput('project-notes-field', '', newProjectDiv);
    notesField.setAttribute('class', 'project-input-field')

    const newProjectButton = makeDomThing('new-project-button', 'button', newProjectDiv);
    newProjectButton.innerHTML = '+';
    newProjectButton.addEventListener('click', () => {
        addProject();
        projectList.forEach(setStorage)
        clearContent(bottomDiv);
        createProjectDivs()
        printProjectInputs()
        printAllProjects()
    });
}

const displayProjectTab = () => {
    getDomStuff()
    bottomDiv.setAttribute('class', 'project-tab-active')
    var taskTabDivContainer = document.getElementById('task-tab-div-container');
    taskTabDivContainer.setAttribute('class', 'back');
    var projectTabDivContainer = document.getElementById('project-tab-div-container');
    projectTabDivContainer.setAttribute('class', 'front');
    clearContent(bottomDiv)
    createProjectDivs()
    printProjectInputs()
    printAllProjects()
}


const createProjectDivs = () => {
    const newProjectDiv = makeDomThing('new-project-div', 'div', bottomDiv);
    newProjectDiv.setAttribute('class', 'input-fields')


}

const setStorage = (project) => {
    var index = projectList.indexOf(project)
    // console.log(index)
    var projectString = JSON.stringify(project)
    localStorage.setItem('project ' + index, projectString);
    // localStorage.setItem('task ' + index + ' description', task.description);
    
}

export { addProject, displayProjectTab, projectList }