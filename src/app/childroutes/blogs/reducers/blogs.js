import { appendReducer } from 'store'

function blogs (state = {
  items: [],
  state: 'PENDING'
}, action) {
  switch (action.type) {
    case 'FETCH_BLOGS_PENDING':
    case 'FETCH_BLOGS_SUCCESS':
    case 'FETCH_BLOGS_FAILURE':
    case 'FETCH_BLOGS_FINALLY':
      console.log('action.payload', action.payload)
      if (action.payload) {
        return {
          items: action.payload, state: action.type.substring(12)
        }
      }
      let { items } = state
      return { items: { ...items }, state: action.type.substring(12) }
    case 'CREATE_BLOG':
      return {
        items: [ ...state, { ...action.payload } ]
      }
    case 'DELETE_BLOG':
      return {
        items: state.filter(item => (item.id !== action.payload.id))
      }
    default:
      return state
  }
}

export default appendReducer({ blogs })
