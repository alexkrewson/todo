import _ from 'lodash';
import './style.css';
import { printOnLoad, clearContent, summonTaskInputs } from './print'
import { addTask, printAllTasks } from './task'
import { addProject } from './project'


printOnLoad()
printAllTasks()
var taskListDiv = document.getElementById('task-list-div');
var taskUl = document.getElementById('task-ul');
var contentDiv = document.getElementById('content-div');
var newTaskButton = document.getElementById('new-task-button')
// var kDiv = document.getElementById('task-div')



// var newProjectButton = document.getElementById('new-project-button')
// newProjectButton.addEventListener('click', addProject)



