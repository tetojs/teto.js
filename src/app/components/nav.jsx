import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'

import styles from './styles/nav.scss'

export default class Index extends Component {

  static propTypes = {
    navs: PropTypes.array.isRequired
  }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    let { navs } = this.props

    return (
      <nav className={styles.ns}>
        <h1><IndexLink to="/">TeTo.js</IndexLink></h1>
        <ul>
          {navs.map((nav, i) =>
            <li key={i}><Link to={nav.route} activeClassName="active">{nav.title}</Link></li>
          )}
        </ul>
      </nav>
    )
  }

}
