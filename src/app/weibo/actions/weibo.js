import { createAction } from 'redux-actions'

import Weibo from '../models/weibo'

export const fetchWeibos = createAction('FETCH_WEIBOS', payload => {
  return new Weibo().GET(payload)
})

export const createWeibo = createAction('CREATE_WEIBO', payload => {
  return new Weibo().POST(payload)
})
