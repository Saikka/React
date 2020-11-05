import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import classes from './Teacher.module.css';
import Sidebar from '../../components/Navigation/Sidebars/Sidebar/Sidebar';
import Info from '../../components/Info/Info';
import Timetalbe from '../../components/Timetable/Timetable';

class Teacher extends Component {
  render() {
    return (
      <div className={classes.Teacher}>
        <Sidebar />
        <Switch>
          <Route path='/teacher/info' component={Info} />
          <Route path='/teacher/timetable' component={Timetalbe} />
        </Switch>
      </div>
    );
  }
}

export default Teacher;
