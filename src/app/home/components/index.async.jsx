import React, { Component, PropTypes } from 'react'
// import { connect } from 'react-redux'

import Header from './header'
import Footer from './footer'

// @connect(state => ({
//   tokens: state.tokens
// }))
export default class extends Component {

  static propTypes = {
    children: PropTypes.element
  }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <div className="app-home">
        <Header />
        <main className="app-home-main">
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }

}
