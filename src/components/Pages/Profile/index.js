import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Styles from './styles.scss';
//import { RepoPreview } from '../../RepoPreviewBlock';

const CreateReposPreview = ({ repos, goToRepo, ...rest }) => repos.map((repo, key) => {
    const { name, description, language } = repo;
    
    return ( 
        <div key = { key } { ...rest }>
            <a className = { Styles.repoTitle } onClick = { () => goToRepo(repo) }>{ name }</a>
            <p className = { Styles.repoDesc }>{ description }</p>
            <p className = { language ? Styles.repoLang : null }>{ language }</p>
        </div>
    )
});

export class Profile extends Component {

    static propTypes = {
        goToRepo: Proptypes.func.isRequired,
        owner:    Proptypes.object.isRequired,
        repos:    Proptypes.array.isRequired
    }

    render () {
        const { login, avatar_url: avatarUrl } = this.props.owner;

        console.log(this.props.repos);

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
                                <li><a href = '#'>Repositories <span>{this.props.repos.length}</span></a></li>
                            </ul>
                        </nav>
                        <div className = { Styles.overviewBlock }>
                            <h4>Repositories</h4>
                            <div className = { Styles.reposList }>
                                <CreateReposPreview
                                    goToRepo = { this.props.goToRepo }
                                    className = { Styles.repo }
                                    repos = { this.props.repos }
                                />
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        )
    }

}
