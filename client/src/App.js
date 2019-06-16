import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';


import AppRoutes from './routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppRoutes ></AppRoutes>
        </div>
      </Provider>
    );
  }
}

export default App;
