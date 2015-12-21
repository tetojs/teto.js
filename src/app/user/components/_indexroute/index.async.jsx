import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

@connect(state => ({
  ...state.tokens
}))
export default class extends Component {

  static propTypes = {
    user_id: PropTypes.number,
    nick_name: PropTypes.string,
    org_exinfo: PropTypes.object
  }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    const { user_id, nick_name, org_exinfo } = this.props

    return (
      <div>
        <p>{ user_id }</p>
        <p>{ nick_name }</p>
        <p>{ `${org_exinfo.org_user_code}@${org_exinfo.org_name}` }</p>
      </div>
    )
  }

}
