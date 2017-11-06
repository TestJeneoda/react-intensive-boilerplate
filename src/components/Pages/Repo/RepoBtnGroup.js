import React from 'react';

export const RepoBtnGroup = (props) => props.buttons.map((button, key) => (
    <button
        className = { button.className + ' btn' }
        key = { key }
        type = 'button'
        onClick = { button.onClick }>{ button.text }
    </button>));