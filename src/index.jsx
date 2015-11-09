import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { default as store } from './store'
import { default as App } from './app'
import { default as Debugger } from './debugger'

render(
  <div>
    <Provider key="provider" store={store}>
      <App />
    </Provider>
    { __DEV__ && <Debugger key="debugger" store={store} /> }
  </div>
  , document.getElementById('app')
)
