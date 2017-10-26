// Core
import React, { Component } from 'react';

// Instruments
import avatar from '../../theme/assets/homer.png';
import moment from 'moment';

export default class Post extends Component {
    render () {
        return (
            <section>
                <img src = { avatar } />
                <a>Homer Simpson</a>
                <a>It is {moment().format('MMMM D h:mm:ss a')}.</a>
                <p>What a good day!</p>
            </section>
        );
    }
}
