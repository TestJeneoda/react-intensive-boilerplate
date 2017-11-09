import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Styles from './styles.scss';
import { DropdownBtn } from './DropdownBtn/index';

export class Dropdown extends Component {

    static propTypes = {
        data:     Proptypes.object.isRequired,
        options:  Proptypes.array.isRequired,
        value:    Proptypes.string.isRequired,
        onChange: Proptypes.func.isRequired
    }

    constructor (props) {
        super(props);
        this.state = {
            active: false
        };
    }

    renderDropdownOptions = () => this.props.options.map((item, i) => {
        const name = this.props.data.name;

        const value = item.value || item;

        const text = item.text || item;

        return <li key = { i }><span onClick = { () => this.setDropDownOption(event, name, value) }>{ text }</span></li>;
    });

    setDropDownOption = (event, name, value) => {
        this.toggleDropdown(event);
        this.props.onChange(name, value);
    }

    toggleDropdown = () => {
        const { active } = this.state;

        this.setState({ active: !active });
    }

    render () {
        const dropdownState = this.state.active ? 'active' : 'inactive';

        const { data } = this.props;
        const value = this.props.value || data.defaultValue;

        return (
            <div className = { `${Styles.dropdown} btn-group` } >
                <DropdownBtn
                    className = { `${Styles[dropdownState]}` }
                    placeholder = { data.placeholder }
                    value = { value }
                    onClick = { this.toggleDropdown }
                />
                <ul className = 'dropdown-menu'>
                    { this.renderDropdownOptions() }
                </ul>
            </div>
        );
    }
}
