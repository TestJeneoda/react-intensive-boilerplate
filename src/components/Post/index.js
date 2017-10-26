// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import moment from 'moment';
import { string, func, number } from 'prop-types';

export default class Post extends Component {
    static propTypes = {
        avatar:     string.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        deletePost: func.isRequired,
        firstName:  string.isRequired,
        id:         string.isRequired,
        lastName:   string.isRequired
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
        const { avatar, comment, created, firstName, lastName } = this.props;

        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } onClick = { this.deletePost } />
                <img src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
            </section>
        );
    }
}
