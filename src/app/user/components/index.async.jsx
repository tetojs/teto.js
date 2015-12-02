import React, { PropTypes } from 'react'

// Append current reducers to store
import '../reducers/tokens'

import Header from './header'
import Footer from './footer'

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
        <Header scope={this.props.route.path} />
        <main>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }

})
