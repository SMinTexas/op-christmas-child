import * as types from './action-types'

export const remove = () => ({ type: types.REMOVE })
    // export const verify = () => ({ type: types.VERIFY })
    //export const verify = (token) => ({ type: types.VERIFY, token })
export const verify = (token, id, username, password) => ({ type: types.VERIFY, token, id, username, password })
export const add = (token, id, username, password) => ({ type: types.ADD, token, id, username, password })