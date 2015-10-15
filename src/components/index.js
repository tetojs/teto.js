import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

@connect(state => ({
  counter: state.counter,
  profile: state.profile
}))
export default class Index extends Component {

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    let { counter, profile, children } = this.props

    return (
      <div>
        <h1><Link to="/">home</Link></h1>
        <div>
          <p>Employee: {profile.name} ({profile.mobile})</p>
          <p>Bonus: {counter.bonus}</p>
        </div>
        <ul>
          <li><Link to="/todos">Todos</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/bonus">Bonus</Link></li>
        </ul>
        {children}
      </div>
    )
  }

}
