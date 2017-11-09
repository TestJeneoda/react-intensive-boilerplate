import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { ReposList } from './ReposList';
import { getRepos } from '../../../actions';
import Styles from './styles.scss';
import Loader from '../../common/Loader';
import { CSSTransition } from 'react-transition-group';

export class Profile extends Component {

    static propTypes = {
        changePage:      Proptypes.func.isRequired,
        owner:           Proptypes.object.isRequired,
        repoSearchValue: Proptypes.string.isRequired,
        userName:        Proptypes.string.isRequired
    }

    state = {
        repos:             [],
        foundRepos:        [],
        repoListIsLoading: true
    }

    componentWillMount () {
        getRepos(this.props.userName).then((result) => {
            this.setState(() => ({ repos: result, repoListIsLoading: false }));
            this.onSearchValueReceive(this.props);
        }).catch((e) => console.log(e));
    }

    componentWillReceiveProps (nextProps) {
        this.onSearchValueReceive(nextProps);
    }

    onSearchValueReceive (props) {
        const { repos } = this.state;

        if (props.repoSearchValue !== undefined) {
            const repoNameRegex = new RegExp(props.repoSearchValue.toLocaleLowerCase());
            const foundRepos = repos.filter((repo) => repoNameRegex.test(repo.name.toLocaleLowerCase())) || repos;

            this.setState({ foundRepos });
        } else {
            this.setState({ foundRepos: repos });
        }
    }

    render () {
        const { login, avatar_url: avatarUrl } = this.props.owner;
        const { changePage, repoSearchValue } = this.props;
        const { foundRepos, repos, repoListIsLoading } = this.state;

        if (repoListIsLoading) {
            return <Loader />;
        }
        const displayRepos = foundRepos.length ? foundRepos : repos;

        const searchResult = foundRepos.length ?
            <ReposList
                changePage = { changePage }
                className = { Styles.repo }
                repos = { displayRepos }
            />
            :
            <CSSTransition
                timeout = { 1000 }>
                <section className = { Styles.noSearchResults } key = 'transition'>
                    <i aria-hidden = 'true' className = 'fa fa-search' />
                    <h3>We couldn’t find any repositories matching <p>{repoSearchValue}</p></h3>
                </section>
            </CSSTransition >;

        return (
            <div>
                <section className = { Styles.profileWrapper }>
                    <section className = { Styles.leftCol }>
                        <div className = { Styles.avatar }>
                            <img alt = 'Owner avatar' src = { avatarUrl } />
                        </div>
                        <div className = { Styles.userName }>{ login }</div>
                        <button className = 'btn btn-default btn-block disabled'>Edit Profile</button>
                    </section>
                    <section className = { Styles.content }>
                        <nav className = { Styles.navigation }>
                            <ul>
                                <li><a className = { Styles.active } href = '#'>Overview</a></li>
                                <li><a href = '#'>Repositories <span>{this.state.repos.length}</span></a></li>
                            </ul>
                        </nav>
                        <div>
                            <h4>Repositories</h4>
                            <div>
                                {searchResult}
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        );
    }

}
