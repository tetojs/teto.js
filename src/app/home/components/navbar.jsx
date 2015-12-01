import React from 'react'
import { IndexLink, Link } from 'react-router'

import route from 'utils/route'

import styles from './styles/navbar.scss'

export default React.createClass({

  // propTypes: {
  // }

  render () {
    return (
      <nav className={styles.ns}>
        <h1>
          <IndexLink to="/">TeTo.js</IndexLink>
        </h1>
        { route.getLinks('/', false) }
        <p>
          <Link to="user">用户</Link>
        </p>
      </nav>
    )
  }

})
