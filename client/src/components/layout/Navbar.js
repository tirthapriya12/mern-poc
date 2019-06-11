import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      redirectTo: null
    }
  }

  redirectTo(url) {
    this.setState({ redirectTo: url });
  }
  render() {
    if (!!this.state.redirectTo) {
      this.setState({ redirectTo: null });
      return <Redirect to={this.state.redirectTo} />;
    }
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="landing.html">
            DevConnector
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="profiles.html">
                  {' '}
                  Developers
                </a>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" onClick={this.redirectTo.bind(this, '/register')}>
                  Sign Up
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={this.redirectTo.bind(this, '/login')}>
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
