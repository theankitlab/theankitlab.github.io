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


window.onload = async () => {
  const projectsContainer = document.getElementById('projectsContainer');
  projectsContainer.innerHTML = '<div class="loader"></div>';

  const response = await fetch('https://api.github.com/users/theankitlab/repos');
  const repos = await response.json();

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
            <p>${repo.forks} forks</p>
          </div>
        </div>
      </a>
    `;
  });
}