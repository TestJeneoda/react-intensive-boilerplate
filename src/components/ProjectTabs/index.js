// Core
import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Styles from './styles.scss';

//Components
export class ProjectTabs extends Component {

    static propTypes = {
        activeTab:       Proptypes.bool.isRequired,
        changeActiveTab: Proptypes.func.isRequired,
        tab:             Proptypes.string.isRequired
    }

    render () {
        const { tab, changeActiveTab, activeTab } = this.props;

        return (
            <li
                className = { activeTab ? 'active' : null }
                role = 'presentation'>
                <a className = { activeTab ? Styles.active : null } href = '#' onClick = { () => changeActiveTab(tab) }>{tab}</a></li>
        )
    }

}
