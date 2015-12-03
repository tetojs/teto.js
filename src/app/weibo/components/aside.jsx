import React, { PropTypes } from 'react'

import route from 'utils/route'

export default React.createClass({

  propTypes: {
    scope: PropTypes.string.isRequired,
    children: PropTypes.element
  },

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <aside>
        <nav>
          { route.getLinks('/' + this.props.scope + '/', false) }
        </nav>
      </aside>
    )
  }

})
