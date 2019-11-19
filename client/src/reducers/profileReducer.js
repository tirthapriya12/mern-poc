import types from '../actions/types';
import { stat } from 'fs';

const initialState = {
    profile: null,
    profiles: null,
    loading: false
}

export default function (state = initialState, action) {

    switch (action.type) {
        case types.GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case types.PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.CLEAR_PROFILE:
            return {
                ...state,
                profile: null
            }
        default:
            return state;
    }
}