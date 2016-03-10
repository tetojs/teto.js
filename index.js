import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import Index from './src/index'
import browserHistory from './src/redux/history'
import store from './src/redux/store'

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})
// Render the React application to the DOM
ReactDOM.render(
  <Index history={history} store={store} />,
  document.getElementById('app')
)
