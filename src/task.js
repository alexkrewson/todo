// var taskListDiv = document.getElementById('task-list-div');
import { printOnLoad, clearContent, makeDomThing, makeInput, printTop, printBottom  } from './print'



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
    // var _taskListDiv = document.getElementById('task-list-div');
    var _index = document.activeElement.parentNode.parentNode.id;
    var _task = taskList[_index]
    taskList.splice(_index,1);
    
    
}

const toggleCompletion = () => {
    var _index = document.activeElement.parentNode.parentNode.id;
    var _task = taskList[_index]
    var completeButton = document.getElementById('task-complete-button');
    if (_task.status == 'completed') {
        _task.status = 'not completed';
        completeButton.innerHTML = 'done'
        // completeButton.setAttribute('class', 'not-completed');
    } else {
        _task.status = 'completed';
        completeButton.innerHTML = 'undo'
        // completeButton.setAttribute('class', 'completed');
    }
    console.log(_task.title)
    console.log(_task.status)
    // console.log('toggleCompletion works?')

}


const printTask = (task) => {
    var taskListDiv = document.getElementById('task-list-div');
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

    // var completeButton = document.createElement('button');
    // completeButton.id = 'task-complete-button'
    completeButton.addEventListener('click', () => {
        toggleCompletion();
        clearContent(taskListDiv);
        printAllTasks();
    });
    // completeButton.innerHTML = 'done'

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


    // var descriptionColumn = document.createElement('div');
    // descriptionColumn.innerHTML = task.description;
    // var dueDateColumn = document.createElement('div');
    // dueDateColumn.innerHTML = task.dueDate;
    // var priorityColumn = document.createElement('div');
    // priorityColumn.innerHTML = task.priority;
    // var notesColumn = document.createElement('div');
    // notesColumn.innerHTML = task.notes;
    // var projectColumn = document.createElement('div');
    // projectColumn.innerHTML = task.project;


    newRow.appendChild(titleColumn);
    newRow.appendChild(controlColumn);
    // newRow.appendChild(descriptionColumn)

    // newRow.appendChild(dueDateColumn)

    // newRow.appendChild(priorityColumn)

    // newRow.appendChild(notesColumn)

    // newRow.appendChild(projectColumn)

    taskListDiv.appendChild(newRow)
}

const printAllTasks = () => {
    // var taskListDiv = document.getElementById('task-list-div');
    // var taskHeaders = {title: "TITLE"};
    // printTask(taskHeaders);
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
        // printOnLoad()
        // clearContent(taskListDiv);
        printBottom();
        printAllTasks();
        // summonTaskInputs();
    });

}

export { addTask, removeTask, printAllTasks }