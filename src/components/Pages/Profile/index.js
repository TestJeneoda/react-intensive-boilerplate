import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Styles from './styles.scss';
import { ReposList } from './ReposList';
import { getRepos } from '../../../actions';

export class Profile extends Component {

    static propTypes = {
        changePage: Proptypes.func.isRequired,
        owner: Proptypes.object.isRequired,
        userName: Proptypes.string.isRequired
    }

    state = {
        repos: []
    }

    componentWillMount () {
        getRepos(this.props.userName).then((result) => this.setState({ repos: result }))
    }

    render () {
        const { login, avatar_url: avatarUrl } = this.props.owner;

        return (
            <div className = { Styles.mainWrapper }>
                <section className = { Styles.profileWrapper }>
                    <section className = { Styles.leftCol }>
                        <div className = {Styles.avatar}>
                            <img alt = 'Owner avatar' src = { avatarUrl } />
                        </div>
                        <div className={Styles.userName}>{ login }</div>
                        <button className='btn btn-default btn-block'>Edit Profile</button>
                    </section>
                    <section className = { Styles.content }>
                        <nav className = { Styles.navigation }>
                            <ul>
                                <li><a className={Styles.active} href = '#'>Overview</a></li>
                                <li><a href = '#'>Repositories <span>{this.state.repos.length}</span></a></li>
                            </ul>
                        </nav>
                        <div className = { Styles.overviewBlock }>
                            <h4>Repositories</h4>
                            <div className = { Styles.reposList }>
                                <ReposList
                                    changePage = { this.props.changePage }
                                    className = { Styles.repo }
                                    repos = { this.state.repos }
                                />
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        )
    }

}
