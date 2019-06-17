import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions'; 1
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { stat } from 'fs';
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

    }

    render() {
        return (
            <section>
                <div className="login">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Log In</h1>
                                <p className="lead text-center">Sign in to your DevConnector account</p>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" onChange={this.onChange} value={this.state.email} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" onChange={this.onChange} value={this.state.password} />
                                    </div>
                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    user: state.user,
    errors: state.errors
})
export default connect(mapStateToProps, { loginUser })(withRouter(Login))