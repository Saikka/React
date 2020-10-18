import React from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Navigation/Header/Header';
import News from './containers/News/News';
import Quidditch from './containers/Quidditch/Quidditch';
import Login from './containers/Login/Login';
import Teacher from './containers/Teacher/Teacher';
import MatchForm from './containers/Forms/MatchForm/MatchForm';

function App() {
  return (
    <div
      className='App'
      style={{ height: '100vh', display: 'flex', flexFlow: 'column' }}
    >
      <Header />
      <Route path='/' exact component={News} />
      <Route path='/quidditch' exact component={Quidditch} />
      <Route path='/login' exact component={Login} />
      <Route path='/teacher' component={Teacher} />
      <Route path='/quidditch/add-match' exact component={MatchForm} />
    </div>
  );
}

export default App;
