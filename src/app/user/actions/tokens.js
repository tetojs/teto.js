import Tokens from '../models/tokens'
import Users from '../models/users'

import Promise from 'promise'

export const postToken = (payload) => {
  return {
    type: 'POST_TOKEN',
    payload: new Tokens().POST(payload)
  }
}

export const deleteToken = (payload) => {
  return {
    type: 'DELETE_TOKEN',
    payload: new Tokens().DELETE(payload)
  }
}

export const userLogin = (payload) => {
  return {
    type: 'USER_LOGIN',
    payload: new Tokens().POST(payload)
      .then(result => {
        return new Promise((resolve, reject) => {
          new Users().GET(result.user_id)
          .then(_result => {
            resolve({
              ...result,
              ..._result
            })
          }, reject)
        })
      })
  }
}
