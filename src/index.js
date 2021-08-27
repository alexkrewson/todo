import _ from 'lodash';
// import './style.css';
import './sassystyle.scss';
import { printOnLoad, clearContent, summonTaskInputs, printTop } from './print'
import { addTask, printAllTasks, printTaskBottom, displayTaskTab, taskList, taskFactory } from './task'
import { addProject, displayProjectTab, projectList } from './project'

for (const key in localStorage) {
    if (key.includes('task')) {
        var obj = JSON.parse(localStorage.getItem(key))
        console.log(obj)
        taskList.push(obj)

    }
    if (key.includes('project')) {
        var obj = JSON.parse(localStorage.getItem(key))
        console.log(obj)
        projectList.push(obj)

    }
}

printOnLoad()


displayTaskTab()






