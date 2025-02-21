function openMenuDrawer() {
  document.getElementById('menuDrawer').style.display = "inline";
}

function closeMenuDrawer() {
  document.getElementById('menuDrawer').style.display = "none";
}

window.addEventListener("resize", function () {
  if (window.innerWidth > 600) {
    document.getElementById('menuDrawer').removeAttribute("style");
  }
});


window.onload = fetchProjects;

async function fetchProjects() {
  const projectsContainer = document.getElementById('projectsContainer');
  projectsContainer.innerHTML = '<div class="loader"></div>';

  try {
    const [response1, response2] = await Promise.all([
      fetch('projects.json'),
      fetch('https://api.github.com/users/theankitlab/repos'),
    ])

    const [myProjects, githubProjects] = await Promise.all([
      response1.json(),
      response2.json(),
    ])

    const repos = [
      ...myProjects,
      ...githubProjects
    ];

    projectsContainer.innerHTML = "";

    repos.forEach(repo => {

      // repo properties:-
      // name, html_url, created_at, updated_at, 
      // pushed_at, language, forks, open_issues, 
      // watchers, watchers_count

      projectsContainer.innerHTML += `
      <a href="${repo.html_url}" target="_blank" class="project">
        <h2>${repo.name}</h2>
        <p>Created At: ${repo.created_at}</p>
        <p>Updated At: ${repo.updated_at}</p>
        <div>
          <div>
            <img src="./public/eye.svg" alt="">
            <p>${repo.watchers} Watching</p>
          </div>
          <div>
            <img src="./public/code-branch.svg" alt="">
            <p>${repo.forks} Forks</p>
          </div>
        </div>
      </a>
    `;
    });
  } catch (e) {
    projectsContainer.innerHTML = `
      <div class="error" onclick="fetchProjects()">
        <h3>Oops!, something went wrong</h3>
        <p>${e.message}</p>
        <div>Try Again</div>
      </div>
    `
  }
}