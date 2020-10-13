import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import Info from '../../components/Info/Info';
import Timetable from '../../components/Timetable/Timetable';
import classes from './Teacher.module.css';

class Student extends Component {
  render() {
    return (
      <div className={classes.Student}>
        <Sidebar />
        <Switch>
          <Route path='/student/info' exact component={Info} />
          <Route path='/student/timetable' exact component={Timetable} />
        </Switch>
      </div>
    );
  }
}

export default Student;
