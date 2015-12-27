import React, { Component, PropTypes } from 'react'

export default class extends Component {

  static propTypes = {
    user: PropTypes.object
  }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    const { user } = this.props
    const { user_id, nick_name } = this.props.user

    const org_user_code = user['org.org_user_code']
    const org_name = user['org.org_name']

    return (
      <li>
        <ul>
          <li>{ user_id }</li>
          <li>{ nick_name }</li>
          <li>{ `${org_user_code}@${org_name}` }</li>
        </ul>
      </li>
    )
  }

}
