import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Styles from './styles.scss';

export class Header extends Component {

    static propTypes = {
        changePage:     Proptypes.func.isRequired,
        owner:          Proptypes.object.isRequired,
        onSearchSubmit: Proptypes.func.isRequired
    }

    state = {
        repoSearchValue: ''
    }

    handleSearchInput = ({ target }) => {
        this.setState({ repoSearchValue: target.value });
    }

    handleSearchSubmit = (event) => {
        event.preventDefault();
        this.props.onSearchSubmit(this.state.repoSearchValue);
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
                    <form
                        className = { `${Styles.search} navbar-form navbar-left` }
                        role = 'search'
                        onSubmit = { this.handleSearchSubmit } >
                        <div className = 'form-group'>
                            <i aria-hidden = 'true' className = 'fa fa-search' />
                            <input className = 'form-control' type = 'text' onChange = { this.handleSearchInput } />
                        </div>
                        <button className = 'btn btn-default' type = 'submit'>Search Github Repo</button>
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
