import axios from 'axios';
import types from './types';

const { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_PROFILE } = types;
//get curent profile
export const getCurrentProfile = (user) => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('api/profile/', user)
        .then((data) => {
            dispatch({ type: GET_PROFILE, payload: data })
        })
        .catch((err) => dispatch({ type: GET_PROFILE, payload: {} }))
}

export const setProfileLoading = () => {
    return { type: PROFILE_LOADING }
}

export const clearCurrentProfile = () => {
    return { type: CLEAR_PROFILE }
}