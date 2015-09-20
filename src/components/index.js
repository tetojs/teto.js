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

  render() {
    return (
      <div>
        <h1><Link to="/">home</Link></h1>
        <div>
          <p>Employee: {this.props.profile.name} ({this.props.profile.mobile})</p>
          <p>Bonus: {this.props.counter.bonus}</p>
        </div>
        <ul>
          <li><Link to="/todos">Todos</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/bonus">Bonus</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
