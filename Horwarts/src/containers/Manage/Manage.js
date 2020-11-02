import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import classes from './Manage.module.css';
import SidebarManage from '../../components/Navigation/Sidebars/SidebarManage/SidebarManage';
import TeacherForm from '../../components/Forms/TeacherForm/TeacherForm';
import MatchForm from '../../components/Forms/MatchForm/MatchForm';
import NewsForm from '../../components/Forms/NewsForm/NewsForm';
import NewsList from '../../components/Lists/NewsList/NewsList';
import QuidditchList from '../../components/Lists/QuidditchList/QuidditchList';
import TeachesList from '../../components/Lists/TeachersList/TeachersList';

class Manage extends Component {
  render() {
    return (
      <div className={classes.Manage}>
        <SidebarManage />
        <Switch>
          <Route path='/manage/matches/add' component={MatchForm} />
          <Route path='/manage/matches/edit/:id' component={MatchForm} />
          <Route path='/manage/matches/edit' component={QuidditchList} />
          <Route path='/manage/teachers/add' component={TeacherForm} />
          <Route path='/manage/teachers/edit/:id' component={TeacherForm} />
          <Route path='/manage/teachers/edit' component={TeachesList} />
          <Route path='/manage/news/add' component={NewsForm} />
          <Route path='/manage/news/edit/:id' component={NewsForm} />
          <Route path='/manage/news/edit' component={NewsList} />
        </Switch>
      </div>
    );
  }
}

export default Manage;
