import { getJSON } from '../helpers/index';
import { GITHUB_URL } from '../constants';

//display list of repositories in Profile page (repoName, description, language)
export const getRepos = (userName) => {
    return fetch(`${GITHUB_URL}/users/${userName}/repos`)
        .then(getJSON)
        .catch((e) => console.log(e));
}

/* .then((result) => {
 const reposData = result.map((item) => _.pick(item, this.fields));

 this.setState({ repos: reposData });
 })*/

// get repository, used on Repo page
export const getRepo = (userName, repoName) => {
    return fetch(`${GITHUB_URL}/repos/${userName}/${repoName}`)
        .then(getJSON)
        .catch((error) => console.log(error));
}