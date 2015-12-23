import React, { PropTypes } from 'react'

// Append current reducers to store
import '../reducers/tokens'
import '../reducers/users'

export default React.createClass({

  propTypes: {
    children: PropTypes.element
  },

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

})
