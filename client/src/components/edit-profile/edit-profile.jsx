import React, { Component } from 'react';
import CreateProfile from '../create-profile/create-profile';

const EditProfile = (props) => {
    return (<CreateProfile editMode="true" {...props} />)
}

export default EditProfile;