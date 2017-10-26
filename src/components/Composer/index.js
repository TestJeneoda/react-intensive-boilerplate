// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import { string, func } from 'prop-types';
import { getUniqueID } from '../../helpers';

export default class Composer extends Component {
    static contextTypes = {
        avatar:    string.isRequired,
        firstName: string.isRequired
    };

    static propTypes = {
        createPost: func.isRequired
    };

    constructor () {
        super();

        this.handleSubmit = ::this._handleSubmit;
        this.handleTextareaChange = ::this._handleTextareaChange;
    }

    state = {
        comment: ''
    };

    _handleSubmit (event) {
        event.preventDefault();
        const { comment } = this.state;

        if (!comment) {
            return;
        }

        this.props.createPost({
            _id: getUniqueID(),
            comment
        });

        this.setState(() => ({
            comment: ''
        }));
    }

    _handleTextareaChange (event) {
        const { value: comment } = event.target;

        this.setState(() => ({ comment }));
    }

    render () {
        const { avatar, firstName } = this.context;
        const { comment } = this.state;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form onSubmit = { this.handleSubmit }>
                    <textarea
                        placeholder = { `What's on your mind, ${firstName}?` }
                        value = { comment }
                        onChange = { this.handleTextareaChange }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
