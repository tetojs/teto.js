import Tokens from '../models/tokens'

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
