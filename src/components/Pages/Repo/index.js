// Core
import React, { Component } from 'react';
import Proptypes from 'prop-types';

import { getJSON } from '../../../helpers';

import { Dropdown } from '../../common/Dropdown';
import { ProjectTabs } from '../../ProjectTabs';
import { TabsHeader } from '../../TabsHeader';
import { CodeTab } from '../../CodeTab';
import { EditForm } from './EditForm';
import gh, { USER_CREDENTIALS } from '../../../helpers/githubApi';
import { getRepo, getBranch, getBranches, getCommits, getTree } from '../../../actions';

import Styles from './styles.scss';

import { REPO_OWNER } from '../../../constants';
import { RepoBtnGroup } from './RepoBtnGroup';

//Components
export class Repo extends Component {

    state = {
        activeTab: 'Code',
        activeComponent: false,
        tabs: ['Code', 'Projects', 'Wiki'],
        isLoading: true,


        // lastCommit: {}, //
        // author: {}, // branch
        // message: '', // repo

        commits: [],
        repo: {},
        tree: [],
        branches: [],
        contributors: []
    }

    getHeader () {
        return [
            {
                tab:     'Code',
                replaceableComponent: (
                    <EditForm
                        repo = { this.state.repo }
                        onClick = { () => this.showEditForm(false) }
                        onRepoChange = { this.onRepoChange }
                    />
                ),
                buttons: [{
                    text:      'Edit',
                    className: 'btn-default',
                    onClick:   () => this.showEditForm(true)
                }]
            }, {
                tab:     'Projects',
                buttons: [{ text: 'New Repo', className: 'btn-success' }]
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
        buttons:  [
            {
                text:      'New pull request',
                className: 'btn-default'
            },
            {
                text:      'Clone or download',
                className: 'btn-success'
            },
            {
                text:      'Delete this repository',
                className: 'btn-danger',
                onClick:   () => this.deleteRepo()
            }
        ]
    }

    static propTypes = {
        changePage: Proptypes.func.isRequired,
        pageData:   Proptypes.object.isRequired, //repo data
        userName:   Proptypes.string.isRequired
    }

    async componentWillMount () {
        const repo = await getRepo(this.props.userName, this.props.pageData.name);
        const branches = await getBranches(this.props.userName, repo.name)
        const branch = await getBranch(this.props.userName, repo);
        const commits = await getCommits(this.props.userName, repo.name);
        const tree = await getTree(this.props.userName, repo.name, branch.commit);

        this.setState({ repo, branches, branch, commits, tree, isLoading: false });
    }

    onRepoChange = (repo) => this.setState({repo});

    // todo refactor
    showEditForm = (option) => {
        // const newState = [...this.state.header];
        //
        // newState[0].isComponentActive = option;
        // this.setState(Object.assign({}, this.state, { header: newState }));
        this.setState({ isComponentActive: option });
    }

    changeActiveTab = (activeTab) => {
        this.setState({ activeTab });
    }

    // todo move to actions
    deleteRepo = () => {
        const repoOwner = gh.getRepo(`${USER_CREDENTIALS.userName}/${this.state.repo.name}`);
        const { changePage } = this.props;

        repoOwner.deleteRepo().then(() => changePage('Profile'));
    }

    render () {

        if (this.state.isLoading) {
            return (
                <div>Loading</div>
            );
        }

        const { activeTab, tabs, isComponentActive, tree, repo, branches, branch, contributors, commits } = this.state;
        const { changePage, userName } = this.props;
        const { commit, sha, author } = branch.commit;
        const { message } = commit;

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
                description = { repo.description }
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
                        <h1><a href = '#' onClick = { () => changePage('Profile') } >{ userName }</a><span>/</span>
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
                        branches = { branches }
                        commits = { commits }
                        contributors = { contributors }
                    />
                </div>
                <section className = { Styles.codeNavigation }>
                    <Dropdown className = { 'dropdown ' + Styles.selectBranch} />
                    <div className = { Styles.buttonGroup }>
                        <RepoBtnGroup buttons = { this.codeNavigation.buttons } />
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
                            {sha}
                        </div>
                    </div>
                    <table className='table table-bordered'>
                        <tbody>
                        {tree.tree.map((treeItem, i) => (
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
