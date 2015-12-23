import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getUser } from '../../../user/actions/users'

@connect(state => ({
  ...state.users
}), dispatch => ({
  ...bindActionCreators({ getUser }, dispatch)
}))
export default class extends Component {

  static propTypes = {
    truncated: PropTypes.bool.isRequired,
    mid: PropTypes.number.isRequired,
    uid: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    getUser: PropTypes.func.isRequired
  }

  componentDidMount () {
    if (!this.props[this.props.uid]) {
      this.props.getUser(this.props.uid)
    }
  }

  // constructor (props, context) {
  //   super(props, context)

  //   this.state = {
  //     editing: false
  //   }
  // }

  render () {
    const { truncated, mid, uid, created_at, content } = this.props
    const user = this.props[uid]
    const display = user ? user.nick_name : uid
    // created_at = new Date(created_at)
    return (
      <article data-mid={mid}>
        <h1>{display}</h1>
        <div>{content}{truncated && '……'}</div>
        <div>@{created_at}</div>
      </article>
    )
  }
}
