import React, { Component, PropTypes } from 'react'

export default class Main extends Component {

  static propTypes = {
    children: PropTypes.element
  }

  // constructor(props, context) {
  //   super(props, context);
  // }

  render () {
    return this.props.children
  }

}
