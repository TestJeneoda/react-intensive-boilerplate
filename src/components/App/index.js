import React, { Component } from 'react';
import * as Pages from '../Pages';
import Header from '../Header';
import { getUser } from '../../actions';
import { USER_CREDENTIALS } from '../../helpers/githubApi';
import Styles from './styles.scss';

export default class App extends Component {
    constructor () {
        super();
        this.userName = USER_CREDENTIALS.userName;
        this.userEmail = USER_CREDENTIALS.userEmail;
        this.userPasswd = USER_CREDENTIALS.userPasswd;
        // this.fields = ['name', 'clone_url', 'language', 'default_branch', 'description', 'forks', 'forks_url', 'full_name', 'git_commits_url', 'git_url', 'html_url', 'id', 'owner', 'private', 'size', 'homepage']; //avatar_url, id, login, repos_url, type,

        this.state = {
            currentPage:      'Home', //Repo, Create, Profile
            pageData:         [],
            repo:             null,
            repoSearchValue:  '',
            repoSearchResult: true,
            owner:            {}
        };
    }

    componentWillMount () {
        getUser(this.userName).then((result) => this.setState({ owner: result }));
    }

    changePage = (pageName, data) => {
        if (pageName === this.state.currentPage) {
            return;
        }
        this.setState({ currentPage: pageName, pageData: data });
    }

    onSearchSubmit = (repoSearchValue) => {
        this.setState({ repoSearchValue });
        this.changePage('Profile');
    }

    render () {
        const { currentPage, owner } = this.state;
        const { [currentPage]: Page } = Pages;

        return (
            <section className = { Styles.app }>
                <Header
                    changePage = { this.changePage }
                    owner = { owner }
                    onSearchSubmit = { this.onSearchSubmit }
                />
                <div className = { Styles.container }>
                    <Page
                        changePage = { this.changePage }
                        owner = { owner }
                        pageData = { this.state.pageData }
                        repoSearchValue = { this.state.repoSearchValue }
                        userName = { this.userName }
                    />
                </div>
            </section>
        );
    }
}
