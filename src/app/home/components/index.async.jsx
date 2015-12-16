import React, { Component, PropTypes } from 'react'
// import { connect } from 'react-redux'

import Header from './header'
import Footer from './footer'

import styles from '../themes/styles/main.scss'

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
      <div className={styles.ns}>
        <Header />
        <main className={styles.main}>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }

}
