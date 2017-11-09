import { getJSON } from '../helpers/index';
import { GITHUB_URL } from '../constants';

//display number of commits for specific repository on Repo page
export const getCommits = (userName, repoName) => fetch(`${GITHUB_URL}/repos/${userName}/${repoName}/commits`).then(getJSON).catch((error) => console.log(error));
//display commits (author, message) of specific repository on Repo page
export const getTree = (userName, repoName, commit) => fetch(`${GITHUB_URL}/repos/${userName}/${repoName}/git/trees/${commit.sha}`).then(getJSON).catch((error) => console.log(error));

export const getCommitsFor = (userName, repoName, commitSha) => fetch(`${GITHUB_URL}/repos/${userName}/${repoName}/commits/${commitSha}`).then(getJSON).then((result) => console.log(result).catch((error) => console.log(error)));
