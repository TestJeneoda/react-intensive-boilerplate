import { getJSON } from '../helpers/index';
import { GITHUB_URL } from '../constants';

//display branches of specific repository on Repo page
export const getBranches = (userName, repoName) => {
    return fetch(`https://api.github.com/repos/${userName}/${repoName}/branches`)
        .then(getJSON)
        .catch((error) => console.log(error));
}

export const getBranch = (userName, repo) => {
    return fetch(`${GITHUB_URL}/repos/${userName}/${repo.name}/branches/${repo.default_branch}`)
        .then(getJSON)
        // .then(({ commit }) => { // todo WTF
        //     this.setState({ lastCommit: commit });
        //
        //     return commit;
        // })
        // .then(this.getTree)
        .catch((error) => console.log(error));
}