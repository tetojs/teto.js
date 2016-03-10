import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import tokens from './reducers/tokens'
import users from './reducers/users'

export default combineReducers({
  tokens,
  users,
  router
})
