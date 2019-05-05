import React from 'react';
import './style.scss';

export const Input = (props) => <div class="group">
    <input name={props.name} type="text" required value={props.value} onChange={props.onChange} />
    <span class="highlight"></span>
    <span class="bar"></span>
    <label>{props.label}</label>
    <div className="error">{props.error}</div>
</div>