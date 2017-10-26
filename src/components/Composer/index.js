// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import avatar from '../../theme/assets/homer.png';

export default class Composer extends Component {
    render () {
        return (
            <section className = { Styles.composer }>
                <form>
                    <textarea placeholder = 'Homer Simpson' />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
