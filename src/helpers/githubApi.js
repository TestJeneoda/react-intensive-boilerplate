import GitHub from 'github-api';

export const USER_CREDENTIALS = {
    userName:   'TestJeneoda',
    userEmail:  'test.jeneoda@gmail.com',
    userPasswd: '{"S4Github"}'
};

export default new GitHub({
    username: USER_CREDENTIALS.userName,
    password: USER_CREDENTIALS.userPasswd
});
