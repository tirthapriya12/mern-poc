import axios from 'axios';
import types from './types';

const { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_PROFILE } = types;
//get curent profile
export const getCurrentProfile = (user) => (dispatch) => {
    dispatch(setProfileLoading());
    axios.get('api/profile/', user)
        .then((resp) => {
            dispatch({ type: GET_PROFILE, payload: resp.data })
        })
        .catch((err) => dispatch({ type: GET_PROFILE, payload: {} }))
}

export const createCurrentProfile = (profileData, history, isEditMode) => (dispatch) => {
    axios.post('api/profile', profileData)
        .then((res) => {
            if (isEditMode)
                alert('Profile Created');
            else
                alert('Profile edited')
            history.push('/dashboard')
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
export const setProfileLoading = () => {
    return { type: PROFILE_LOADING }
}

export const clearCurrentProfile = () => {
    return { type: CLEAR_PROFILE }
}
