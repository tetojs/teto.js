import { handleActions } from 'redux-actions'

export default handleActions({

  LOGIN: (state, action) => {
    const diff = new Date(action.payload.server_time).getTime() - Date.now()
    return {
      ...state,
      diff,
      ...action.payload
    }
  },

  LOGOUT: (state, action) => ({
    ...action.payload
  })

}, {})
