import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

import './App.scss';

import reducer from './store/reducers/root.js';

const store = createStore(reducer);
store.subscribe(() => console.log(store.getState()));

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
