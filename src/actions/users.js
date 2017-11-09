import { getJSON } from '../helpers/index';
import { GITHUB_URL } from '../constants';

//display user info in Profile page (login, avatar)
export const getUser = (userName) => fetch(`${GITHUB_URL}/users/${userName}`).then(getJSON).catch((e) => console.log(e));
