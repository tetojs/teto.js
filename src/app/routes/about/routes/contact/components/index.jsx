import React, { Component, PropTypes } from 'react'

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
        <blockquote>liwenfu@crossjs.com</blockquote>
        {this.props.children}
      </div>
    )
  }

}
