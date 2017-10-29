import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Styles from './styles.scss';
//import { RepoPreview } from '../../RepoPreviewBlock';

const CreateReposPreview = ({ repos, changeCurrentRepo, ...rest }) => repos.map(({ name, description, language }, key) => (
    <div key = { key } { ...rest }>
        <a className = { Styles.repoTitle } onClick = { () => changeCurrentRepo(name) }>{ name }</a>
        <p className = { Styles.repoDesc }>{ description }</p>
        <p className = { language ? Styles.repoLang : null }>{ language }</p>
    </div>));

export class Profile extends Component {

    static propTypes = {
        changeCurrentRepo: Proptypes.func.isRequired,
        owner:             Proptypes.object.isRequired,
        reposData:         Proptypes.array.isRequired
    }

    // state = {
    //     repoId: this.props.currentRepo
    // }

    render () {
        const { login, avatar_url: avatarUrl } = this.props.owner;
        //console.log(this.props.reposData);

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
                                <li><a href = '#'>Repositories <span>{this.props.reposData.length}</span></a></li>
                            </ul>
                        </nav>
                        <div className = { Styles.overviewBlock }>
                            <h4>Repositories</h4>
                            <div className = { Styles.reposList }>
                                <CreateReposPreview
                                    changeCurrentRepo = { this.props.changeCurrentRepo }
                                    className = { Styles.repo }
                                    repos = { this.props.reposData }
                                />
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        )
    }

}
