import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import './assets/fonts/HarryP.ttf';
import './assets/fonts/WizardWorld.ttf';
import './assets/fonts/MagicSchool.ttf';

import App from './App';
import * as serviceWorker from './serviceWorker';
import newsReducer from './store/reducers/news';
import housesReducer from './store/reducers/houses';
import quidditchReducer from './store/reducers/quidditch';
import teachersReducer from './store/reducers/teachers';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  news: newsReducer,
  houses: housesReducer,
  quidditch: quidditchReducer,
  teachers: teachersReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
