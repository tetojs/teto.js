import React, { Component } from 'react'
import { Router, Route } from 'react-router'

import { default as Index } from '../components/index'
import { default as About } from '../components/about'
import { default as Bonus } from '../components/bonus'

export default class Routes extends Component {

  // static propTypes = {
  //   clicks: PropTypes.number.isRequired,
  //   dispatch: PropTypes.func.isRequired
  // }

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <Router>
        <Route path="/" component={Index}>
          <Route path="about" component={About} />
          <Route path="bonus" component={Bonus} />
        </Route>
      </Router>
    )
  }
}
