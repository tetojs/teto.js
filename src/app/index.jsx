import React, { PropTypes } from 'react'
// import { RouteContext } from 'react-router'

export default React.createClass({

  // mixins: [RouteContext],

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
