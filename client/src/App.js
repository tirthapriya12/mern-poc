import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import jwt_decode from 'jwt-decode';
import AppRoutes from './routes';
import './App.css';

//check for token
if (localStorage.jwtToken && localStorage.jwtToken != 'undefined') {
  //set auth token to axios header
  setAuthToken(localStorage.jwtToken);
  // decode token and get user details
  let decoded = jwt_decode(localStorage.jwtToken);
  //set user isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}


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
