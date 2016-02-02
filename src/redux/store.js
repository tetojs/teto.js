import { applyMiddleware, compose, createStore } from 'redux'
import { syncHistory } from 'react-router-redux'
import promise from 'redux-promise'
import history from './history'
import reducer from './reducer'

function withDevTools (middleware) {
  const devTools = window.devToolsExtension
    ? window.devToolsExtension()
    : require('debugger/dev-tools').default.instrument()
  return compose(middleware, devTools)
}

function configureStore ({ initialState = {}, history }) {
  // Sync with router via history instance (main.js)
  const routerMiddleware = syncHistory(history)

  // Compose final middleware and use devtools in debug environment
  let middleware = applyMiddleware(promise, routerMiddleware)
  if (__DEBUG__) middleware = withDevTools(middleware)

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(reducer, initialState)
  if (__DEBUG__) routerMiddleware.listenForReplays(store, ({ router }) => router.location)

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}

const initialState = window.__INITIAL_STATE__
export default configureStore({ initialState, history })
