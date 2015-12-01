import Tokens from '../models/tokens'

export function postToken (payload) {
  return {
    type: 'POST_TOKEN',
    payload: new Tokens().POST({
      data: payload
    })
  }
}
