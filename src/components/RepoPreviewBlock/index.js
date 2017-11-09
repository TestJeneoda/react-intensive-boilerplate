import React, { Component } from 'react';
import Proptypes from 'prop-types';

export class RepoPreview extends Component {

    static propTypes = {
        repoDesc: Proptypes.array.isRequired,
        repoName: Proptypes.array.isRequired
    }

    render () {
        const { repoDesc, repoName } = this.props;

        return (
            <div>
                <h2>{ repoName }</h2>
                <p>{ repoDesc }</p>
            </div>
        );
    }
}
