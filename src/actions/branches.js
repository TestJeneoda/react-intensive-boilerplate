import { getJSON } from '../helpers/index';
import { GITHUB_URL } from '../constants';

//display branches of specific repository on Repo page
export const getBranches = (userName, repoName) => fetch(`https://api.github.com/repos/${userName}/${repoName}/branches`).then(getJSON).catch((error) => console.log(error));

export const getBranch = (userName, repo, branch) => {
    const requiredBranch = branch || repo.default_branch;

    return fetch(`${GITHUB_URL}/repos/${userName}/${repo.name}/branches/${requiredBranch}`).then(getJSON).catch((error) => console.log(error));
};
