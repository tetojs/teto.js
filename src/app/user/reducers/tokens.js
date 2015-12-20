import { appendReducer, modifyReducer } from 'store'
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

}, {
  // meta: {
    // state: FINALLY,
    // message: ''
  // },
})

// const tokens = modifyReducer((state = {
//   meta: {
//     state: FINALLY,
//     message: ''
//   },
//   token: null
// }, action) => {
//   let { meta, payload } = action

//   if (meta.state & (PENDING | FINALLY)) {
//     payload = state.token
//   }

//   switch (action.type) {
//     case 'USER_LOGIN':
//       return {
//         meta: meta,
//         token: payload
//       }
//     case 'USER_LOGOUT':
//       return {
//         meta: meta,
//         token: payload
//       }
//     default:
//       return state
//   }
// })

export default appendReducer({ tokens })
