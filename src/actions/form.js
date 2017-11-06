import { getJSON } from '../helpers/index';
import { GITHUB_URL } from '../constants';

//drop-down gitignore options in CreateRepo page
export const getGitignoreOptions = () => {
    return fetch(`${GITHUB_URL}/gitignore/templates`)
        .then(getJSON)
        .catch((e) => console.log(e));
}

//drop-down license options in CreateRepo page
export const getLicenseOptions = () => {
    return fetch(`${GITHUB_URL}/licenses`)
        .then(getJSON)
        .catch((e) => console.log(e));
}