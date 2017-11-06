import { getJSON } from '../helpers/index';
import { GITHUB_URL } from '../constants';

//display number of commits for specific repository on Repo page
export const getCommits = (userName, repoName) => {
    return fetch(`${GITHUB_URL}/repos/${userName}/${repoName}/commits`) // todo replace with GITHUB_URL
        .then(getJSON)
        .catch((error) => console.log(error));
}
//display commits (author, message) of specific repository on Repo page
export const getTree = (userName, repoName, commit) => {
    return fetch(`${GITHUB_URL}/repos/${userName}/${repoName}/git/trees/${commit.sha}`) // todo replace with GITHUB_URL
        .then(getJSON)
        .catch((error) => console.log(error));
}