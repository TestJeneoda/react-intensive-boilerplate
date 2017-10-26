// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import moment from 'moment';
import { string, func } from 'prop-types';

export default class Post extends Component {
    static contextTypes = {
        avatar:    string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    static propTypes = {
        comment:    string.isRequired,
        deletePost: func.isRequired,
        id:         string.isRequired
    };

    constructor () {
        super();

        this.deletePost = ::this._deletePost;
    }

    shouldComponentUpdate (nextProps) {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }

    _deletePost () {
        const { deletePost, id } = this.props;

        deletePost(id);
    }

    render () {
        const { avatar, firstName, lastName } = this.context;
        const { comment } = this.props;

        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } onClick = { this.deletePost } />
                <img src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
            </section>
        );
    }
}
