// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import { string } from 'prop-types';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Catcher from '../../components/Catcher';
import Counter from '../../components/Counter';

export default class Feed extends Component {
    static contextTypes = {
        api:   string.isRequired,
        token: string.isRequired
    };

    constructor () {
        super();

        this.createPost = ::this._createPost;
        this.deletePost = ::this._deletePost;
    }

    state = {
        posts: []
    };

    async _createPost ({ comment }) {
        try {
            const { api, token } = this.context;

            const response = await fetch(api, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization:  token
                },
                body: JSON.stringify({
                    comment
                })
            });

            if (response.status !== 200) {
                throw new Error('Post was not created!');
            }

            const { data } = await response.json();

            this.setState(({ posts }) => ({
                posts: [data, ...posts]
            }));
        } catch ({ message }) {
            console.log(message);
        }
    }

    _deletePost (id) {
        this.setState(({ posts }) => ({
            posts: posts.filter((post) => post.id !== id)
        }));
    }

    render () {
        const { posts: postsData } = this.state;
        const posts = postsData.map(
            ({ avatar, comment, created, firstName, id, lastName }) => (
                <Catcher key = { id }>
                    <Post
                        avatar = { avatar }
                        comment = { comment }
                        created = { created }
                        deletePost = { this.deletePost }
                        firstName = { firstName }
                        id = { id }
                        lastName = { lastName }
                    />
                </Catcher>
            )
        );

        return (
            <section className = { Styles.feed }>
                <Composer createPost = { this.createPost } />
                <Counter count = { posts.length } />
                {posts}
            </section>
        );
    }
}
