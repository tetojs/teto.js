import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import persistState from 'redux-localstorage'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

// middlewares
import promise from 'redux-promise'
import logger from 'redux-logger'

import history from 'utils/history'

let finalCreateStore

if (__DEBUG__) {
  finalCreateStore = compose(
    applyMiddleware(promise, logger()),
    persistState(/* paths, config */)
  )(createStore)
} else {
  finalCreateStore = compose(
    applyMiddleware(promise),
    persistState(/* paths, config */)
  )(createStore)
}

const initialState = {
  // routing: {}
  // tokens: {}
}

let reducers = {
  routing: routeReducer,
  tokens: state => state || initialState
}

const store = finalCreateStore(combineReducers(reducers), initialState)

syncReduxAndRouter(history, store)

export const appendReducer = newReducers => {
  console.log('[newReducers]', newReducers)
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
export const modifyReducer = (reducer, translate = payload => {
  // maybe need translate from payload.code
  return payload.message
}) => {
  return (state, action) => {
    let { type, error = false, meta = {}, payload } = action

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
