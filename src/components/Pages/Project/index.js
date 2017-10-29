// Core
import React, { Component } from 'react';
import Proptypes from 'prop-types';

import {getJSON} from '../../../helpers';

import { Dropdown } from '../../common/Dropdown';
import { ProjectTabs } from '../../ProjectTabs';
import { TabsHeader } from '../../TabsHeader';
import { CodeTab } from '../../CodeTab';

import Styles from './styles.scss';

import { REPO_OWNER, PROJECT_NAME } from '../../../constants';

const CreateButtonGrp = (props) => props.buttons.map((button, key) => (
    <button
        className = { button.className + ' btn' }
        key = { key }
        type = 'button'>{ button.text }
    </button>));

//Components
export class Project extends Component {

    state = {
        activeTab: 'Code',
        header:    [{
            tab:     'Code',
            buttons: [{
                text:      'Edit',
                className: 'btn-default'
            }],
            description: 'No description, website, or topics provided.'
        }, {
            tab:         'Projects',
            buttons:     [{ text: 'New Project', className: 'btn-success' }],
            description: ''
        }, {
            tab:         'Wiki',
            description: 'Home',
            buttons:     [
                {
                    text:      'Edit',
                    className: 'btn-default'
                },
                {
                    text:      'New Page',
                    className: 'btn-success'
                }]
        }],
        tabs: ['Code', 'Projects', 'Wiki'],
        lastCommit: {},
        author: {},
        message: '',
        tree: [],
        commitsCount: null
    }

    codeNavigation = {
        branches: ['master'],
        buttons:  [
            {
                text:      'New pull request',
                className: 'btn-default'
            },
            {
                text:      'Create new file',
                className: 'btn-default'
            },
            {
                text:      'Upload files',
                className: 'btn-default'
            },
            {
                text:      'Clone or download',
                className: 'btn-success'
            }
        ]
    }

    static propTypes = {
        repoName: Proptypes.string.isRequired,
        userName: Proptypes.string.isRequired
    }

    componentWillMount () {
        this.getRepoDetails(this.props.repoName);
    }

    getRepoDetails = () => {
        fetch(`https://api.github.com/repos/${this.props.userName}/${this.props.repoName}`)
            .then(getJSON)
            .then(this.getBranchDetails)
            .catch((error) => console.log(error));
    }

    getBranchDetails = ({ default_branch }) => {
        fetch(`https://api.github.com/repos/${this.props.userName}/${this.props.repoName}/branches/${default_branch}`)
            .then(getJSON)
            .then(({ commit }) => {
                this.setState({ lastCommit: commit });

                return commit;
            })
            .then(this.getTree)
            .catch((error) => console.log(error));
    }

    getCommits = () => {
        fetch(`https://api.github.com/repos/${this.props.userName}/${this.props.repoName}/commits`)
            .then(getJSON)
            .then((result) => {
                this.setState({ commitsCount: result.length })
            })
            .catch((error) => console.log(error));
    }

    getTree = ({ sha, author, commit }) => {
        this.getCommits();
        fetch(`https://api.github.com/repos/${this.props.userName}/${this.props.repoName}/git/trees/${sha}`)
            .then(getJSON)
            .then(({ tree }) => {
                this.setState({ tree, author, message: commit.message });
            })
            .catch((error) => console.log(error));
    }

    changeActiveTab = (activeTab) => {
        this.setState({ activeTab });
    }

    render () {
        const { activeTab, header, tabs, lastCommit, commitsCount, message, author, tree} = this.state;
        console.log(this.state);
        const tabsSet = tabs.map(
            (tab, index) => (
                <ProjectTabs
                    activeTab = { activeTab === tab }
                    changeActiveTab = { this.changeActiveTab }
                    key = { index }
                    tab = { tab }
                />
            ));

        const tabsHeaders = header.map((item, index) => (
            <TabsHeader
                activeTab = { activeTab === item.tab }
                buttons = { item.buttons }
                changeActiveTab = { this.changeActiveTab }
                description = { item.description }
                key = { index }
                tab = { item.tab }
            />
        ));

        // todo dropdown with state
        return (
            <div className = { Styles.sectionWrapper }>
                <section className = { Styles.projectHeader }>
                    <div className = { Styles.breadCrumbs }>
                        <h1><a href = '#'>{ REPO_OWNER }</a><span>/</span>
                            <a className = { Styles.current } href = '#'>{ PROJECT_NAME }</a>
                        </h1>
                    </div>
                    <div className = { Styles.tabs }>
                        <ul className = 'nav nav-tabs'>
                            { tabsSet }
                        </ul>
                    </div>
                </section>
                <section className = { Styles.projectDescription }>
                    { tabsHeaders }
                </section>
                <div>
                    <CodeTab />
                </div>
                <section className = { Styles.codeNavigation }>
                    <Dropdown className={'dropdown ' + Styles.selectBranch} />
                    <div className = { Styles.buttonGroup }>
                        <CreateButtonGrp buttons = { this.codeNavigation.buttons } />
                    </div>
                </section>
                <section className={Styles.tree}>
                    <div className={Styles.treeLastCommit}>
                        <div className={Styles.lastCommitLeft}>
                            <div className={Styles.lastCommitAuthorAvatar}>
                                <img src = {author.avatar_url} alt = '' />
                            </div>
                            <div className={Styles.lastCommitAuthorLoginArea}>
                                <span className={Styles.lastCommitAuthorLogin}>{author.login}</span>
                                <span className={Styles.lastCommitAuthorMessage}>{message}</span>
                            </div>
                        </div>
                        <div className={Styles.lastCommitRight}>
                            {lastCommit.sha}
                        </div>
                    </div>
                    <table className='table table-bordered'>
                        <tbody>
                        {tree.map(treeItem => (
                            <tr>
                                <td>{treeItem.path}</td>
                                <td>init</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }

}
