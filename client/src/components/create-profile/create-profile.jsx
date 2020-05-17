import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Spinner from '../common/Spinner';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import Autocomplete from '../common/Autocomplete';
import InputGroup from '../common/InputGroup';
import { CAREER_STATUS_OPTIONS, PROFILE_FORM_INFO_LIST, SKILL_LIST } from '../../utils/constants';
import { createCurrentProfile, getCurrentProfile } from '../../actions/profileAction';




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

    componentDidMount() {
        console.log(this.props.auth);
        const { user } = this.props.auth;
        this.props.getCurrentProfile(user);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
        if (nextProps.profile.profile) {
            this.setState({
                handle: nextProps.profile.profile.handle,
                company: nextProps.profile.profile.company || '',
                website: nextProps.profile.profile.website || '',
                location: nextProps.profile.profile.location || '',
                status: nextProps.profile.profile.status || '',
                skills: (nextProps.profile.profile.skills && nextProps.profile.profile.skills.join()) || '',
                githubusername: nextProps.profile.profile.githubusername || '',
                bio: nextProps.profile.profile.bio || '',
                twitter: nextProps.profile.profile.twitter || '',
                facebook: nextProps.profile.profile.facebook || '',
                linkedin: nextProps.profile.profile.linkedin || '',
                youtube: nextProps.profile.profile.youtube || '',
                instagram: nextProps.profile.profile.instagram || ''
            })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };
        this.props.createCurrentProfile(profileData, this.props.history, this.props.editMode);
    }

    render() {
        const { errors } = this.state,
            info = PROFILE_FORM_INFO_LIST;
        const socialNetworkDetails = (
            <>
                <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                />

                <InputGroup
                    placeholder="Facebook Page URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                />

                <InputGroup
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                />

                <InputGroup
                    placeholder="YouTube Channel URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                />

                <InputGroup
                    placeholder="Instagram Page URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}
                />
            </>
        );
        return (
            <section className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-primary">Back</Link>
                            {(!this.props.editMode) ?
                                (<h1 className="display-4 text-center">Create Your Profile</h1>) :
                                (<h1 className="display-4 text-center">Edit Your Profile</h1>)}
                            <p className="lead text-muted text-center">Let's get some information to make your profile stand out</p>
                            <br />
                            <small className="d-block pb-3">* = required field</small>
                            <form autocomplete="off" onSubmit={this.onSubmit.bind(this)}>
                                <TextFieldGroup
                                    type="text"
                                    error={errors.handle}
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    onChange={this.onChange.bind(this)}
                                    info={info.handle}
                                    value={this.state.handle} />
                                <SelectListGroup
                                    placeholder="* Status"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange.bind(this)}
                                    options={CAREER_STATUS_OPTIONS}
                                    error={errors.status}
                                    info={info.status}
                                />
                                <TextFieldGroup
                                    type="text"
                                    error={errors.company}
                                    placeholder="Company"
                                    name="company"
                                    onChange={this.onChange.bind(this)}
                                    info={info.company}
                                    value={this.state.company} />
                                <TextFieldGroup
                                    type="text"
                                    error={errors.website}
                                    placeholder="Website"
                                    name="website"
                                    onChange={this.onChange.bind(this)}
                                    info={info.website}
                                    value={this.state.website} />
                                <TextFieldGroup
                                    type="text"
                                    error={errors.location}
                                    placeholder="Location"
                                    name="location"
                                    onChange={this.onChange.bind(this)}
                                    info={info.location}
                                    value={this.state.location} />
                                {/* <Autocomplete
                                    name="skills"
                                    suggestions={SKILL_LIST}
                                    onChange={() => { }}
                                    type="text"
                                    error={errors.skills}
                                    placeholder="* Skills"
                                    name="skills"
                                    onChange={this.onChange.bind(this)}
                                    info={info.skills}
                                    value={this.state.skills}
                                /> */}
                                <TextFieldGroup
                                    type="text"
                                    error={errors.skills}
                                    placeholder="* Skills"
                                    name="skills"
                                    onChange={this.onChange.bind(this)}
                                    info={info.skills}
                                    value={this.state.skills} />
                                <TextFieldGroup
                                    type="text"
                                    error={errors.githubusername}
                                    placeholder="githubusername"
                                    name="githubusername"
                                    onChange={this.onChange.bind(this)}
                                    info={info.githubusername}
                                    value={this.state.githubusername} />
                                <TextAreaFieldGroup
                                    type="text"
                                    error={errors.bio}
                                    placeholder="Bio"
                                    name="bio"
                                    onChange={this.onChange.bind(this)}
                                    info={info.bio}
                                    value={this.state.bio} />
                                <button onClick={(e) => { e.preventDefault(); this.setState({ ...this.state, displaySocialInputs: !this.state.displaySocialInputs }) }} className="btn" >Add Social Network Links</button>
                                <small className="text-muted"> Optional</small>
                                <br /><br />
                                {this.state.displaySocialInputs ? (socialNetworkDetails) : ''}
                                <button style={{ width: '100%' }} className="btn-info btn" type="submit">Submit</button>
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
    errors: state.errors,
    auth: state.auth
});

const styles = {}
export default connect(mapStatetoProps, { createCurrentProfile, getCurrentProfile })(CreateProfile);