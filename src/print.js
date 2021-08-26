import { addTask, printAllTasks, displayTaskTab } from './task'
import { displayProjectTab } from './project'


const contentDiv = document.getElementById('content-div')

const makeDomThing = function (id, element, parent) {
    const newThing = document.createElement(element)
    newThing.id = id;
    parent.appendChild(newThing)
    return newThing
}

const clearContent = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}


const makeInput = (id, value, parent) => {
    const _container = makeDomThing('', 'div', parent);
    _container.setAttribute('class', 'input-container');
    const _str = id.split("-");
    const _field = makeDomThing(id, 'input', _container);
    _field.value = value;
    _field.name = _str[0] + '-' + _str[1];
    const _labelName = _str[0] + '-' + _str[1] + '-label';
    const _label = makeDomThing(_labelName, 'label', _container);
    _label.for = _labelName;
    _label.innerHTML = _.startCase(_str[1]);
    return _field;
}

const printTop = () => {
    const topDiv = document.getElementById('top-div')
    const taskTabDivContainer = makeDomThing('task-tab-div-container', 'div', topDiv)
    const taskTabDiv = makeDomThing('task-tab-div', 'div', taskTabDivContainer)
    const taskTab = makeDomThing('task-tab', 'a', taskTabDiv)
    taskTab.innerHTML = 'Tasks';
    taskTab.addEventListener('click', () => {
        clearContent(topDiv)
        printTop()
        displayTaskTab()
    });
    const projectTabDivContainer = makeDomThing('project-tab-div-container', 'div', topDiv)


    const projectTabDiv = makeDomThing('project-tab-div', 'div', projectTabDivContainer)
    const projectTab = makeDomThing('project-tab', 'a', projectTabDiv)
    // const bottomDiv = document.getElementById('bottom-div')
    projectTab.innerHTML = 'Projects';
    projectTab.addEventListener('click', () => {
        clearContent(topDiv)
        printTop()
        displayProjectTab()
    });
}

const printBottom = () => {

    const bottomDiv = document.getElementById('bottom-div')

    const newTaskDiv = makeDomThing('new-task-div', 'div', bottomDiv);

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



    const taskListDiv = makeDomThing('task-list-div', 'div', bottomDiv);

}


const printOnLoad = () => {

    const topDiv = makeDomThing('top-div', 'div', contentDiv)
    topDiv.setAttribute('class', 'task-tab-active')
    const bottomDiv = makeDomThing('bottom-div', 'div', contentDiv)
    bottomDiv.setAttribute('class', 'task-tab-active')


    printTop()

    // printBottom()

}









export { printOnLoad, clearContent, makeDomThing, makeInput, printTop, printBottom }