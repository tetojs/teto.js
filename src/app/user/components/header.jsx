import React, { PropTypes } from 'react'

import Navbar from './navbar'

export default React.createClass({

  propTypes: {
    scope: PropTypes.object.isRequired
  },

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <header>
        <Navbar scope={this.props.scope} />
      </header>
    )
  }

})
