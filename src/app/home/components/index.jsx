import React, { Component, PropTypes } from 'react'

import Header from './header'
import Footer from './footer'

import styles from './styles/main.scss'

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
