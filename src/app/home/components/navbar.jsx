import React, { Component, PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'

import styles from './styles/navbar.scss'

import routes from 'routes'

export default class extends Component {

  // static propTypes = {
  // }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    let walkRoutes = function (sets, level = 0) {

      let items = Object.keys(sets)
      .filter((path) => path !== '/' && path !== '*')
      .map(function (path, idx) {
        let value = sets[path]
        return (
          <li key={level + ':' + idx}>
            <Link to={path} activeClassName="active">{value.title}</Link>
            { value.childroutes && walkRoutes(value.childroutes, level + 1) }
          </li>
        )
      })

      return (
        <ul>
          { items }
        </ul>
      )
    }

    return (
      <nav className={styles.ns}>
        <h1><IndexLink to="/">TeTo.js</IndexLink></h1>
        { walkRoutes(routes) }
      </nav>
    )
  }

}
