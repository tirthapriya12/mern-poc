import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import jwt_decode from 'jwt-decode';
import AppRoutes from './routes';
import './App.css';

//check for token
if (localStorage.jwtToken && localStorage.jwtToken !== 'undefined') {
  //set auth token to axios header
  setAuthToken(localStorage.jwtToken);
  // decode token and get user details
  let decoded = jwt_decode(localStorage.jwtToken);
  //set user isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  let now = Date.now() / 1000;
  //if token has expired logout the user
  if (decoded.exp < now){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
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
