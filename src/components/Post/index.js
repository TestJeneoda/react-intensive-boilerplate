// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import moment from 'moment';
import { string } from 'prop-types';

export default class Post extends Component {
    static contextTypes = {
        avatar:    string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    render () {
        const { avatar, firstName, lastName } = this.context;

        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } />
                <img src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>What a good day!</p>
            </section>
        );
    }
}
