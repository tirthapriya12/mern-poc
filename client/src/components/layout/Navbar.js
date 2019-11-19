import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { clearCurrentProfile } from '../../actions/profileAction';

class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      redirectTo: null
    }
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.redirectTo('/');
    }
  }

  redirectTo(url) {
    this.setState({ redirectTo: url });
  }
  render() {
    const isAuthenticated = this.props.auth.isAuthenticated;
    const user = this.props.auth.user;
    const authLinks = (
      <>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/profiles">
              {' '}
              Developers
                </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              to="/post"
              className="nav-link"
            >Post Feed</Link>
          </li>
          <li className="nav-item">
            <Link
              to="/dashboard"
              className="nav-link"
            >Dashboard</Link>
          </li>
          <li className="nav-item">
            <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              <img
                className="rounded-circle"
                src={user.avatar}
                alt={user.name}
                style={{ width: '25px', marginRight: '5px' }}
                title="You must have a Gravatar connected to your email to display an image"
              />{' '}
              Logout
          </a>
          </li>
        </ul>
      </>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
