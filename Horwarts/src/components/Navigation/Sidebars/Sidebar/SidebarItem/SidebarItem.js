import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './SidebarItem.module.css';

const sidebarItem = (props) => (
  <div className={classes.SidebarItem}>
    <NavLink exact to={props.path}>
      {props.name}
    </NavLink>
  </div>
);

export default sidebarItem;
