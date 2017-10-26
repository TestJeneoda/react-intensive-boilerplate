// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import { string, bool, func, arrayOf, shape } from 'prop-types';

export default class Like extends Component {
    static contextTypes = {
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    static propTypes = {
        id:       string.isRequired,
        liked:    bool.isRequired,
        likePost: func.isRequired,
        likes:    arrayOf(
            shape({
                firstName: string.isRequired,
                lastName:  string.isRequired
            }).isRequired
        ).isRequired
    };

    static defaultProps = {
        likes: []
    };

    constructor () {
        super();

        this.showLikers = ::this._showLikers;
        this.hideLikers = ::this._hideLikers;
        this.likePost = ::this._likePost;
    }

    state = {
        showLikers: false
    };

    _showLikers () {
        this.setState(() => ({
            showLikers: true
        }));
    }

    _hideLikers () {
        this.setState(() => ({
            showLikers: false
        }));
    }

    _likePost () {
        const { likePost, id } = this.props;
        const { firstName, lastName } = this.context;

        likePost(id, firstName, lastName);
    }

    render () {
        const { liked, likes } = this.props;
        const { showLikers } = this.state;
        const { firstName: ownFirstName, lastName: ownLastName } = this.context;

        const likeStyles = liked
            ? `${Styles.icon} ${Styles.liked}`
            : `${Styles.icon}`;

        const likersList = likes.length && showLikers ? (
            <ul>
                {likes.map(({ firstName, lastName }, index) => (
                    <li key = { index }>{`${firstName} ${lastName}`}</li>
                ))}
            </ul>
        ) : null;

        const meLiked = likes.some(
            ({ firstName, lastName }) =>
                `${firstName} ${lastName}` === `${ownFirstName} ${ownLastName}`
        );

        const totalLikes = meLiked
            ? `You and ${likes.length} others`
            : likes.length;

        return (
            <section className = { Styles.like }>
                <span className = { likeStyles } onClick = { this.likePost }>
                    Like
                </span>
                <div>
                    {likersList}
                    <span
                        onMouseEnter = { this.showLikers }
                        onMouseLeave = { this.hideLikers }>
                        {totalLikes}
                    </span>
                </div>
            </section>
        );
    }
}
