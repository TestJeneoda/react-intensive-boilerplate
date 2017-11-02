// Core
import React, { Component } from 'react';
import Proptypes from 'prop-types';

import { getJSON } from '../../../helpers';

import { Dropdown } from '../../common/Dropdown';
import { ProjectTabs } from '../../ProjectTabs';
import { TabsHeader } from '../../TabsHeader';
import { CodeTab } from '../../CodeTab';
import { EditForm } from './EditForm';

import Styles from './styles.scss';

import { REPO_OWNER } from '../../../constants';

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
        activeComponent: false,
        tabs: ['Code', 'Projects', 'Wiki'],
        lastCommit: {},
        author: {},
        message: '',
        tree: [],
        commitsCount: 0,
        branches: [],
        contributors: []
    }

    getHeader () {
        return [
            {
                tab:     'Code',
                replaceableComponent: (
                    <EditForm
                        repo = { this.props.repo }
                        onClick = { () => this.showEditForm(false) }
                        onRepoChange = { this.props.onRepoChange }
                    />
                ),
                buttons: [{
                    text:      'Edit',
                    className: 'btn-default',
                    onClick:   () => this.showEditForm(true)
                }]
            }, {
                tab:     'Projects',
                buttons: [{ text: 'New Project', className: 'btn-success' }]
            }, {
                tab:     'Wiki',
                buttons: [
                    {
                        text:      'Edit',
                        className: 'btn-default'
                    },
                    {
                        text:      'New Page',
                        className: 'btn-success'
                    }]
            }];
    }

    codeNavigation = {
        branches: ['hjsdjbjgagu'],
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
        changePage: Proptypes.func.isRequired,
        repo:       Proptypes.object.isRequired,
        userName:   Proptypes.string.isRequired,
        onRepoChange: Proptypes.func.isRequired
    }

    componentWillMount () {
        this.getRepoDetails(this.props.repo.name);
        this.getBranches(this.props.userName, this.props.repo.name);
    }

    // todo refactor
    showEditForm = (option) => {
        // const newState = [...this.state.header];
        //
        // newState[0].isComponentActive = option;
        // this.setState(Object.assign({}, this.state, { header: newState }));
        this.setState({ isComponentActive: option });
    }

    getRepoDetails = () => {
        fetch(`https://api.github.com/repos/${this.props.userName}/${this.props.repo.name}`)
            .then(getJSON)
            .then(this.getBranchDetails)
            .catch((error) => console.log(error));
    }

    getBranchDetails = ({ default_branch }) => {
        fetch(`https://api.github.com/repos/${this.props.userName}/${this.props.repo.name}/branches/${default_branch}`)
            .then(getJSON)
            .then(({ commit }) => {
                this.setState({ lastCommit: commit });

                return commit;
            })
            .then(this.getTree)
            .catch((error) => console.log(error));
    }

    getCommits = () => {
        fetch(`https://api.github.com/repos/${this.props.userName}/${this.props.repo.name}/commits`)
            .then(getJSON)
            .then((result) => {
                this.setState({ commitsCount: result.length })
            })
            .catch((error) => console.log(error));
    }

    getTree = ({ sha, author, commit }) => {
        this.getCommits();
        fetch(`https://api.github.com/repos/${this.props.userName}/${this.props.repo.name}/git/trees/${sha}`)
            .then(getJSON)
            .then(({ tree }) => {
                this.setState({ tree, author, message: commit.message });
            })
            .catch((error) => console.log(error));
    }

    changeActiveTab = (activeTab) => {
        this.setState({ activeTab });
    }

    getBranches = (userName, repoName) => {
        fetch(`https://api.github.com/repos/${userName}/${repoName}/branches`)
            .then(getJSON)
            .then((branches) => {
                this.setState({ branches });
            })
            .catch((error) => console.log(error));
    }

    render () {
        const { activeTab, tabs, lastCommit, isComponentActive, commitsCount, message, author, tree } = this.state;
        const { changePage, repo } = this.props;

        const tabsSet = tabs.map(
            (tab, index) => (
                <ProjectTabs
                    activeTab = { activeTab === tab }
                    changeActiveTab = { this.changeActiveTab }
                    key = { index }
                    tab = { tab }
                />
            ));

        const tabsHeaders = this.getHeader().map((item, index) => (
            <TabsHeader
                activeTab = { activeTab === item.tab }
                buttons = { item.buttons }
                changeActiveTab = { this.changeActiveTab }
                description = { this.props.repo.description }
                isComponentActive = { isComponentActive }
                key = { index }
                replaceableComponent = { item.replaceableComponent }
                tab = { item.tab }
            />
        ));

        // todo dropdown with state
        return (
            <div className = { Styles.sectionWrapper }>
                <section className = { Styles.projectHeader }>
                    <div className = { Styles.breadCrumbs }>
                        <h1><a href = '#' onClick = { () => changePage('Profile') } >{ this.props.userName }</a><span>/</span>
                            <a className = { Styles.current } href = '#'>{ repo.name }</a>
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
                    <CodeTab
                        branches = { this.state.branches }
                        commitsCount = { this.state.commitsCount }
                        contributors = { this.state.contributors }
                    />
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
                        {tree.map((treeItem, i) => (
                            <tr key = { i }>
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
