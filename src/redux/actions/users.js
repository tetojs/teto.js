import { createAction } from 'redux-actions'

import Users from '../models/users'
import OrganizationUsers from '../models/organization-users'

export const fetchUser = createAction('FETCH_USER',
  async payload => await new Users().GET(payload))

export const fetchUsers = createAction('FETCH_USERS',
  async payload => await new OrganizationUsers().GET(payload),
  ({ data = {} }) => data)
