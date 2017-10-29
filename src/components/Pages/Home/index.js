import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Styles from './styles.scss';

export class Home extends Component {

    static propTypes = {
        changePage: Proptypes.func.isRequired
    }

    render () {
        const { changePage } = this.props;

        return (
            <div className = { Styles.content }>
                <div className = { Styles.greeting }>
                    <h1>Learn Git and GitHub without any code!</h1>
                    <p>Create a repository, start a branch,
                        write comments, and open a pull request.</p>
                    <p><a
                        className = 'btn btn-success btn-lg' href = '#' role = 'button'
                        onClick = { () => changePage('CreateProject') }>Start a project</a></p>
                </div>
            </div>
        )
    }
}


