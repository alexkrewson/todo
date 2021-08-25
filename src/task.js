import { printOnLoad, clearContent, makeDomThing, makeInput, printBottom } from './print'


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
var taskList = [task1, task2];

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
    console.log(_task.title)
    console.log(_task.status)

}



const printTask = (task) => {
    var taskListDiv = document.getElementById('task-list-div')
    console.log(taskListDiv)
    var newRow = document.createElement('div');
    newRow.setAttribute('class', 'task-row');
    newRow.id = taskList.indexOf(task);
    var titleColumn = document.createElement('div');
    titleColumn.innerHTML = task.title;

    var completeButton = document.createElement('button');
    completeButton.id = 'task-complete-button'

    titleColumn.setAttribute('class', 'task-title-column');

    if (task.status == 'completed') {
        titleColumn.classList.remove('not-completed)');
        titleColumn.classList.add('completed');
        completeButton.innerHTML = 'undo'
    } else {
        titleColumn.classList.remove('completed');
        titleColumn.classList.add('not-completed');
        completeButton.innerHTML = 'done'
    }


    var controlColumn = document.createElement('div');
    controlColumn.setAttribute('class', 'task-control-column');

    completeButton.addEventListener('click', () => {
        toggleCompletion();
        clearContent(taskListDiv);
        printAllTasks();
    });

    var editButton = document.createElement('button');
    editButton.id = 'task-edit-button'
    editButton.addEventListener('click', printEditTask);
    editButton.innerHTML = 'edit'

    var removeButton = document.createElement('button');
    removeButton.id = 'task-remove-button'
    removeButton.addEventListener('click', () => {
        removeTask();
        clearContent(taskListDiv);
        printAllTasks();
    });
    removeButton.innerHTML = 'remove'

    controlColumn.appendChild(completeButton)
    controlColumn.appendChild(editButton)
    controlColumn.appendChild(removeButton)

    newRow.appendChild(titleColumn);
    newRow.appendChild(controlColumn);
    taskListDiv.appendChild(newRow)
}

const printAllTasks = () => {

    taskList.forEach(printTask);
}

const editTask = (task) => {
    task.title = document.getElementById('edit-title-field-task').value;
    task.description = document.getElementById('edit-description-field-task').value;
    task.duedate = document.getElementById('edit-duedate-field-task').value;
    task.priority = document.getElementById('edit-priority-field-task').value;
    task.notes = document.getElementById('edit-notes-field-task').value;
    task.project = document.getElementById('edit-project-field-task').value;
}

const printEditTask = () => {

    var _index = document.activeElement.parentNode.parentNode.id;
    var _task = taskList[_index]
    var bottomDiv = document.getElementById('bottom-div');
    clearContent(bottomDiv)
    makeInput('edit-title-field-task', _task.title, bottomDiv);
    makeInput('edit-description-field-task', _task.description, bottomDiv);
    makeInput('edit-duedate-field-task', _task.duedate, bottomDiv);
    makeInput('edit-priority-field-task', _task.priority, bottomDiv);
    makeInput('edit-notes-field-task', _task.notes, bottomDiv);
    makeInput('edit-project-field-task', _task.project, bottomDiv);

    const submitEditButton = makeDomThing('submit-edit-button', 'button', bottomDiv);
    submitEditButton.innerHTML = '+';
    submitEditButton.addEventListener('click', () => {
        editTask(_task);
        clearContent(bottomDiv);
        printBottom();
        printAllTasks();
    });

}

const displayTasks = () => {
    var taskTabDivContainer = document.getElementById('task-tab-div-container');
    taskTabDivContainer.setAttribute('class', 'front');
    var projectTabDivContainer = document.getElementById('project-tab-div-container');
    projectTabDivContainer.setAttribute('class', 'back');
    var bottomDiv = document.getElementById('bottom-div')
    bottomDiv.setAttribute('class', 'task-tab-active')

    clearContent(bottomDiv)
    createTaskDivs()
    printTaskInputs()
    printAllTasks()
}

const createTaskDivs = () => {
    const bottomDiv = document.getElementById('bottom-div');
    const newTaskDiv = makeDomThing('new-task-div', 'div', bottomDiv);
    const taskListDiv = makeDomThing('task-list-div', 'div', bottomDiv);
}

const printTaskInputs = () => {

    var newTaskDiv = document.getElementById('new-task-div')
    console.log(newTaskDiv)
    makeInput('task-title-field', '', newTaskDiv);
    makeInput('task-description-field', '', newTaskDiv);
    makeInput('task-duedate-field', '', newTaskDiv);
    makeInput('task-priority-field', '', newTaskDiv);
    makeInput('task-notes-field', '', newTaskDiv);
    makeInput('task-project-field', '', newTaskDiv);

    const newTaskButton = makeDomThing('new-task-button', 'button', newTaskDiv);
    newTaskButton.innerHTML = '+';
    newTaskButton.addEventListener('click', () => {
        addTask();
        clearContent(contentDiv);
        printOnLoad()
        printAllTasks();
    });
}
export { addTask, removeTask, printAllTasks, displayTasks }