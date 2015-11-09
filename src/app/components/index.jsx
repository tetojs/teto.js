import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { default as Nav } from './nav'

const navs = [
  {
    route: '/todos',
    title: 'Todos'
  },
  {
    route: '/about',
    title: 'About'
  }
]

@connect(state => state)
export default class Index extends Component {

  static propTypes = {
    // navs: PropTypes.array.isRequired,
    children: PropTypes.element
  }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <div>
        <Nav navs={navs} />
        {this.props.children}
      </div>
    )
  }

}
