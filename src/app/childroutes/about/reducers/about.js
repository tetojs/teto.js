import extend from 'extend'

import { appendReducer, actionTypeTransformer } from 'store'

function about (state = {
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
    case 'FETCH_ABOUT':
      return extend({ ...state }, action.payload, {
        state: actionState
      })
    case 'MODIFY_ABOUT':
      return extend({ ...state }, action.payload, {
        state: actionState
      })
    default:
      return defaults()
  }
}

export default appendReducer({ about })
