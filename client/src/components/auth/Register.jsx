import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}

        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    onSubmit(e) {
        e.preventDefault();
        let newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.registerUser(newUser, this.props.history)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        let { errors } = this.state,
            { auth } = this.props;
        return (
            <div>
                <div className="register">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h1 className="display-4 text-center">Sign Up</h1>
                                <p className="lead text-center">Create your DevConnector account</p>
                                <form onSubmit={this.onSubmit}>

                                    <TextFieldGroup type="text" error={errors.name} placeholder="Name" name="name" onChange={this.onChange} value={this.state.name} />
                                    <TextFieldGroup type="email" info="This site uses Gravatar so if you want a profile image, use a Gravatar email" error={errors.email} placeholder="Email Address" name="email" onChange={this.onChange} value={this.state.email} />
                                    <TextFieldGroup type="password" error={errors.password} placeholder="Password" name="password" onChange={this.onChange} value={this.state.password} />
                                    <TextFieldGroup type="password" error={errors.password2} placeholder="Confirm Password" name="password2" onChange={this.onChange} value={this.state.password2} />
                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps, { registerUser })(withRouter(Register));