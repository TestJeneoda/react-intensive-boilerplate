import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Styles from './styles.scss';
import gitHomePage from '../../theme/assets/git.png';
import gitProfile from '../../theme/assets/profile.png';

export class Header extends Component {

    static propTypes = {
        changePage: Proptypes.func.isRequired,
        owner:      Proptypes.object.isRequired
    }

    render () {
        const { changePage, owner } = this.props;
        const { avatar_url: avatarUrl } = owner;

        return (
            <nav className = { Styles.header }>
                <section className = { Styles.headerWrapper }>
                    <div>
                        <a className = { Styles.link } href = '#' onClick = { () => changePage('Home') }>
                            <i className = 'fa fa-github' />
                        </a>
                    </div>
                    <form className = { Styles.search + ' navbar-form navbar-left' } role = 'search'>
                        <div className = 'form-group'>
                            <i aria-hidden = 'true' className = 'fa fa-search' />
                            <input className = 'form-control' type = 'text' />
                        </div>
                        <button className = 'btn btn-default' type = 'submit'>Search GitHub</button>
                    </form>
                    <div>
                        <a className = { Styles.link } href = '#' onClick = { () => changePage('Profile') }><img
                            src = { avatarUrl }
                        /></a>
                    </div>
                </section>
            </nav>
        );
    }
}

export default Header;
