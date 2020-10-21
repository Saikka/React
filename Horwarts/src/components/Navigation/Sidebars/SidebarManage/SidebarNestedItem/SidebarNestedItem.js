import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './SidebarNestedItem.module.css';

const sidebarNestedItem = (props) => (
  <div
    className={
      props.isOpen ? classes.SidebarNestedOpened : classes.SidebarNestedClosed
    }
    onClick={props.clicked}
  >
    <h1>{props.name}</h1>
    {props.isOpen ? (
      <ul>
        <li>
          <NavLink to={props.path + 'add'}>Add new</NavLink>
        </li>
        <li>
          <NavLink to={props.path + 'edit'}>Edit existing</NavLink>
        </li>
      </ul>
    ) : null}
  </div>
);

export default sidebarNestedItem;
