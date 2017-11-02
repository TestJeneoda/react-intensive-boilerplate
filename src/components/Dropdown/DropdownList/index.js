import React, { Component } from 'react';
import Proptypes from 'prop-types';


export class DropdownList extends Component {

    static propTypes = {
        text:  Proptypes.string.isRequired,
        value: Proptypes.string
    }

    render () {
        return (
            <li><span>{this.props.value}</span></li>
        )
    }
}
