import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';

import './App.scss';

import reducer from '../store/reducers/root.js';

import { loadFiles } from '../store/actions/filesActions.js';

const store = createStore(reducer, applyMiddleware(thunk));
console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

store.dispatch(loadFiles());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <Header />
          <Main />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;
