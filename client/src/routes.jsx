import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/create-profile';
import EditProfile from './components/edit-profile/edit-profile';

export default class AppRoutes extends Component {

    render() {
        return (
            <Router>
                <Navbar />
                <Route path="/" exact component={Landing}></Route>
                <div className="container">
                    <Route path="/register" exact component={Register}></Route>
                    <Route path="/login" exact component={Login}></Route>
                </div>
                <Switch>
                    <PrivateRoute path="/dashboard" exact component={Dashboard}></PrivateRoute>
                    <PrivateRoute path="/create-profile" exact component={CreateProfile}></PrivateRoute>
                    <PrivateRoute path="/edit-profile" exact component={EditProfile}></PrivateRoute>
                </Switch>

                <Footer />
            </Router>
        )
    }

}