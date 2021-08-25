var projectList = [];

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

export { addProject }