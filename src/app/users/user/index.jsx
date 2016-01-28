import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

@connect(state => ({
  users: state.users
}))
export default class extends Component {

  static propTypes = {
    params: PropTypes.object,
    users: PropTypes.object
  };

  // for example
  // React.PropTypes.shape({
  //   id: React.PropTypes.number.isRequired,
  //   title: React.PropTypes.string
  // })

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    const { userId } = this.props.params
    const { nick_name, org_exinfo } = this.props.users[userId]

    return (
      <ul>
        <li>{ userId }</li>
        <li>{ nick_name }</li>
        <li>{ `${org_exinfo.org_user_code}@${org_exinfo.org_name}` }</li>
      </ul>
    )
  }

}
