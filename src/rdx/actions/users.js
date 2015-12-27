import { createAction } from 'redux-actions'

import Users from '../models/users'
import OrganizationUsers from '../models/organization-users'

export const fetchUser = createAction('FETCH_USER',
  payload => new Users().GET(payload))

export const fetchUsers = createAction('FETCH_USERS',
  payload => new OrganizationUsers().GET(payload))
