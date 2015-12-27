import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import store from 'rdx/store'
import history from 'utils/history'
import routes from 'routes'

import 'static/themes/default/styles/index.less'

import App from 'app'

const asyncLoader = component => (location, cb) => {
  require(`app/${component}`)(c => {
    cb(null, c)
  })
}

const walkRoutes = sets =>
  Object.keys(sets).map(path => {
    const value = sets[path]

    return (
      <Route key={path} path={path} getComponent={asyncLoader(value.component)}>
        { value.indexroute &&
          <IndexRoute getComponent={asyncLoader(value.indexroute)} /> }
        { value.childroutes &&
          walkRoutes(value.childroutes) }
      </Route>
    )
  })

render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        { walkRoutes(routes) }
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app')
)
