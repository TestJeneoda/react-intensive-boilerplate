import React, { Component } from 'react';
export const Dropdown = ({ className, branches }) => (
    <div className = { className }>
        <button
            aria-expanded = 'true'
            aria-haspopup = 'true'
            className = 'btn btn-default dropdown-toggle'
            data-toggle = 'dropdown'
            id = 'dropdownMenu1'
            type = 'button'>
            Branch master
            <span className = 'caret' />
        </button>
        <ul aria-labelledby = 'dropdownMenu1' className = 'dropdown-menu'>
            { branches.map((branch, i) => <li key = { i }><span onClick = { () => this.setDropDownOption(event, name, value) }>{branch.name}</span></li>)}
        </ul>
    </div>
);
