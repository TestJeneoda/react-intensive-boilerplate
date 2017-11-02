import React, { Component } from 'react';
import Styles from './styles.scss';
import Proptypes from 'prop-types';

export class CodeTab extends Component {

    static propTypes = {
        branches: Proptypes.array.isRequired,
        commitsCount: Proptypes.number.isRequired,
        contributors: Proptypes.array.isRequired
    }

    static defaultProps = {
        branches: [],
        commitsCount: 0,
        contributors: []
    }

    renderRepoControls (controls) {
        return Object
            .keys(controls)
            .map((control, i) => {
                const count = typeof controls[control] === 'object' ? controls[control].length : controls[control];

                return <li key = { i }><a href = '#'><span>{ count }</span> { control }</a></li>;
            })
    }

    render () {
        const { branches, contributors, commitsCount: commits } = this.props;
        const controls = { branches, contributors, commits };

        return (
            <section className = { Styles.codeDetails }>
                { this.renderRepoControls(controls) }
            </section>
        );
    }
}
