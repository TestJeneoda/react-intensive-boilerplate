//import request from 'request-promise';
//import PropTypes from 'prop-types';
//import moment from 'moment';
// import Home from '../Pages/Home';

import _ from 'lodash';
import React, { Component } from 'react';
import Styles from './styles.scss';
import Header from '../Header';
import * as Pages from '../Pages';
import { getUser } from '../../actions';
import { USER_CREDENTIALS } from '../../helpers/githubApi';

// let options = {
//     json: true,
//     method: 'GET',
//     url: 'https://api.github.com/users/TestJeneoda/repos'
// };
//
// request(options).then((result) => console.log(result));

/*
todo
 1. rename project to repository
 2. remove currentRepo
 3. keep all repos in state
 4. make component dictionary
 -- let pages = {
    home: 'Home',
    project: 'Repo',
    repos: {automation: {data}, lectrum: {data}} keyBy, Object.values for for
 }
 5. refactor pseudo router
 6. implement page reload after create/delete fetch
 7. all fetch operations move to helper that will return result and then use state

 console.log(gh.getRepo(`${USER_CREDENTIALS.userName}/${this.props.repo.name}`)).deleteRepo(cb);
 */

export default class App extends Component {
    constructor () {
        super();
        this.userName = USER_CREDENTIALS.userName;
        this.userEmail = USER_CREDENTIALS.userEmail;
        this.userPasswd = USER_CREDENTIALS.userPasswd;
        this.fields = ['name', 'clone_url', 'language', 'default_branch', 'description', 'forks', 'forks_url', 'full_name', 'git_commits_url', 'git_url', 'html_url', 'id', 'owner', 'private', 'size', 'homepage']; //avatar_url, id, login, repos_url, type,
        //this.changePage = ::this._changePage;
        this.state = {
            currentPage: 'Profile', //Repo, Create, Profile repos/automation ('repo', data) merge with gotorepo
            repos:       [],
            repo:        null,
            owner:       {}
        };
    }

    componentWillMount () {
        getUser(this.userName).then((result) => this.setState({ owner: result }));
    }

    changePage = (pageName, data) => {
        this.setState({ currentPage: pageName, pageData: data });
        // this.setState([{ currentPage: pageName }, { pageData: data }]);
    }

    // goToRepo = (repo) => {
    //     this.setState({ repo: _.pick(repo, this.fields) });
    //     this.changePage('Repo');
    // }

    // onRepoChange = (newRepo) => this.setState({ repo: newRepo });

    render () {
        const { currentPage } = this.state;
        const { [currentPage]: Page } = Pages;
        const { owner } = this.state;

        return (
            <section className = { Styles.app }>
                <Header
                    changePage = { this.changePage }
                    owner = { owner }
                />
                <div className = { Styles.container }>
                    <Page
                        pageData = { this.state.pageData }
                        changePage = { this.changePage }
                        owner = { owner }
                        userName = { this.userName }
                    />
                </div>
            </section>
        );
    }
}

// handlerMethod = (arg) => this.setState({blah: 2, newField: arg, [arg]: arg});
//
// setState(obj) {
//     this.state = Object.assign({}, this.state, obj);
//     this.state = {...this.state, ...obj}
// }
