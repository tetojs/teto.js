import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { devTools, persistState } from 'redux-devtools'

// middlewares
import promise from 'redux-promise'
import logger from 'redux-logger'

import extend from 'extend'

let finalCreateStore = applyMiddleware(promise, logger())(createStore)

if (__DEV__) {
  finalCreateStore = compose(
    // Provides support for DevTools:
    devTools(),
    // Lets you write ?debug_session=<name>
    // in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(finalCreateStore)
}

let reducers = {}

let reducer = function () {
  // console.log('reducer', arguments)
}

let store = finalCreateStore(reducer)

export function appendReducer (reducer) {
  store.replaceReducer(combineReducers(extend(reducers, reducer)))

  return store
}

export default store
