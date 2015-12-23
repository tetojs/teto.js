import { appendReducer } from 'store'
import { handleActions } from 'redux-actions'

const users = handleActions({

  GET_USER: (state, action) => ({
    ...state,
    [action.payload.user_id]: action.payload
  })

}, {})

export default appendReducer({ users })
