import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Nav from './nav'

export default class Index extends Component {

  static propTypes = {
    children: PropTypes.element
  }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    const navs = [
      {
        route: 'about/contact',
        title: 'Contact'
      },
      {
        route: 'about/address',
        title: 'Address'
      }
    ]

    return (
      <div>
        <aside>
          <Nav navs={navs} />
        </aside>
        <blockquote>Test</blockquote>
        {this.props.children || <p>well</p>}
      </div>
    )
  }

}
