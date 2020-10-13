import React from 'react';

import classes from './Sidebar.module.css';
import SidebarItem from './SidebarItem/SidebarItem';

const sidebar = () => (
  <div className={classes.Sidebar}>
    <SidebarItem name='Info' path='/teacher/info' />
    <SidebarItem name='Timetable' path='/teacher/timetable' />
  </div>
);

export default sidebar;
