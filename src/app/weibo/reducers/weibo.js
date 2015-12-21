import { appendReducer } from 'store'
import { handleActions } from 'redux-actions'

// import { PENDING/*, SUCCESS, FAILURE*/, FINALLY } from 'utils/states'

const weibo = handleActions({

  FETCH_WEIBOS: (state, action) => ({
    ...state, ...action.payload
  }),

  CREATE_WEIBO: (state, action) => ({
    ...state, ...action.payload
  })

}, {})

export default appendReducer({ weibo })
