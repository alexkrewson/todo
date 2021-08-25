import { clearContent, makeDomThing } from "./print";

var projectList = ['Survival', 'Career', 'Hobbies', 'Big Picture'];

const addProject = () => {
    const projectTitleInput = document.getElementById('project-title-field').value;
    const newProject = projectFactory(projectTitleInput);
    projectList.push(newProject);
    console.log('addProject works?')
    console.log(newProject.title)
    console.log(projectList.length)
}

const projectFactory = (title) => {
    return {
        title
    }
}

const displayProjects = () => {
    var bottomDiv = document.getElementById('bottom-div')
    bottomDiv.setAttribute('class', 'project-tab-active')
    var taskTabDivContainer = document.getElementById('task-tab-div-container');
    taskTabDivContainer.setAttribute('class', 'back');
    var projectTabDivContainer = document.getElementById('project-tab-div-container');
    projectTabDivContainer.setAttribute('class', 'front');
    clearContent(bottomDiv)
    // printBottom
}

export { addProject, displayProjects }