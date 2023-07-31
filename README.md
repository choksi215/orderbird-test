# Project Name

Search repository wizard
A small single page app to get calcualte the popularity of a Github Repo.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Development](#development)
  - [Scripts](#scripts)
  - [Configuration](#configuration)
- [Next features](#next-features)
- [License](#license)

## Introduction

The goal is to create a single page application that consumes GitHub’s API, and after providing a repository name, displays the following information:
- Repository’s name and author
- Author’s profile picture
- Repository’s stars and forks
- Whether the repository is popular or not

## Getting Started

To get started we use yarn for this project.
- Download the project and type `yarn` into the terminal to download all the dependencies.

### Prerequisites

- yarn (latest version)
- node v19.1.0 (or above)
- generate a valid GitHub Access Token

### Installation
To ran the project locally:
- Go to github.com --> Settings --> Developer settings --> Personal access token --> Token (Classic) --> Generate new token.
- Duplicate the .env.example and rename it just .env
- Paste the previously generated token key in `AUTH_GITHUB_KEY`

## Development

project development

### Scripts
List down the npm or yarn scripts available for development, such as:

- `yarn`: Download the production-ready depenencies.
- `yarn dev`: Run the development environment with hot reloading.

### Configuration

The project uses the standard webpack configuration except for the .env files where we used the dotenv plugin, and
Octokit to fetch the Github API.

## Next Features

- We caould further develop it implementing a find-as-you-type feature to the searchbar.
- We caould add a feature to confront different repos to each other.
## License

This project is licensed under the [MIT License](LICENSE).
