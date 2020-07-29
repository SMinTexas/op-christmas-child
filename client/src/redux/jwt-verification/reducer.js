import * as types from './action-types'
const initialState = {
    token: null,
    isAuthenticated: false,
    id: null,
    username: null,
    password: null
}

export default function reducer(state = initialState, action) {
    console.log('ACTION', action);
    switch (action.type) {
        case types.ADD:
            // console.log('case types.ADD: (token) = ', action.token)
            // console.log('case types.ADD: (id) = ', action.id)
            // console.log('case types.ADD: (state) = ', state)
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
        case types.VERIFY:
            // if (!action.token)
            //     return {
            //         ...state,
            //         isAuthenticated: false,
            //         token: null,
            //         id: null,
            //         username: null,
            //         password: null
            //     };
            let stateToken, stateId, stateUsername, statePassword
            console.log('case types.VERIFY: (token) = ', action.token)
            console.log('case types.VERIFY: (id) = ', action.id)
            console.log('case types.VERIFY: (state) = ', state)
            if (!action.token) {
                stateToken = state.token
                stateId = state.id
                stateUsername = state.username
                statePassword = state.password
                console.log('WHEN THE ACTION.TOKEN IS UNDEFINED = ', stateToken)
            }
            return {
                ...state,
                isAuthenticated: true,
                //token: action.token,
                // id: action.id,
                // username: action.username,
                // password: action.password
                token: stateToken,
                id: stateId,
                username: stateUsername,
                password: statePassword
            };
        default:
            return {...state };
    }
}