import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'

export default React.createClass({

  // propTypes: {
  // },

  render () {
    return (
      <nav>
        <h1>
          <IndexLink to="/">TeTo.js</IndexLink>
        </h1>
      </nav>
    )
  }

})
