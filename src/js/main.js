import {Octokit} from "octokit"

function calculatePopularity(stars, forks) {
    // Calculating the popularity of the Repo
    const score = stars + forks * 2;
    return score >=500
}

function displaySearchResults(data) {
    const searchResultsDiv = document.getElementById('searchResults');

    // We Append the results here
    searchResultsDiv.innerHTML = `
    <div class="flex justify-center mt-6 md:px-32 py-8 w-full">
        <div class="shadow overflow-hidden rounded">
            <div class="bg-[#decff1] rounded-lg">
                <div class="flex flex-col space-y-3 p-5 text-gray-700 min-w-[340px]">
                    <div class="flex justify-between">
                        <img class="shadow-xl rounded-full align-middle border-none max-w-[150px] my-4 mx-auto" src="${data.rAvatarUrl}" alt"profile picture">
                    </div>
                    <div class="flex justify-between">
                        <b class="w-1/2 text-left py-3 px-4">Repository Name: </b>
                        <span class="w-1/2 text-right py-3 px-4">${data.rName}</span>
                    </div>
                    <div class="flex justify-between">
                        <b class="w-1/2 text-left py-3 px-4">Repository Autor:</b>
                        <span class="w-1/2 text-right py-3 px-4">${data.rAutor}</span>
                    </div>
                    <div class="flex justify-between">
                        <b class="w-1/2 text-left py-3 px-4">Stars:</b>
                        <span class="w-1/2 text-right py-3 px-4">${data.rStars}</span>
                    </div>
                    <div class="flex justify-between">
                        <b class="w-1/2 text-left py-3 px-4">Forks:</b>
                        <span class="w-1/2 text-right py-3 px-4">${data.rForks}</span>
                    </div>
                    <div class="flex justify-between">
                        <b class="w-1/2 text-left py-3 px-4">Popularity:</b>
                        <span class="w-1/2 text-right py-3 px-4">${data.rPopularity ? "Popular &#127881" : "Non popular &#128078"}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function repoListDTO(rList) {
    // We scrape the data from the initial object here
    const repo = rList.data.items[0];

    const rName = repo.name;
    const rAutor = repo.owner.login;
    const rAvatarUrl = repo.owner.avatar_url;
    const rStars = repo.stargazers_count;
    const rForks = repo.forks;

    // we pass the stars and the forks to the calculatePopularity function
    const rPopularity = calculatePopularity(rStars, rForks);
    // and pass it to the display function
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
    // Make the API request
    const octokit = new Octokit({ auth: process.env.AUTH_GITHUB_KEY });

    const repoList = await octokit.request(`GET /search/repositories?q=${name}`, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    // handle bed response
    if (!repoList.status === 200) {
        throw new Error('bad response');
    }

    // Handle empty obj
    if (repoList.data.items.length) {
        // we pass the response object to the DTO (data transfer object) function for scraping
        repoListDTO(repoList)
    } else {
        // we throw an error
        throw new Error('string invalid');
    }
}


function handleSubmit(event) {
    event.preventDefault(); 
    const searchQuery = document.getElementById('searchInput').value;
    // to exit when given an empty string
    if(searchQuery==="") return

    try {
        fetchRepoData(searchQuery)
    } catch(err) {
        console.log(err)
    }
}

function submitListener() {
    // submit listener for the search button
    document.getElementById('searchForm').addEventListener('submit', handleSubmit);
}

export function main() {
    submitListener();
}