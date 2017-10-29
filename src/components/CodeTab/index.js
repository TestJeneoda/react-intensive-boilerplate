import React, { Component } from 'react';
import Styles from './styles.scss';

export class CodeTab extends Component {
    controls = {
        commit:      0,
        branch:      0,
        contributor: 0
    }

    renderRepoControls (controls) {
        return Object
            .keys(controls)
            .map((control, i) =>
                <li key = { i }><a href = '#'><span>{ controls[control] }</span>{ control }</a></li>);
    }

    render () {

        return (
            <section className = { Styles.codeDetails }>
                { this.renderRepoControls(this.controls) }
            </section>
        )
    }
}
