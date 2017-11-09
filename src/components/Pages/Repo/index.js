import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Dropdown } from '../../Dropdown';
import { ProjectTabs } from '../../ProjectTabs';
import { TabsHeader } from '../../TabsHeader';
import { CodeTab } from '../../CodeTab';
import { EditForm } from './EditForm';
import { RepoBtnGroup } from './RepoBtnGroup';
import { DropdownBtn } from '../../common/DropdownBtn';
import Loader from '../../common/Loader';
import gh, { USER_CREDENTIALS } from '../../../helpers/githubApi';
import { getRepo, getBranch, getBranches, getCommits, getTree } from '../../../actions';
import Styles from './styles.scss';

export class Repo extends Component {

    static propTypes = {
        changePage: Proptypes.func.isRequired,
        pageData:   Proptypes.object.isRequired, //repo data
        userName:   Proptypes.string.isRequired
    }

    state = {
        activeTab:       'Code',
        activeComponent: false,
        tabs:            ['Code', 'Projects', 'Wiki'],
        isLoading:       true,
        commits:         [],
        repo:            {},
        tree:            [],
        branches:        [],
        branch:          [],
        contributors:    [],
        activeBranch:    ''
    }

    async componentWillMount () {
        const repo = await getRepo(this.props.userName, this.props.pageData.name);
        const branches = await getBranches(this.props.userName, repo.name);
        const branch = await getBranch(this.props.userName, repo, this.state.activeBranch.activeBranch);
        const commits = await getCommits(this.props.userName, repo.name);
        const tree = await getTree(this.props.userName, repo.name, branch.commit);

        this.setState({ repo, branches, branch, commits, tree, isLoading: false });
    }

    getHeader () {
        return [
            {
                tab:                  'Code',
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
                buttons: [{ text: 'New Project', className: 'btn-success disabled' }]
            }, {
                tab:     'Wiki',
                buttons: [
                    {
                        text:      'Edit',
                        className: 'btn-default disabled'
                    },
                    {
                        text:      'New Page',
                        className: 'btn-success disabled'
                    }]
            }];
    }

    codeNavigation () {
        return {
            buttons: [
                {
                    text:      'New pull request',
                    className: 'btn-default disabled'
                },
                {
                    component: (
                        <DropdownBtn
                            className = { 'btn-success' }
                            key = 'clone-dropdown-btn'
                            text = 'Clone or download'>
                            <div className = { Styles.cloneRepoDDWrapper }>
                                <h3 className = { Styles.cloneRepoDDTitle }>Clone with HTTPS</h3>
                                <div className = { Styles.cloneRepoDDContent }>
                                    <p>Use Git or checkout with SVN using the web URL.</p>
                                    <input readOnly className = 'form-control' type = 'text' value = { this.state.repo.git_url } />
                                </div>
                                <a className = { Styles.cloneRepoDDLink } href = '#'>Download ZIP</a>
                            </div>
                        </DropdownBtn>
                    )
                },
                {
                    text:      'Delete this repository',
                    className: 'btn-danger',
                    onClick:   () => this.deleteRepo()
                }
            ]
        };
    }

    onRepoChange = (repo) => this.setState({ repo });

    showEditForm = (option) => {
        this.setState({ isComponentActive: option });
    }

    changeActiveTab = (activeTab) => {
        this.setState({ activeTab });
    }

    dropDownHandler = (name, value) => {
        const branch = Object.assign({}, this.state.activeBranch, { [name]: value });

        this.setState({ activeBranch: branch });
    }

    deleteRepo = () => {
        const repoOwner = gh.getRepo(`${USER_CREDENTIALS.userName}/${this.state.repo.name}`);

        repoOwner.deleteRepo().then(() => this.props.changePage('Profile')); // ensure that browser cache is disabled
    }

    render () {

        if (this.state.isLoading) {
            return <Loader />;
        }

        const { activeTab, tabs, isComponentActive, tree, repo, branches, branch, contributors, commits } = this.state;
        const { activeBranch = '' } = this.state.activeBranch;
        const { changePage, userName } = this.props;
        const { commit, sha, author } = branch.commit;
        const { message } = commit;


        const options = branches.map((branchItem) => ({ value: branchItem.name, text: branchItem.name }));
        const data = {
            name:         'activeBranch',
            defaultValue: 'master',
            placeholder:  'Branch: '
        };

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
                    <Dropdown
                        className = { `${Styles.selectBranch} dropdown` }
                        data = { data }
                        options = { options }
                        value = { activeBranch }
                        onChange = { this.dropDownHandler }
                    />
                    <div className = { Styles.buttonGroup }>
                        <RepoBtnGroup buttons = { this.codeNavigation().buttons } />
                    </div>
                </section>
                <section className = { Styles.tree }>
                    <div className = { Styles.treeLastCommit }>
                        <div className = { Styles.lastCommitLeft }>
                            <div className = { Styles.lastCommitAuthorAvatar }>
                                <img alt = 'author' src = { author.avatar_url } />
                            </div>
                            <div className = { Styles.lastCommitAuthorLoginArea }>
                                <span className = { Styles.lastCommitAuthorLogin }>{author.login}</span>
                                <span className = { Styles.lastCommitAuthorMessage }>{message}</span>
                            </div>
                        </div>
                        <div className = { Styles.lastCommitRight }>
                            {sha}
                        </div>
                    </div>
                    <table className = 'table table-bordered'>
                        <tbody>{ tree.tree.map((treeItem, i) => (<tr key = { i }><td>{treeItem.path}</td></tr>))}
                        </tbody>
                    </table>
                </section>
            </div>
        );
    }
}
