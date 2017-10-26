// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import { string } from 'prop-types';

export default class Composer extends Component {
    static contextTypes = {
        avatar:    string.isRequired,
        firstName: string.isRequired
    };

    render () {
        const { avatar, firstName } = this.context;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form>
                    <textarea
                        placeholder = { `What's on your mind, ${firstName}?` }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
