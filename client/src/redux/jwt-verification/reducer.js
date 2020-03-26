import * as types from './action-types'
const initialState = {
    token: null,
    isAuthenticated: false,
    id: null,
    username: null
}

export default function reducer(state = initialState, action) {
    console.log('ACTION', action);
    switch (action.type) {
        case types.ADD:
            if (!action.token)
                return {
                    ...state,
                    isAuthenticated: false,
                    token: null,
                    id: null,
                    username: null
                };
            return {
                ...state,
                isAuthenticated: true,
                token: action.token,
                id: action.id,
                username: action.username
            };
        case types.REMOVE:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                id: null,
                username: null
            };
        default:
            return {...state };
    }
}