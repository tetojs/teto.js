import React, { PropTypes } from 'react'

// Append current reducers to store
import '../reducers/about'

import Aside from './aside'

export default React.createClass({

  propTypes: {
    route: PropTypes.object.isRequired,
    children: PropTypes.element
  },

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <div>
        <Aside scope={this.props.route.path} />
        {this.props.children}
      </div>
    )
  }

})
