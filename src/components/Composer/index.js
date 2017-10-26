// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import avatar from '../../theme/assets/homer.png';

export default class Composer extends Component {
    render () {
        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form>
                    <textarea placeholder = { `What's on your mind, Homer?` } />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
