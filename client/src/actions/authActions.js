import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


export const registerUser = (userData, history) => (dispatch) => {
    axios.post('api/users/register', userData)
        .then((res) => {
            history.push('/login')
        }).catch((err) => {
            dispatch({
                action: GET_ERRORS,
                payload: err.response.data
            })
            
        });
}

export const loginUser = (userData) => (dispatch) => {
    axios.post('api/users/login', userData)
        .then((res) => {
            let token = res.token;
            //set the user token to localstorage
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded))
        }).catch((err) => {
            dispatch({
                action: GET_ERRORS,
                payload: err.response.data
            })
            
        });
}

export const setCurrentUser = (decoded) => ({
    action: SET_CURRENT_USER,
    payload: decoded
})