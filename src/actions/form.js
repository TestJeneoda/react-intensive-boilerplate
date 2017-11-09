import { getJSON } from '../helpers/index';
import { GITHUB_URL } from '../constants';

//drop-down gitignore options in CreateRepo page
export const getGitignoreOptions = () => fetch(`${GITHUB_URL}/gitignore/templates`).then(getJSON).catch((e) => console.log(e));

//drop-down license options in CreateRepo page
export const getLicenseOptions = () =>
    fetch(`${GITHUB_URL}/licenses`, { headers:
        { 'Content-Type': 'application/vnd.github.korra-preview+json', Accept: 'application/vnd.github.drax-preview+json' }
    }).then(getJSON).catch((e) => console.log(e));
