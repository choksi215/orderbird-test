import {Octokit} from "octokit"

async function fetchRepoData(name) {
    const octokit = new Octokit({ auth: process.env.AUTH_GITHUB_KEY });

    const repoList = await octokit.request(`GET /search/repositories?q=${name}`, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    console.log({repoList})

    // repoList va poi passato ad una funzione di retrieve dei dati, che poi verranno passati ad una funzione di visualization.
    // repoListDTO(await repoList)
}


function handleSubmit(event) {
    event.preventDefault(); 
    const searchQuery = document.getElementById('searchInput').value;
    fetchRepoData(searchQuery)
}

function submitListener() {
    document.getElementById('searchForm').addEventListener('submit', handleSubmit);
}

export function main() {
    submitListener();
    // const repoData = repoNameRequest(repoName);
    // appendRepoData(repoData);
}