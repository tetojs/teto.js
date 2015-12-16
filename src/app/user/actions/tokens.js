import { createAction } from 'redux-actions'

import Tokens from '../models/tokens'
import Users from '../models/users'

export const userLogin = createAction('USER_LOGIN', payload => {
  return new Tokens().POST(payload)
    .then(result => new Users().GET(result.user_id)
      .then(_result => {
        return {
          ...result,
          ..._result
        }
      }))
})

export const userLogout = createAction('USER_LOGIN', payload => {
  return new Tokens().DELETE(payload)
    // 设置为 null，以清除本地缓存
    .then(result => null)
})
