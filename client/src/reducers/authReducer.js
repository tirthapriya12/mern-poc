import types from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {

    switch (action.type) {
        case types.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!action.payload.id,
                user: action.payload
            }
        default:
            return state;
    }
}