import React, { Component } from 'react';
export const Dropdown = ({className}) => (
    <div className = {className}>
        <button className = 'btn btn-default dropdown-toggle' type = 'button' id = 'dropdownMenu1'
                data-toggle = 'dropdown' aria-haspopup = 'true' aria-expanded = 'true'>
            Branch master
            <span className = 'caret' />
        </button>
        <ul aria-labelledby = 'dropdownMenu1' className = 'dropdown-menu'>
            <li><a href = '#'>Action</a></li>
            <li><a href = '#'>Another action</a></li>
            <li><a href = '#'>Something else here</a></li>
            <li className = 'divider' role = 'separator' />
            <li><a href = '#'>Separated link</a></li>
        </ul>
    </div>
)