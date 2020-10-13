import React from 'react';
import classes from './SmallArticle.module.css';

const article = (props) => (
  <div className={classes.Article} onClick={props.clicked}>
    <h1>{props.title}</h1>
  </div>
);

export default article;
