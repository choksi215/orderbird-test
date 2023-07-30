import {Octokit} from "octokit"

function calculatePopularity(stars, forks){
    const score = stars + forks * 2;
    return score >=500
}

function displaySearchResults(data) {
    const searchResultsDiv = document.getElementById('searchResults');

    // You can perform a search using the query and display the results here
    // For this example, we'll just display the query as the result
    searchResultsDiv.innerHTML = `
    <div class="flex justify-center mt-6 md:px-32 py-8 w-full">
        <div class="shadow overflow-hidden rounded">
            <div class="bg-[#decff1] rounded-lg">
                <div class="flex flex-col space-y-3 p-5 text-gray-700">
                    <div class="flex justify-between">
                        <b class="w-1/3 text-left py-3 px-4">Repository Name: </b>
                        <span class="w-1/3 text-left py-3 px-4">${data.rName}</span>
                    </div>
                    <div class="flex justify-between">
                        <b class="w-1/3 text-left py-3 px-4">Repository Autor:</b>
                        <span class="w-1/3 text-left py-3 px-4">${data.rAutor}</span>
                    </div>
                    <div class="flex justify-between">
                        <b class="w-1/3 text-left py-3 px-4">Stars:</b>
                        <span class="w-1/3 text-left py-3 px-4">${data.rStars}</span>
                    </div>
                    <div class="flex justify-between">
                        <b class="w-1/3 text-left py-3 px-4">Forks:</b>
                        <span class="w-1/3 text-left py-3 px-4">${data.rForks}</span>
                    </div>
                    <div class="flex justify-between">
                        <b class="w-1/3 text-left py-3 px-4">Popularity:</b>
                        <span class="w-1/3 text-left py-3 px-4">${data.rPopularity}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function repoListDTO(rList) {
    const repo = rList.data.items[0];

    const rName = repo.name;
    const rAutor = repo.owner.login;
    const rAvatarUrl = repo.owner.avatar_url;
    const rStars = repo.stargazers_count;
    const rForks = repo.forks;

    const rPopularity = calculatePopularity(rStars, rForks);

    displaySearchResults({
        rName,
        rAutor,
        rAvatarUrl,
        rStars,
        rForks,
        rPopularity
    })
}

async function fetchRepoData(name) {
    const octokit = new Octokit({ auth: process.env.AUTH_GITHUB_KEY });

    const repoList = await octokit.request(`GET /search/repositories?q=${name}`, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    console.log(repoList)

    // repoList va poi passato ad una funzione di retrieve dei dati, che poi verranno passati ad una funzione di visualization.
    repoListDTO(repoList)
}


function handleSubmit(event) {
    event.preventDefault(); 
    const searchQuery = document.getElementById('searchInput').value;
    if(searchQuery==="") return 
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