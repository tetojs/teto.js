import { createAction } from 'redux-actions'

import Tokens from '../models/tokens'

export const login = createAction('LOGIN',
  payload => new Tokens().POST(payload))

export const logout = createAction('LOGOUT',
  payload => new Tokens().DELETE(payload)
    // 设置为 null，以清除本地缓存
    .then(() => null))
