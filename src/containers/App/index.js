// Core
import React, { Component } from 'react';

// Instruments
import { string } from 'prop-types';
// import avatar from '../../theme/assets/homer.png';

// Components
import Feed from '../../components/Feed';
import Catcher from '../../components/Catcher';

const GROUP_ID = 'l1lz1az2m5';
const TOKEN = 'c27k5fzctc';

const options = {
    api:    `https://lab.lectrum.io/api/feed/${GROUP_ID}`,
    avatar:
        'https://lab.lectrum.io/api/image/l1lz1az2m5/MmtAeNpHFwZZTcpUNvkcarwhnrtNAdgi.jpg',
    firstName: 'Dima',
    lastName:  'Vakatsienko',
    token:     TOKEN
};
export default class App extends Component {
    static childContextTypes = {
        api:       string.isRequired,
        avatar:    string.isRequired,
        firstName: string.isRequired,
        lastName:  string.isRequired,
        token:     string.isRequired
    };

    getChildContext () {
        return options;
    }

    render () {
        return (
            <Catcher>
                <Feed />
            </Catcher>
        );
    }
}
