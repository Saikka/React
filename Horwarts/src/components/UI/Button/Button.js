import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
  <div className={classes.Button}>
    <button onClick={props.clicked} disabled={props.disabled}>
      {props.name}
    </button>
  </div>
);

export default button;
