import { SET_CURRENT_USER, GET_ERRORS } from './types';
import axios from 'axios';

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