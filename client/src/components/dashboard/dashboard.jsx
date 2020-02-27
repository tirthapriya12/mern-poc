import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Spinner from '../common/Spinner';
import { getCurrentProfile } from '../../actions/profileAction';
import ActionableTable from '../common/ActionableTable';

class Dashboard extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const { user } = this.props.auth;
        this.props.getCurrentProfile(user);
    }


    createProfile() {
        this.props.history.push('/create-profile')
    }

    onTableItemDelete = (d)=>{
        console.log(d);
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        let dashboardContent = '',
            withProfileContent = (
                <div className="btn-group mb-4" role="group">
                    <Link to="/edit-profile" className="btn btn-light">
                        <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
                    <Link to="/add-experience" className="btn btn-light">
                        <i className="fab fa-black-tie text-info mr-1"></i>
                        Add Experience</Link>
                    <Link to="/add-education" className="btn btn-light">
                        <i className="fas fa-graduation-cap text-info mr-1"></i>
                        Add Education</Link>
                </div>
            ),
            setProfileContent = (
                <div class="lead text-muted">
                    <h3>Ooops It seems you haven't setup your Profile yet!!</h3>
                    <button onClick={this.createProfile.bind(this)} class="btn btn-lg btn-info">Create Profile</button>
                </div>
            )


        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {
            dashboardContent = (
                <>
                    <h1 className="display-4">Dashboard</h1>
                    <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>

                    {(Object.keys(profile).length > 0) ? withProfileContent : setProfileContent}

                    <div className="container">
                        <div className="row">
                            <h4>Experience Credentials</h4>
                            {profile.experience && profile.experience.length ?
                                (<ActionableTable tableData={profile.experience} actions={[{ 'name': 'Delete', action: this.onTableItemDelete }]} />) :
                                (<p> No experience added</p>)
                            }
                        </div>
                    </div>
                </>
            );
        }
        return (
            <>
                <div className="dashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {dashboardContent}
                            </div>
                        </div>
                    </div>
                </div>
            </>);
    }
}

const mapStatetoProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

export default connect(mapStatetoProps, { getCurrentProfile })(Dashboard);