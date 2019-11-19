import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Spinner from '../common/Spinner';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { CAREER_STATUS_OPTIONS, PROFILE_FORM_INFO_LIST } from '../../utils/constants';
import { getCurrentProfile } from '../../actions/profileAction';

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
    }

    render() {
        const { errors } = this.state,
            info = PROFILE_FORM_INFO_LIST;
        return (
            <section className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-primary">Back</Link>
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-muted text-center">Let's get some information to make your profile stand out</p>
                            <br />
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    type="text"
                                    error={errors.handle}
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    onChange={this.onChange.bind(this)}
                                    info={info.handle}
                                    value={this.state.handle} />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    options={CAREER_STATUS_OPTIONS}
                                    error={errors.status}
                                    info={info.status}
                                />
                                <TextFieldGroup
                                    type="text"
                                    error={errors.company}
                                    placeholder="* Profile Handle"
                                    name="company"
                                    onChange={this.onChange.bind(this)}
                                    info={info.company}
                                    value={this.state.company} />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStatetoProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStatetoProps)(CreateProfile);