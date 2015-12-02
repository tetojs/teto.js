import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'

import route from 'utils/route'

export default React.createClass({

  propTypes: {
    scope: PropTypes.object.isRequired
  },

  render () {
    return (
      <nav>
        <h1>
          <IndexLink to="/">TeTo.js</IndexLink>
        </h1>
        <div>
          { route.getLinks(this.props.scope + '/', false) }
        </div>
      </nav>
    )
  }

})
