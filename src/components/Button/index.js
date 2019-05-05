import React from 'react';
import './style.scss';

export const Button = (props) =>
    <button
        className={props.className ? "button " + props.className : "button"}
        onClick={props.onClick}
        disabled={props.disabled}
    >
        {props.label}
    </button>
