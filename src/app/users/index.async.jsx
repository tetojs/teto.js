import React, { PropTypes } from 'react'

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