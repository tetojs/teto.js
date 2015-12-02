import React from 'react'
import { IndexLink } from 'react-router'

import route from 'utils/route'

import styles from '../themes/styles/navbar.scss'

export default React.createClass({

  // propTypes: {
  // }

  render () {
    return (
      <nav className={styles.nav}>
        <h1>
          <IndexLink to="/">TeTo.js</IndexLink>
        </h1>
        <div className={styles.main}>
          { route.getLinks('/', true) }
        </div>
        <div className={styles.user}>
          { route.getLinks('', false) }
        </div>
      </nav>
    )
  }

})
