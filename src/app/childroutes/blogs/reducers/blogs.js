import extend from 'extend'
import { appendReducer } from 'store'

function blogs ( state = [], action ) {
  switch (action.type) {
    case 'FETCH_BLOGS':
      return action.payload && [...action.payload] || []
    case 'CREATE_BLOG':
      return [...state, {...action.payload}]
    case 'DELETE_BLOG':
      return state.filter(item => (item.id !== action.payload.id))
    default:
      return state
  }
}

export default appendReducer({
  blogs
})
