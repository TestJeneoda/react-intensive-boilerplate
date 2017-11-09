import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Styles from './styles.scss';

export class RepoPreview extends Component {

    static propTypes = {
        repoDesc: Proptypes.array.isRequired,
        repoName: Proptypes.array.isRequired
    }

    render () {
        const { repoDesc, repoName } = this.props;

        return (
            <div className = { Styles.repoPreview }>
                <h2>{ repoName }</h2>
                <p>{ repoDesc }</p>
            </div>
        );
    }
}
