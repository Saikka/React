import React from 'react';
import classes from './Match.module.css';

const match = (props) => (
  <ul className={classes.Match}>
    <li>{props.date}</li>
    <li>{props.team1}</li>
    <li>- : -</li>
    <li>{props.team2}</li>
  </ul>
);

export default match;
