import React from 'react';
import classes from './SmallArticle.module.css';

const article = (props) => (
  <div className={classes.Article} onClick={props.clicked}>
    <h2>{props.title}</h2>
  </div>
);

export default article;
