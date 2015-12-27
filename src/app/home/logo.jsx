import React from 'react'
import { IndexLink } from 'react-router'

export default React.createClass({

  render () {
    return (
      <h1>
        <IndexLink to="/">TeTo.js</IndexLink>
      </h1>
    )
  }

})
