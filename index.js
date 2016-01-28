import React from 'react'
import ReactDOM from 'react-dom'

import Index from './src/index'
import history from './src/redux/history'
import store from './src/redux/store'

// Render the React application to the DOM
ReactDOM.render(
  <Index history={history} store={store} />,
  document.getElementById('app')
)
