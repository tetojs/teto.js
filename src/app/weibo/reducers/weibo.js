import { appendReducer, modifyReducer } from 'store'

const weibo = modifyReducer((state = {
  count: 0,
  items: [],
  finished: false,
  state: '',
  code: 0,
  message: ''
}, action) => {
  switch (actionType) {
    case 'FETCH_WEIBOS':
      return {
        ...action.payload,
        state: action.state
      }
    case 'CREATE_WEIBO':
      return {
        ...state,
        count: state.count + 1,
        items: [ ...state.items, action.payload ],
        state: action.state
      }
    default:
      return state
  }
})

export default appendReducer({ weibo })
