import React from 'react'
import { IndexLink } from 'react-router'

import route from 'utils/route'

export default React.createClass({

  // propTypes: {
  // }

  render () {
    return (
      <nav>
        <h1>
          <IndexLink to="/">TeTo.js</IndexLink>
        </h1>
        { route.getLinks('user/', false) }
      </nav>
    )
  }

})
