import React, { Component } from 'react';
import Styles from './styles.scss';
import Proptypes from 'prop-types';

export class CodeTab extends Component {

    static propTypes = {
        branches: Proptypes.array.isRequired,
        commits: Proptypes.array.isRequired,
        contributors: Proptypes.array.isRequired
    }

    static defaultProps = {
        branches: [],
        commits: [],
        contributors: []
    }

    renderRepoControls (controls) {
        return Object
            .keys(controls)
            .map((control, i) => {
                const count = controls[control].length;

                return <li key = { i }><a href = '#'><span>{ count }</span> { control }</a></li>;
            })
    }

    render () {
        const { branches, contributors, commits } = this.props;
        const controls = { branches, contributors, commits };

        return (
            <section className = { Styles.codeDetails }>
                { this.renderRepoControls(controls) }
            </section>
        );
    }
}
