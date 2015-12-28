import { handleActions } from 'redux-actions'

import arr2obj from 'utils/arr2obj'

export default handleActions({

  FETCH_USER: (state, action) => ({
    ...state,
    [action.payload.user_id]: action.payload
  }),

  FETCH_USERS: (state, action) => ({
    ...state,
    ...arr2obj(action.payload.items, 'user_id')
  }),

  FETCH_USERS_RESTFUL: (state, action) => ({
    ...state,
    ...action.payload
  })

}, {})
