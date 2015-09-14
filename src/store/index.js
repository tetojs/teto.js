import React from 'react'
import { createStore, compose, applyMiddleware } from 'redux'
import { devTools, persistState } from 'redux-devtools'

// middlewares
import promise from 'redux-promise'
import logger from 'redux-logger'

import { default as reducers } from '../reducers'

let finalCreateStore = applyMiddleware(promise, logger())(createStore)

if (__DEVTOOLS__) {
  finalCreateStore = compose(
    // Provides support for DevTools:
    devTools(),
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(finalCreateStore)
}

export default finalCreateStore(reducers)
