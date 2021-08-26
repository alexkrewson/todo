import { printOnLoad, clearContent, makeDomThing, makeInput, printBottom } from './print'

var bottomDiv = document.createElement('div')
// const taskListDiv = makeDomThing('task-list-div', 'div', bottomDiv);
var taskListDiv = document.createElement('div')

const getDomStuff = () => {
    bottomDiv = document.getElementById('bottom-div')
    taskListDiv = document.getElementById('task-list-div')
}

const taskFactory = (title, description, dueDate, priority, notes, project) => {
    return {
        title,
        description,
        dueDate,
        priority,
        notes,
        project,
        status: 'not completed'
    }
}

const task1 = taskFactory('Get Groceries', 'drive to store, buy groceries, drive home, put groceries away', 'Jan 1', 'low', 'get yourself something nice', 'survival');
const task2 = taskFactory('Do Yoga', 'do it', 'Jan 1', 'moderate', 'be present', 'survival');
const task3 = taskFactory('Code', 'do it', 'Jan 1', 'moderate', 'be present', 'career');
// var taskList = [task1, task2, task3];
var taskList = [];


const addTask = () => {
    const taskTitleInput = document.getElementById('task-title-field').value;
    const taskDescriptionInput = document.getElementById('task-description-field').value;
    const taskDueDateInput = document.getElementById('task-duedate-field').value;
    const taskPriorityInput = document.getElementById('task-priority-field').value;
    const taskNotesInput = document.getElementById('task-notes-field').value;
    const taskProjectInput = document.getElementById('task-project-field').value;

    const newTask = taskFactory(taskTitleInput, taskDescriptionInput, taskDueDateInput, taskPriorityInput, taskNotesInput, taskProjectInput);
    taskList.push(newTask);
}

const removeTask = () => {
    var _index = document.activeElement.parentNode.parentNode.id;
    var _task = taskList[_index]
    taskList.splice(_index, 1);
}

const toggleCompletion = () => {
    var _index = document.activeElement.parentNode.parentNode.id;
    var _task = taskList[_index]
    var completeButton = document.getElementById('task-complete-button');
    if (_task.status == 'completed') {
        _task.status = 'not completed';
        completeButton.innerHTML = 'done'
    } else {
        _task.status = 'completed';
        completeButton.innerHTML = 'undo'
    }
}

const printTask = (task) => {
    // var taskListDiv = document.getElementById('task-list-div')
    var newRow = makeDomThing(taskList.indexOf(task), 'div', taskListDiv)
    newRow.setAttribute('class', 'task-row');
    var titleColumn = makeDomThing('task-title-column', 'div', newRow)
    titleColumn.innerHTML = task.title;
    var controlColumn = makeDomThing('task-control-column', 'div', newRow)
    controlColumn.setAttribute('class', 'control-column');
    var completeButton = makeDomThing('task-complete-button', 'button', controlColumn)
    titleColumn.setAttribute('class', 'title-column');

    if (task.status == 'completed') {
        titleColumn.classList.remove('not-completed)');
        titleColumn.classList.add('completed');
        completeButton.innerHTML = 'undo'
    } else {
        titleColumn.classList.remove('completed');
        titleColumn.classList.add('not-completed');
        completeButton.innerHTML = 'done'
    }

    completeButton.addEventListener('click', () => {
        toggleCompletion();
        clearContent(bottomDiv);
        createTaskDivs()
        printTaskInputs()
        printAllTasks();
    });

    var editButton = makeDomThing('task-edit-button', 'button', controlColumn)
    editButton.addEventListener('click', () => {
        clearContent(bottomDiv);
        createTaskDivs
        printEditTask(task);
    });
    editButton.innerHTML = 'edit'

    var removeButton = makeDomThing('task-remove-button', 'button', controlColumn)
    removeButton.addEventListener('click', () => {
        removeTask();
        clearContent(bottomDiv);
        createTaskDivs()
        printTaskInputs()
        printAllTasks();
    });
    removeButton.innerHTML = 'remove'
}

const printAllTasks = () => {
    if (taskList.length > 0) {
        taskListDiv = makeDomThing('task-list-div', 'div', bottomDiv);
        taskList.forEach(printTask);
    }
}

