import React, { Component } from 'react'

import Logo from './logo'
import Nav from './nav'
import User from './user'

export default class extends Component {

  // static propTypes = {
  // }

  // constructor(props, context) {
  //   super(props, context)
  // }

  componentDidMount () {
    this.setState({
      a: 1
    })
  }

  render () {
    return (
      <header className="app-home-header">
        <Logo />
        <User />
        <Nav />
      </header>
    )
  }

}
