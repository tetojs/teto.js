import { createStore, compose, applyMiddleware } from 'redux'
import persistState from 'redux-localstorage'
import { syncReduxAndRouter } from 'redux-simple-router'

// middlewares
import restful from './middlewares/restful'
import promise from 'redux-promise'
import logger from 'redux-logger'

import history from 'utils/history'

import reducers from './reducers'

let finalCreateStore

if (__DEBUG__) {
  finalCreateStore = compose(
    applyMiddleware(restful, promise, logger()),
    persistState(null, {
      serialize: obj => JSON.stringify(obj),
      deserialize: str => JSON.parse(str)
    })
  )(createStore)
} else {
  finalCreateStore = compose(
    applyMiddleware(restful, promise),
    persistState(/* paths, config */)
  )(createStore)
}

const store = finalCreateStore(reducers, {})

syncReduxAndRouter(history, store, state => state.router)

export default store
