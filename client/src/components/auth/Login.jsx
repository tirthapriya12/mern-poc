import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        let userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData);

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    render() {
        const { errors } = this.state;
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
                                        <input type="email" className={classNames("form-control form-control-lg", { "is-invalid": errors.email })} placeholder="Email Address" name="email" onChange={this.onChange} value={this.state.email} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className={classNames("form-control form-control-lg", { "is-invalid": errors.password })} placeholder="Password" name="password" onChange={this.onChange} value={this.state.password} />
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
    loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        loginUser
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))