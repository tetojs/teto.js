import React from 'react'
// Redux utility functions
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools'
// React components for Redux DevTools
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
// middlewares
import promise from 'redux-promise'
import logger from 'redux-logger'

import { Router, Route, Link } from 'react-router'

import { default as Count } from './count'

let createStoreWithMiddleware

if (__DEVTOOLS__) {
  createStoreWithMiddleware = compose(
    // Enables your middleware:
    applyMiddleware(promise, logger()),
    // Provides support for DevTools:
    devTools(),
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore)
} else {
  createStoreWithMiddleware = applyMiddleware(promise, logger())(createStore)
}

// reducers:
let count = (state={count: 0}, action) => {
  switch(action.type) {
    case 'INCREASE':
      return {
        count: state.count + 1
      }
    default:
      return {
        count: state.count
      }
  }
}

// Store:
let store = createStoreWithMiddleware(count)

let App = connect(
  (state) => {
    return {
      value: state.count
    }
  }
)(React.createClass({
  render () {
    const children = [
      <div key="main">
        <h1><Link to="/">{this.props.value} home</Link></h1>
        <ul>
          <li><Link to="/count">Count</Link></li>
        </ul>
        {this.props.children}
      </div>
    ]

    if (__DEVTOOLS__) {
      children.push(
        <DebugPanel key="debug" top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      )
    }

    return (
      <div>
        {children}
      </div>
    )
  }
}))

React.render((
  <Provider store={store}>
    {
      () => <Router>
        <Route path="/" component={App}>
          <Route path="count" component={Count} />
        </Route>
      </Router>
    }
  </Provider>
), document.getElementById('container'))
