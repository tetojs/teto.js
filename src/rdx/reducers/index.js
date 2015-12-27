import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import tokens from './tokens'
import users from './users'

export default combineReducers({
  tokens,
  users,
  router: routeReducer
})
