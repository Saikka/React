import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Navigation/Header/Header';
import News from './containers/News/News';
import Quidditch from './containers/Quidditch/Quidditch';
import Login from './containers/Login/Login';
import Manage from './containers/Manage/Manage';

function App() {
  return (
    <div
      className='App'
      style={{ height: '100vh', display: 'flex', flexFlow: 'column' }}
    >
      <Header />
      <Switch>
        <Route path='/quidditch' component={Quidditch} />
        <Route path='/login' component={Login} />
        <Route path='/manage' component={Manage} />
        <Route path='/' component={News} />
      </Switch>
    </div>
  );
}

export default App;
