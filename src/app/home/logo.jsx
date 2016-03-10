import React, { Component } from 'react'
import { IndexLink } from 'react-router'

export default class extends Component {

  render () {
    return (
      <h1>
        <IndexLink to="/">TeTo.js</IndexLink>
      </h1>
    )
  }

}
