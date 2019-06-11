import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
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
                <Footer />
            </Router>
        )
    }

}