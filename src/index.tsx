import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
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
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
