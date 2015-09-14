import { combineReducers } from 'redux'

import { default as profile } from './profile'
import { default as counter } from './counter'

export default combineReducers({ profile, counter })
