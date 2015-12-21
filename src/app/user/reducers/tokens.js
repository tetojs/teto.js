import { appendReducer } from 'store'
import { handleActions } from 'redux-actions'

// import { PENDING/*, SUCCESS, FAILURE*/, FINALLY } from 'utils/states'

const tokens = handleActions({

  USER_TOKEN: (state, action) => ({
    ...state, ...action.payload
  }),

  USER_FETCH: (state, action) => ({
    ...state, ...action.payload
  }),

  USER_LOGIN: (state, action) => ({
    ...action.payload
  }),

  USER_LOGOUT: (state, action) => ({
    ...action.payload
  })

}, {})

export default appendReducer({ tokens })
