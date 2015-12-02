import React, { Component } from 'react'

import Navbar from './navbar'

import styles from '../themes/styles/header.scss'

export default class extends Component {

  // static propTypes = {
  // }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <header className={styles.ns}>
        <Navbar />
      </header>
    )
  }

}
