import React from 'react';
import classes from './BigArticle.module.css';

import page from '../../../assets/images/scroll.png';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const article = (props) => {
  console.log(props.show);
  return (
    <Aux>
      <div
        style={{
          backgroundImage: `url(${page})`,
          display: props.show ? 'block' : 'none'
        }}
        className={classes.Article}
        onClick={props.articleClosed}
      >
        <h1>{props.title}</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      <Backdrop show={props.show} clicked={props.articleClosed} />
    </Aux>
  );
};

export default article;
