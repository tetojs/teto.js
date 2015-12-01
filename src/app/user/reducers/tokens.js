import extend from 'extend'

import { appendReducer, actionTypeTransformer } from 'store'

function tokens (state = {
  login_name: 'admin@ndtest',
  password: '123456!@#',
  state: '',
  code: 0,
  message: ''
}, action) {
  let { actionType, actionState } = actionTypeTransformer(action.type)

  function defaults () {
    return extend({
      ...state
    }, {
      state: actionState
    })
  }

  if (!action.payload) {
    return defaults()
  }

  switch (actionType) {
    case 'POST_TOKEN':
      return {
        ...action.payload,
        state: actionState
      }
    default:
      return defaults()
  }
}

export default appendReducer({ tokens })
