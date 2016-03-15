import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import redirect from 'utils/redirect'

import { logout } from 'redux/actions/tokens'

@connect(state => ({
  ...state.tokens
}), dispatch => ({
  ...bindActionCreators({ logout, redirect }, dispatch)
}))
export default class extends Component {

  static propTypes = {
    access_token: PropTypes.string,
    redirect: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  // constructor(props, context) {
  //   super(props, context)
  // }

  _logout (access_token) {
    if (access_token) {
      this.props.logout(access_token)
    } else {
      this.context.router.push('/')
    }
  }

  componentDidMount () {
    this._logout(this.props.access_token)
  }

  componentWillReceiveProps (props) {
    this._logout(props.access_token)
  }

  render () {
    return (
      <div>...</div>
    )
  }

}
