import React, { Component, PropTypes } from 'react'

export default class extends Component {

  static propTypes = {
    children: PropTypes.element
  };

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

}
