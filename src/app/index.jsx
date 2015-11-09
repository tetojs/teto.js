import React, { Component } from 'react'
import { Router } from 'react-router'
import { createHashHistory } from 'history'

const history = createHashHistory()

const routes = {
  component: 'div',
  childRoutes: [{

    path: '/',

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./routes/about'),
          require('./routes/todos'),
          require('./routes/error')
        ])
      })
    },

    getComponent (location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components'))
      })
    }

  }]
}

export default class Index extends Component {

  // static propTypes = {
  // }

  // constructor (props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <Router history={history} routes={routes} />
    )
  }

}
