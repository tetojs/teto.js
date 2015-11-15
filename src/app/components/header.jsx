import React, { Component } from 'react'

import Nav from './nav'

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
        route: '/todos',
        title: 'Todos'
      },
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
        <Nav navs={navs} />
      </header>
    )
  }

}
