import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { persistState } from 'redux-devtools'

// middlewares
// todo: only dev
import logger from 'redux-logger'
import promise from './middlewares/promise'

let finalCreateStore = applyMiddleware(promise(1000), logger())(createStore)

if (__DEV__) {
  finalCreateStore = compose(
    // Lets you write ?debug_session=<name>
    // in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(finalCreateStore)
}

let reducers = {}

let store = finalCreateStore(() => {
  // console.log('reducer', arguments)
})

export const appendReducer = (newReducers) => {
  reducers = { ...reducers, ...newReducers }
  store.replaceReducer(combineReducers(reducers))

  return store
}

/**
 * 将原始 reducer 转成新的 reducer
 * @param  {Function}   reducer     原始 reducer
 * @param  {Function}   translate   翻译错误提示
 * @return {Function}   reducer     新的 reducer
 */
export const modifyReducer = (reducer, translate = (payload) => {
  // todo: translate from payload.code
  return payload.message
}) => {
  return (state, action) => {
    let { type, error = false, meta = {}, payload = {} } = action

    meta.message = error && translate(payload) || meta.state

    // use flux standard action
    return reducer(state, {
      type,
      error,
      meta,
      payload
    })
  }
}

export default store
