const projectForm = document.querySelector("form"); // lagt variable project form element
const projectInput = document.getElementById("project-input");
const projectListUL = document.getElementById("project-list");

let allProjects = getProjects(); // lagt array for all projects
updateProjectList(); // kalle funksjon for å oppdatere projectlist

projectForm.addEventListener("submit", function (e) {
  // ved brukt av event: preventDefault()method
  e.preventDefault(); //(for å laste inn siden på nytt)
  addProject(); //brukt funksjon, å legge til en ny project!
});

function addProject() {
  //seperate function / lage variable projecttext
  const projectText = projectInput.value.trim(); //project-text fra inndatafeltet og trim mellomrom
  if (projectText.length > 0) {
    //Fortsette kun hvis input ikke er tom!
    // ved brukt av if condition!
    const projectObject = {
      // nye project object!
      text: projectText,
      completed: false,
    };
    allProjects.push(projectObject); //brukt av push method
    updateProjectList(); //oppdatere projectlist
    saveProjects(); //lagre den oppdatert prolist av project til lokal lagring!
    projectInput.value = "";
  }
}
function updateProjectList() {
  //oppdatere alle project list!
  projectListUL.innerHTML = "";
  allProjects.forEach((project, projectIndex) => {
    //gjennom hvert projectitem
    projectItem = createProjectItem(project, projectIndex);
    projectListUL.append(projectItem); // opprette projectitem til Unorderd list!
  });
}
function createProjectItem(project, projectIndex) {
  // lage ny project list item !
  const projectId = "project-" + projectIndex;
  const projectLI = document.createElement("li");
  const projectText = project.text;
  projectLI.className = "project";
  // HTML-en til LI-elementet
  projectLI.innerHTML = `  
        <input type="checkbox" id="${projectId}">
        <label class="custom-checkbox" for="${projectId}">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${projectId}" class="project-text"> 
            ${projectText} 
        </label>
        <button class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
    `;
  const deleteButton = projectLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteProjectItem(projectIndex);
  });
  const checkbox = projectLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    // Legg til eventlistner for endring av avmerkingsboks!
    allProjects[projectIndex].completed = checkbox.checked;
    saveProjects();
  });
  checkbox.checked = project.completed;
  return projectLI; // returnere
}
function deleteProjectItem(projectIndex) {
  allProjects = allProjects.filter((_, i) => i !== projectIndex); //fjerne den projectitem fra array!
  saveProjects(); //lagre
  updateProjectList(); // og oppdatere!
}
function saveProjects() {
  // for å lagre data: ved brukt av local storage property
  const projectsJson = JSON.stringify(allProjects); //Konvertere projects til en JSON-stirng!
  localStorage.setItem("projects", projectsJson); // ved brukt av setItem ( to parameter (Key og String))
}
function getProjects() {
  const projects = localStorage.getItem("projects") || "[]";
  return JSON.parse(projects); // Parse JSON-string og returner array med projects
}
