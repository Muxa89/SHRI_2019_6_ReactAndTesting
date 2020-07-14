import * as React from 'react';

import Main from './Main/Main';
import Footer from './Footer/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.sass';

const App = (): React.ReactElement => (
  <div className='App'>
    <Main />
    <Footer />
  </div>
);

export default App;
