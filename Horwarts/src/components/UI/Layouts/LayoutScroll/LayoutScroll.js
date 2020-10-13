import React from 'react';

import classes from './LayoutScroll.module.css';

const layoutScroll = (props) => (
  <div className={classes.LayoutScroll}>{props.children}</div>
);

export default layoutScroll;
