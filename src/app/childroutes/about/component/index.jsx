import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Aside from './aside'

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
        <Aside navs={navs} />
        {this.props.children}
      </div>
    )
  }

}
