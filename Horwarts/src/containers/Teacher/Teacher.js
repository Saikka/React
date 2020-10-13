import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import Info from '../../components/Info/Info';
import Timetable from '../../components/Timetable/Timetable';
import classes from './Teacher.module.css';

class Teacher extends Component {
  render() {
    return (
      <div className={classes.Teacher}>
        <Sidebar />
        <Switch>
          <Route path='/teacher/info' exact component={Info} />
          <Route path='/teacher/timetable' exact component={Timetable} />
        </Switch>
      </div>
    );
  }
}

export default Teacher;
