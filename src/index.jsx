import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from 'store'
import App from 'app'
import Debugger from './debugger'

import './styles/app.scss'

render(
  <div>
    <Provider key="provider" store={store}>
      <App />
    </Provider>
    { __DEV__ && <Debugger key="debugger" store={store} /> }
  </div>
  , document.getElementById('app')
)
