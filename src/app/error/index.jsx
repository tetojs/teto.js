import React, { Component } from 'react'
import { Alert } from 'antd'

export default class extends Component {

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <Alert message="404"
        description="101*4"
        type="error" />
    )
  }

}
