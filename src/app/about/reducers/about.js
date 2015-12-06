import { appendReducer, modifyReducer } from 'store'

const about = modifyReducer((state = {
  state: '',
  code: 0,
  message: ''
}, action) => {
  switch (actionType) {
    case 'FETCH_ABOUT':
    case 'MODIFY_ABOUT':
      return {
        ...state,
        ...action.payload,
        state: action.state
      }
    default:
      return state
  }
})

export default appendReducer({ about })
