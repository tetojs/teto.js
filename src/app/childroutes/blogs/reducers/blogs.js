import extend from 'extend'
import { appendReducer } from 'store'

function blogs ( state = {
  items: []
}, action ) {
  let m

  switch (true) {
    case !!(m = action.type.match(/^(FETCH_BLOGS)_(.+)?$/)):
    console.log('action.payload', action.payload)
      return action.payload && {
        items: action.payload, state: m[2]
      } || { ...state, state: m[2] }
    case 'CREATE_BLOG':
      return {
        items: [...state, {...action.payload}]
      }
    case 'DELETE_BLOG':
      return {
        items: state.filter(item => (item.id !== action.payload.id))
      }
    default:
      return state
  }
}

export default appendReducer({
  blogs
})
