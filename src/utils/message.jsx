import React, { Component, PropTypes } from 'react'

export default class extends Component {

  static propTypes = {
    state: PropTypes.string
  }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    let { state } = this.props

    let styles = {
      color: state === 'SUCCESS' ? 'green' :
             state === 'FAILURE' ? 'red' :
             state === 'PENDING' ? 'yellow' : 'gray'
    }

    return (
      <div style={styles}>{this.props.state}</div>
    )
  }

}
