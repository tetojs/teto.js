import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { fetchUsers } from 'rdx/actions/users'

import Item from './item'

@connect(state => ({
  tokens: state.tokens,
  users: state.users
}), dispatch => ({
  ...bindActionCreators({ fetchUsers }, dispatch)
}))
export default class extends Component {

  static propTypes = {
    tokens: PropTypes.object,
    users: PropTypes.object,
    fetchUsers: PropTypes.func.isRequired
  }

  // constructor(props, context) {
  //   super(props, context)
  // }

  componentDidMount () {
    this.props.fetchUsers({
      vars: {
        org_id: this.props.users[this.props.tokens.user_id].org_exinfo.org_id
      }
    })
  }

  @autobind
  fetchMore () {
    this.props.fetchUsers({
      data: {
        $offset: 20
      },
      vars: {
        org_id: this.props.users[this.props.tokens.user_id].org_exinfo.org_id
      }
    })
  }

  render () {
    const { users } = this.props
    return (
      <div>
        <ul>
          {Object.keys(users).map(key => <Item key={key} user={users[key]} />)}
        </ul>
        <button onClick={this.fetchMore}>more</button>
      </div>
    )
  }

}
