import { combineReducers } from 'redux'

import { default as todos } from './todos'
import { default as profile } from './profile'
import { default as counter } from './counter'

export default combineReducers({ todos, profile, counter })
