import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import types from './types';

const { GET_ERRORS, SET_CURRENT_USER } = types;

export const registerUser = (userData, history) => (dispatch) => {
    axios.post('api/users/register', userData)
        .then((res) => {
            history.push('/login')
        }).catch((err) => {
            dispatch({
                type: types.GET_ERRORS,
                payload: err.response.data
            })

        });
}

export const loginUser = (userData) => (dispatch) => {
    axios.post('api/users/login', userData)
        .then((res) => {
            let token = res.data.token;
            //set the user token to localstorage
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded))
        }).catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })

        });
}

export const setCurrentUser = (decoded) => ({
    type: types.SET_CURRENT_USER,
    payload: decoded
})

export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};