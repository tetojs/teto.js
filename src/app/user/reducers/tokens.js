import { appendReducer, modifyReducer } from 'store'

const tokens = modifyReducer((state = {
  meta: {
    state: '',
    message: ''
  },
  token: null
}, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        meta: action.meta,
        token: action.payload
      }
    case 'POST_TOKEN':
      return {
        meta: action.meta,
        token: action.payload
      }
    case 'DELETE_TOKEN':
      return {
        meta: action.meta,
        token: null
      }
    default:
      return state
  }
})

export default appendReducer({ tokens })
