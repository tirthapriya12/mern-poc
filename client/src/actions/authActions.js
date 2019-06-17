import { SET_CURRENT_USER, GET_ERRORS } from './types';
import axios from 'axios';
import { setAuthToken } from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


export const registerUser = (userData, history) => (dispatch) => {
    axios.post('api/users/register', userData)
        .then((res) => {
            history.push('/login')
            // this.setState({ ...res.data, error: null });
        }).catch((err) => {
            dispatch({
                action: GET_ERRORS,
                payload: err.response.data
            })
            // this.setState({ errors: err.response.data })
        });
}

export const loginUser = (userData, history) => (dispatch) => {
    axios.post('api/users/register', userData)
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
            // this.setState({ errors: err.response.data })
        });
}

export const setCurrentUser = (decoded) => ({
    action: SET_CURRENT_USER,
    payload: decoded
})