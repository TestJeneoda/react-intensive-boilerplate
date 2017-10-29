//import request from 'request-promise';
//import PropTypes from 'prop-types';
//import moment from 'moment';
// import Home from '../Pages/Home';

import _ from 'lodash';
import React, { Component } from 'react';
import Styles from './styles.scss';
import Header from '../Header';
import * as Pages from '../Pages';
import {getJSON} from '../../helpers';

// let options = {
//     json: true,
//     method: 'GET',
//     url: 'https://api.github.com/users/TestJeneoda/repos'
// };
//
// request(options).then((result) => console.log(result));

export default class App extends Component {
    constructor () {
        super();
        this.userName = 'TestJeneoda';
        this.userEmail = 'test.jeneoda@gmail.com';
        this.userPasswd = '{"S4Github"}';
        this.fields = ['name', 'clone_url', 'language', 'default_branch', 'description', 'forks', 'forks_url', 'full_name', 'git_commits_url', 'git_url', 'html_url', 'id', 'owner', 'private', 'size']; //avatar_url, id, login, repos_url, type,
        //this.changePage = ::this._changePage;
        this.state = {
            currentPage: 'Profile', //Project, Create, Profile
            repos:       [],
            repoName:    null,
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
        this.setState({ currentPage });
    }

    changeCurrentRepo = (repoName) => {
        this.setState({ repoName });
        this.changePage('Project');
    }

    render () {
        const { currentPage } = this.state;
        const { [currentPage]: Page } = Pages;
        const { repos, owner, repoName } = this.state;

        //console.log(this.state);
        return (
            <section className = { Styles.app }>
                <Header
                    changePage = { this.changePage }
                    owner = { owner }
                />
                <div className = { Styles.container }>
                    <Page
                        changeCurrentRepo = { this.changeCurrentRepo }
                        changePage = { this.changePage }
                        owner = { owner }
                        repoName = { repoName }
                        reposData = { repos }
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
