import React from 'react';

import classes from './Input.module.css';

const input = (props) => (
  <div className={classes.Input}>
    <label>{props.label}</label>
    <input type='text' />
  </div>
);

export default input;
