import extend from 'extend'

import { appendReducer, actionTypeTransformer } from 'store'

function blogs (state = {
  count: 0,
  items: [],
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
    case 'FETCH_BLOGS':
      return {
        ...action.payload,
        state: actionState
      }
    case 'CREATE_BLOG':
      return extend({
        ...state
      }, {
        items: [ ...state.items, action.payload ],
        state: actionState
      })
    case 'DELETE_BLOG':
      return {
        items: state.items.filter(item => item.id !== action.payload.id),
        state: actionState
      }
    default:
      return defaults()
  }
}

export default appendReducer({ blogs })
