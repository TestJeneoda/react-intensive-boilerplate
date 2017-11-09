import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Styles from './loader.scss';

export class DropdownBtn extends Component {

    static propTypes = {
        children:  Proptypes.element.isRequired,
        className: Proptypes.string.isRequired,
        text:      Proptypes.string.isRequired
    }

    state = {
        isOpen: false
    }

    dropDownHandler = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    }

    render () {
        return (
            <div className = 'btn-group' >
                <button
                    aria-expanded = 'true'
                    aria-haspopup = 'true'
                    className = { `btn dropdown-toggle ${this.props.className}` }
                    data-toggle = 'dropdown'
                    id = 'dropdownMenu1'
                    type = 'button'
                    onClick = { this.dropDownHandler }>
                    { this.props.text }
                    <span className = { `${Styles.caret} caret` } />
                </button>
                { this.state.isOpen ? this.props.children : null }
            </div>
        );
    }
}
