import React from 'react';
import classes from './BigArticle.module.css';

import Aux from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const article = (props) => {
  console.log(props.author);
  return (
    <Aux>
      <div
        style={{
          display: props.show ? 'block' : 'none'
        }}
        className={classes.Article}
        onClick={props.articleClosed}
      >
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <h6>{props.author}</h6>
      </div>
      <Backdrop show={props.show} clicked={props.articleClosed} />
    </Aux>
  );
};

export default article;
