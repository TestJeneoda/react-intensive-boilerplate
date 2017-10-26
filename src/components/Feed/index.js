// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Counter from '../../components/Counter';

export default class Feed extends Component {
    constructor () {
        super();

        this.createPost = ::this._createPost;
    }

    state = {
        posts: []
    };

    _createPost (post) {
        this.setState(({ posts }) => ({
            posts: [post, ...posts]
        }));
    }

    render () {
        const { posts: postsData } = this.state;
        const posts = postsData.map(({ id, comment }) => (
            <Post comment = { comment } id = { id } key = { id } />
        ));

        return (
            <section className = { Styles.feed }>
                <Composer createPost = { this.createPost } />
                <Counter count = { posts.length } />
                {posts}
            </section>
        );
    }
}
