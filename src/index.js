import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App';

import reducer from './store/reducers/root.js';

const store = createStore(reducer, applyMiddleware(thunk));
console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path={['/:repositoryId?/tree/:hash/:path([a-zA-Z0-9а-яА-Я._\\-/]+)', '/:repositoryId?/tree/:hash?', '/:repositoryId?']} component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
