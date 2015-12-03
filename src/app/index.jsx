import React, { PropTypes } from 'react'

export default React.createClass({

  propTypes: {
    children: PropTypes.element
  },

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

})
