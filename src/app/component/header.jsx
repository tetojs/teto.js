import React, { Component } from 'react'

import Navbar from './navbar'

import styles from './styles/header.scss'

export default class Index extends Component {

  // static propTypes = {
  // }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {

    const navs = [
      {
        route: '/blogs',
        title: 'Blogs'
      },
      {
        route: '/about',
        title: 'About'
      }
    ]

    return (
      <header className={styles.ns}>
        <Navbar navs={navs} />
      </header>
    )
  }

}
