import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Index extends Component {

  static propTypes = {
    children: PropTypes.element
  }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <div>
        <blockquote>Test</blockquote>
        {this.props.children || <p><Link to="/about/contact">Contact</Link></p>}
      </div>
    )
  }

}
