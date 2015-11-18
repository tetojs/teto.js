import extend from 'extend'
import { appendReducer } from 'store'

function about ( state = {}, action ) {
  switch (action.type) {
    case 'FETCH_ABOUT':
      return {...action.payload} || {}
    case 'MODIFY_ABOUT':
      return extend({}, state, action.payload)
    default:
      return state
  }
}

export default appendReducer({
  about
})
