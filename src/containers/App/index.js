// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
import avatar from '../../theme/assets/homer.png';

// Components
import Feed from '../../components/Feed';

const options = {
    avatar,
    firstName: 'Homer',
    lastName:  'Simpson'
};

export default class App extends Component {
    static childContextTypes = {
        avatar:    string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired
    };

    getChildContext () {
        return options;
    }

    render () {
        return <Feed />;
    }
}
