// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';

export default class Feed extends Component {
    render () {
        return (
            <section className = { Styles.feed }>
                <Composer />
                <Post />
            </section>
        );
    }
}
