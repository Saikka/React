import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions';
import Header from './components/Navigation/Header/Header';
import News from './containers/News/News';
import Quidditch from './containers/Quidditch/Quidditch';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Manage from './containers/Manage/Manage';
import Teacher from './containers/Teacher/Teacher';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }
  render() {
    return (
      <div
        className='App'
        style={{ height: '100vh', display: 'flex', flexFlow: 'column' }}
      >
        <Header isAuthenticated={this.props.isAuthenticated} />
        <Switch>
          <Route path='/quidditch' component={Quidditch} />
          <Route path='/manage' component={Manage} />
          <Route path='/teacher' component={Teacher} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={News} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
