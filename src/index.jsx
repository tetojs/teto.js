import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from 'store'
import App from 'app'

import 'elemental/less/elemental.less'

render(
  <div>
    <Provider key="provider" store={store}>
      <App />
    </Provider>
  </div>
  , document.getElementById('app')
)
