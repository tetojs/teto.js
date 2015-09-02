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

// first we import some components
import { Router, Route, Link } from 'react-router';
// the histories are imported separately for smaller builds
import { history } from 'react-router/lib/HashHistory';

import { default as About } from './about'
import { default as Count } from './count'

const createStoreWithMiddleware = compose(
  // Enables your middleware:
  applyMiddleware(promise, logger),
  // Provides support for DevTools:
  devTools(),
  // Lets you write ?debug_session=<name> in address bar to persist debug sessions
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)

// Store:
let store = createStoreWithMiddleware((state={}, action) => {
  switch(action.type) {
    default:
      return state;
  }
})

let App = connect(
  (state) => {
    return {
      // value: state.count
    }
  },
  (dispatch) => {
    return {
      // onIncreaseClick: () => dispatch(increaseAction)
    }
  }
)(React.createClass({
  render () {
    return (
      <div>
        <h1>App</h1>
        {/* change the <a>s to <Links>s */}
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/count">Count</Link></li>
        </ul>

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    )
  }
}))

React.render((
  <Provider store={store}>
    {
      () => <Router history={history}>
        <Route path="/" component={App}>
          <Route path="about" component={About}/>
          <Route path="count" component={Count}/>
        </Route>
      </Router>
    }
  </Provider>
), document.getElementById('container'))
