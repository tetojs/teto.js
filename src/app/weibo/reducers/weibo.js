import extend from 'extend'

import { appendReducer, actionTypeTransformer } from 'store'

function weibo (state = {
  count: 0,
  items: [],
  finished: false,
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
    case 'FETCH_WEIBOS':
      return {
        ...action.payload,
        state: actionState
      }
    case 'CREATE_WEIBO':
      return extend({
        ...state
      }, {
        items: [ ...state.items, action.payload ],
        state: actionState
      })
    case 'DELETE_WEIBO':
      return {
        items: state.items.filter(item => item.id !== action.payload.id),
        state: actionState
      }
    default:
      return defaults()
  }
}

export default appendReducer({ weibo })
