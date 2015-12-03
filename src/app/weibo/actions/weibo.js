import Weibo from '../models/weibo'

export function fetchWeibos (payload) {
  return {
    type: 'FETCH_WEIBOS',
    payload: new Weibo().GET(payload)
  }
}

export function createWeibo (payload) {
  return {
    type: 'CREATE_WEIBO',
    payload: new Weibo().POST(payload)
  }
}

export function deleteWeibo (payload) {
  return {
    type: 'DELETE_WEIBO',
    payload: new Weibo().DELETE(payload)
  }
}
