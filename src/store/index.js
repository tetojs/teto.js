import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { persistState } from 'redux-devtools'

// middlewares
// import promise from 'redux-promise'
import logger from 'redux-logger'

import extend from 'extend'

const PENDING = 'PENDING'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const FINALLY = ''

function createTypeWithState (type, state) {
  return state ? type + '_' + state : type
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function promise ({ dispatch }) {
  return next => action => {
    const { type, payload } = action

    if (!payload || !isPromise(payload)) {
      return next(action)
    }

    dispatch({
      type: createTypeWithState(type, PENDING)
    })

    return payload
      .then(
        result => dispatch({
          payload: result,
          type: createTypeWithState(type, SUCCESS)
        }),
        error => dispatch({
          payload: error,
          type: createTypeWithState(type, FAILURE)
        })
      )
      .catch(
        error => dispatch({
          payload: error,
          type: createTypeWithState(type, FAILURE)
        })
      )
      .finally(() => dispatch({
        type: createTypeWithState(type, FINALLY)
      }))
  }
}

let finalCreateStore = applyMiddleware(promise, logger())(createStore)

if (__DEV__) {
  finalCreateStore = compose(
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

export function appendReducer (newReducer) {
  store.replaceReducer(combineReducers(extend(reducers, newReducer)))

  return store
}

const ACTION_TYPE_EXPR = /^(.+?)(?:_(PENDING|SUCCESS|FAILURE)?)?$/

export function actionTypeTransformer (orininalActionType) {
  let matched = orininalActionType.match(ACTION_TYPE_EXPR)

  return {
    actionType: matched[1],
    actionState: matched[2]
  }
}

export default store
