import { createAction } from 'redux-actions'

import Tokens from '../models/tokens'
import Users from '../models/users'

export const userToken = createAction('USER_TOKEN', payload => {
  return new Tokens().POST(payload)
})

export const userFetch = createAction('USER_FETCH', payload => {
  return new Users().GET(payload)
})

export const userLogout = createAction('USER_LOGOUT', payload => {
  return new Tokens().DELETE(payload)
    // 设置为 null，以清除本地缓存
    .then(() => null)
})