const editTask = (task) => {
    task.title = document.getElementById('edit-title-field-task').value;
    task.description = document.getElementById('edit-description-field-task').value;
    task.duedate = document.getElementById('edit-duedate-field-task').value;
    task.priority = document.getElementById('edit-priority-field-task').value;
    task.notes = document.getElementById('edit-notes-field-task').value;
    task.project = document.getElementById('edit-project-field-task').value;
}

const printEditTask = (_task) => {
    var editFieldsDiv = makeDomThing('edit-task-fields-div', 'div', bottomDiv)
    editFieldsDiv.setAttribute('class', 'new-entry-div')
    var editFieldsInputs = makeDomThing('edit-task-fields-inputs', 'div', editFieldsDiv)
    editFieldsInputs.setAttribute('class', 'input-fields')
    var titleInput = makeInput('edit-title-field-task', _task.title, editFieldsInputs);
    titleInput.setAttribute('class', 'task-input-field')
    var descriptionInput = makeInput('edit-description-field-task', _task.description, editFieldsInputs);
    descriptionInput.setAttribute('class', 'task-input-field')
    var duedateInput = makeInput('edit-duedate-field-task', _task.duedate, editFieldsInputs);
    duedateInput.setAttribute('class', 'task-input-field')
    var priorityInput = makeInput('edit-priority-field-task', _task.priority, editFieldsInputs);
    priorityInput.setAttribute('class', 'task-input-field')
    var notesInput = makeInput('edit-notes-field-task', _task.notes, editFieldsInputs);
    notesInput.setAttribute('class', 'task-input-field')
    var projectInput = makeInput('edit-project-field-task', _task.project, editFieldsInputs);
    projectInput.setAttribute('class', 'task-input-field')

    const submitEditButton = makeDomThing('task-submit-edit-button', 'button', editFieldsDiv);
    submitEditButton.innerHTML = 'Save Changes';
    submitEditButton.addEventListener('click', () => {
        editTask(_task);
        taskList.forEach(setStorage)
        clearContent(bottomDiv);
        createTaskDivs()
        printTaskInputs()
        printAllTasks();
    });
}

const displayTaskTab = () => {
    getDomStuff()
    var taskTabDivContainer = document.getElementById('task-tab-div-container');
    taskTabDivContainer.setAttribute('class', 'front');
    var projectTabDivContainer = document.getElementById('project-tab-div-container');
    projectTabDivContainer.setAttribute('class', 'back');
    // var bottomDiv = document.getElementById('bottom-div')
    bottomDiv.setAttribute('class', 'task-tab-active')


    clearContent(bottomDiv)
    createTaskDivs()
    printTaskInputs()
    printAllTasks()
}

const createTaskDivs = () => {
    // const bottomDiv = document.getElementById('bottom-div');
    const newTaskDiv = makeDomThing('new-task-div', 'div', bottomDiv);
    newTaskDiv.setAttribute('class', 'input-fields')

}

const printTaskInputs = () => {
    var newTaskDiv = document.getElementById('new-task-div')
    var titleField = makeInput('task-title-field', '', newTaskDiv);
    titleField.setAttribute('class', 'task-input-field')
    var descriptionField = makeInput('task-description-field', '', newTaskDiv);
    descriptionField.setAttribute('class', 'task-input-field')
    var duedateField = makeInput('task-duedate-field', '', newTaskDiv);
    duedateField.setAttribute('class', 'task-input-field')
    var priorityField = makeInput('task-priority-field', '', newTaskDiv);
    priorityField.setAttribute('class', 'task-input-field')
    var notesField = makeInput('task-notes-field', '', newTaskDiv);
    notesField.setAttribute('class', 'task-input-field')
    var projectField = makeInput('task-project-field', '', newTaskDiv);
    projectField.setAttribute('class', 'task-input-field')

    const newTaskButton = makeDomThing('new-task-button', 'button', newTaskDiv);
    const bottomDiv = document.getElementById('bottom-div')
    newTaskButton.innerHTML = '+';
    newTaskButton.addEventListener('click', () => {
        addTask();
        taskList.forEach(setStorage)
        clearContent(bottomDiv);
        createTaskDivs()
        printTaskInputs()
        printAllTasks();
    });
}

const setStorage = (task) => {
    var index = taskList.indexOf(task)
    // console.log(index)
    var taskString = JSON.stringify(task)
    localStorage.setItem('task ' + index, taskString);
    // localStorage.setItem('task ' + index + ' description', task.description);
    
}

export { addTask, removeTask, printAllTasks, displayTaskTab, taskList, taskFactory }