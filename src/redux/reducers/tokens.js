import { handleActions } from 'redux-actions'

export default handleActions({

  LOGIN: (state, action) => {
    const diff = new Date(action.payload.expires_at) - Date.now()

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
