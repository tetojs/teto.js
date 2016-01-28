import React, { Component, PropTypes } from 'react'
import { Alert } from 'antd'
import { PENDING, SUCCESS, FAILURE, FINALLY } from 'utils/states'

export default class extends Component {

  static propTypes = {
    meta: PropTypes.object.isRequired
  };

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    const { state, message } = this.props.meta
    const type = state === SUCCESS ? 'success' :
             state === FAILURE ? 'error' :
             state === PENDING ? 'info' : ''

    return (
      <div>
        { type && message && <Alert type={type} message={message} /> }
      </div>
    )
  }

}
