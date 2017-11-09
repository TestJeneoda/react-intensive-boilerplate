import React, { Component } from 'react';
import Proptypes from 'prop-types';


export class DropdownBtn extends Component {

    static propTypes = {
        className:   Proptypes.string.isRequired,
        placeholder: Proptypes.string.isRequired,
        value:       Proptypes.string.isRequired,
        onClick:     Proptypes.func.isRequired
    }

    render () {
        return (
            <button
                className = { `${this.props.className} btn btn-default btn-sm dropdown-toggle` }
                data-toggle = 'dropdown'
                type = 'button'
                onClick = { this.props.onClick } >
                {this.props.placeholder} <b>{this.props.value}</b>
                <span className = 'caret' />
            </button>
        );
    }
}
