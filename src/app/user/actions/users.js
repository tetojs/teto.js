import { createAction } from 'redux-actions'

import Users from '../models/users'

export const getUser = createAction('GET_USER', payload => {
  return new Users().GET(payload)
})
