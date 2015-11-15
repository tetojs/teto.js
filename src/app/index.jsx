import React, { Component } from 'react'
import { Router } from 'react-router'

import { history } from '../utils'

const routes = {
  component: 'div',
  childRoutes: [{

    path: '/',

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./routes/about'),
          require('./routes/blogs'),
          require('./routes/todos'),
          require('./routes/error')
        ])
      })
    },

    getIndexRoute (location, cb) {
      require.ensure([], (require) => {
        cb(null, {
          component: require('./components')
        })
      })
    },

    getComponent (location, cb) {
      require.ensure([], (require) => {
        cb(null, require('./components/main'))
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
