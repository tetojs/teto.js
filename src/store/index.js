import React from 'react'
import { createStore, compose, applyMiddleware } from 'redux'
import { devTools } from 'redux-devtools'

// middlewares
import promise from 'redux-promise'
import logger from 'redux-logger'

import { default as reducers } from '../reducers'

let finalCreateStore = applyMiddleware(promise, logger())(createStore)

if (__DEVTOOLS__) {
  finalCreateStore = compose(
    // Provides support for DevTools:
    devTools()
  )(finalCreateStore)
}

export default finalCreateStore(reducers)
