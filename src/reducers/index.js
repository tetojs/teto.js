import { combineReducers } from 'redux'

import blogs from './blogs'
import todos from './todos'

export default combineReducers({ blogs, todos })
