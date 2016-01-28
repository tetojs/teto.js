import React, { Component, PropTypes } from 'react'

import Header from './header'
import Footer from './footer'

export default class extends Component {

  static propTypes = {
    children: PropTypes.element
  };

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
