import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { IndexLink } from 'react-router'

import route from 'utils/route'

import styles from '../themes/styles/navbar.scss'

@connect(state => ({
  tokens: state.tokens
}))
export default class extends Component {

  static propTypes = {
    tokens: PropTypes.object,
    children: PropTypes.element
  }

  // constructor (props, context) {
  //   super(props, context)
  // }

  render () {
    const { tokens } = this.props
    const displayName = tokens && (tokens.nick_name || tokens.user_id) || null

    return (
      <nav className={styles.nav}>
        <h1>
          <IndexLink to="/">TeTo.js</IndexLink>
        </h1>
        <div className={styles.main}>
          { route.getLinks('/', true) }
        </div>
        <div className={styles.user}>
          { displayName || route.getLinks('user/', false) }
        </div>
      </nav>
    )
  }

}
