import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import classes from './Manage.module.css';
import SidebarManage from '../../components/Navigation/Sidebars/SidebarManage/SidebarManage';
import TeacherForm from '../../components/Forms/TeacherForm/TeacherForm';
import MatchForm from '../../components/Forms/MatchForm/MatchForm';
import NewsForm from '../../components/Forms/NewsForm/NewsForm';

class Manage extends Component {
  render() {
    return (
      <div className={classes.Manage}>
        <SidebarManage />
        <Switch>
          <Route path='/manage/matches/add' component={MatchForm} />
          <Route path='/manage/teachers/add' component={TeacherForm} />
          <Route path='/manage/news/add' component={NewsForm} />
        </Switch>
      </div>
    );
  }
}

export default Manage;
