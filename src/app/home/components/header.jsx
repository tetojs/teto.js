import React, { Component } from 'react'

import Logo from './logo'
import Nav from './nav'
import User from './user'

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
        <Logo />
        <Nav />
        <User />
      </header>
    )
  }

}
