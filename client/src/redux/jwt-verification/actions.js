import * as types from './action-types'

export const remove = () => ({ type: types.REMOVE })
export const verify = () => ({ type: types.VERIFY })
export const add = (token, id, username) => ({ type: types.ADD, token, id, username })