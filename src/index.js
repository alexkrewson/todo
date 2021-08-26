import _ from 'lodash';
// import './style.css';
import './sassystyle.scss';
import { printOnLoad, clearContent, summonTaskInputs, printTop } from './print'
import { addTask, printAllTasks, printTaskBottom, displayTaskTab, taskList, taskFactory } from './task'
import { addProject, displayProjectTab, projectList } from './project'

// if (localStorage.getItem('task 1 title')) {
//     console.log('task 1 title')
//     var existingTaskArray = localStorage['task 1 title']
//     console.log(existingTaskArray)
// }

// if (localStorage.length > 0) {
//     // console.log(localStorage)
//     localStorage.keys.forEach(function (item) {
//         console.log(item)
//     });
// }

// taskList = []
// projectList = []
for (const key in localStorage) {
    // console.log(`${key}: ${localStorage.getItem(key)}`);
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






