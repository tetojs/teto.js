import React, { PropTypes } from 'react'

// Append current reducers to store
import '../reducers/tokens'

import Header from './header'
import Footer from './footer'

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
        <Header />
        <main>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }

})
