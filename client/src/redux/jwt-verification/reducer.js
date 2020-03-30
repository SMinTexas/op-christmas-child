import * as types from './action-types'
const initialState = {
    token: null,
    isAuthenticated: false,
    id: null,
    username: null,
    password: null
}

export default function reducer(state = initialState, action) {
    //console.log('ACTION', action);
    switch (action.type) {
        case types.ADD:
            if (!action.token)
                return {
                    ...state,
                    isAuthenticated: false,
                    token: null,
                    id: null,
                    username: null,
                    password: null
                };
            return {
                ...state,
                isAuthenticated: true,
                token: action.token,
                id: action.id,
                username: action.username,
                password: action.password
            };
        case types.REMOVE:
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                id: null,
                username: null,
                password: null
            };
        default:
            return {...state };
    }
}