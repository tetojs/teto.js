import { createAction } from 'redux-actions'

import Tokens from '../models/tokens'

export const login = createAction('LOGIN',
  payload => new Tokens().POST(payload))
  // 如果你升级了redux-promise 到最新版本，请使用下面的代码来返回数据
  // 同时在utils/rest.js里对axios 直接返回一个Promise, 见 line:247
  // async payload => {
  //   const result = await new Tokens().POST(payload)
  //   return result.data
  // })

export const logout = createAction('LOGOUT',
  payload => new Tokens().DELETE(payload)
    // 设置为 null，以清除本地缓存
    .then(() => null))
