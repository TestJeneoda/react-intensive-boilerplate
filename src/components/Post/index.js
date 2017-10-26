// Core
import React, { Component } from 'react';

// Instruments
import avatar from '../../theme/assets/homer.png';
import Styles from './styles';
import moment from 'moment';

export default class Post extends Component {
    render () {
        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } />
                <img src = { avatar } />
                <a>Homer Simpson</a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>What a good day!</p>
            </section>
        );
    }
}
