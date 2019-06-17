import { SET_CURRENT_USER } from '../actions/types';
import { stat } from 'fs';
const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {

    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!action.payload,
                user: action.payload
            }
        default:
            return state;
    }
}