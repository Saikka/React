import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Header.module.css';
import Aux from '../../../hoc/Auxillary/Auxillary';

const header = () => (
  <Aux>
    <div className={classes.Header}>
      <h1>Hogwarts</h1>
    </div>
    <div className={classes.Navigation}>
      <ul>
        <li>
          <NavLink exact to='/' activeClassName={classes.active}>
            News
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/quidditch' activeClassName={classes.active}>
            Quidditch
          </NavLink>
        </li>
        <li>
          <NavLink to='/login'>Login</NavLink>
        </li>
        <li>
          <NavLink to='/manage'>Manage</NavLink>
        </li>
      </ul>
    </div>
  </Aux>
);

export default header;
