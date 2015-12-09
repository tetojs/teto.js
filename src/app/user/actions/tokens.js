import Tokens from '../models/tokens'
import Users from '../models/users'
export function postToken (payload) {
  return {
    type: 'POST_TOKEN',
    payload: new Tokens().POST(payload)
  }
}

export function deleteToken (payload) {
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
        return new Users().GET(result.user_id)
          .then(_result => {
            return {
              ...result,
              ..._result
            }
          })
      })
  }
}