// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles';
import moment from 'moment';
import { string } from 'prop-types';

export default class Post extends Component {
    static contextTypes = {
        avatar:    string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    static propTypes = {
        comment: string.isRequired,
        id:      string.isRequired
    };

    componentWillMount () {
        console.log(this.props.id, 'will mount');
    }

    componentDidMount () {
        console.log(this.props.id, 'did mount');
    }

    shouldComponentUpdate (nextProps) {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }

    render () {
        const { avatar, firstName, lastName } = this.context;
        const { comment } = this.props;

        console.log(this.props.id, 'render');

        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } />
                <img src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>{comment}</p>
            </section>
        );
    }
}
