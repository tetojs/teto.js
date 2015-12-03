import React, { Component, PropTypes } from 'react'
import { Alert } from 'antd'

export default class extends Component {

  static propTypes = {
    state: PropTypes.string,
    message: PropTypes.string
  }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    let { state, message } = this.props

    let type = state === 'SUCCESS' ? 'success' :
             state === 'FAILURE' ? 'error' :
             state === 'PENDING' ? 'info' : ''

    return (
      <div>
        { type && message && <Alert type={type} message={message} /> }
      </div>
    )
  }

}
