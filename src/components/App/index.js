//import request from 'request-promise';
//import PropTypes from 'prop-types';
//import moment from 'moment';
// import Home from '../Pages/Home';

import _ from 'lodash';
import React, { Component } from 'react';
import Styles from './styles.scss';
import Header from '../Header';
import * as Pages from '../Pages';
import { getJSON } from '../../helpers';
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
    project: 'Project',
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
            currentPage: 'Profile', //Project, Create, Profile repos/automation ('repo', data) merge with gotorepo
            repos:       [],
            repo:        null,
            owner:       {}
        };
    }

    componentWillMount () {
        this.getRepos();
        this.getOwnerData();
    }

    getOwnerData = () => {
        fetch(`https://api.github.com/users/${this.userName}`, { method: 'GET' })
            .then(getJSON)
            .then((result) => {
                this.setState({ owner: result });
            })
            .catch((error) => console.log(error));
    }

    getRepos = () => {
        fetch(`https://api.github.com/users/${this.userName}/repos`, { method: 'GET' })
            .then(getJSON)
            .then((result) => {
                const reposData = result.map((item) => _.pick(item, this.fields));

                this.setState({ repos: reposData });
            })
            .catch((error) => console.log(error));
    }

    changePage = (currentPage) => {
        // todo check current page
        this.getRepos();
        this.getOwnerData();
        this.setState({ currentPage });
    }

    goToRepo = (repo) => {
        this.setState({ repo: _.pick(repo, this.fields) });
        this.changePage('Project');
    }

    onRepoChange = (newRepo) => this.setState({ repo: newRepo });

    render () {
        const { currentPage } = this.state;
        const { [currentPage]: Page } = Pages;
        const { repos, owner, repo } = this.state;

        //console.log(this.state);
        return (
            <section className = { Styles.app }>
                <Header
                    changePage = { this.changePage }
                    owner = { owner }
                />
                <div className = { Styles.container }>
                    <Page
                        goToRepo = { this.goToRepo }
                        changePage = { this.changePage }
                        owner = { owner }
                        repo =  { repo }
                        onRepoChange = { this.onRepoChange }
                        repos = { repos }
                        getRepos = { this.getRepos }
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
