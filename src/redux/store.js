import { applyMiddleware, compose, createStore } from 'redux'
// import { syncHistory } from 'react-router-redux'
import promise from 'redux-promise'
import rootReducer from './reducer'
import { routerMiddleware } from 'react-router-redux'
import browserHistory from './history'

function withDevTools (middleware) {
  const devTools = window.devToolsExtension
    ? window.devToolsExtension()
    : require('debugger/dev-tools').default.instrument()
  return compose(middleware, devTools)
}

function configureStore (initialState = {}, history) {
  // Sync with router via history instance (main.js)
  // const routerMiddleware = syncHistoryWithStore(history)

  // Compose final middleware and use devtools in debug environment
  let middleware = applyMiddleware(promise, routerMiddleware(history))
  if (__DEBUG__) middleware = withDevTools(middleware)

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(rootReducer, initialState)
  // if (__DEBUG__) routerMiddleware.listenForReplays(store, ({ router }) => router.location)

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}

const initialState = window.__INITIAL_STATE__
export default configureStore(initialState, browserHistory)
