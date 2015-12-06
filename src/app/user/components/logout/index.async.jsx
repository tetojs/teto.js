import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import Message from 'utils/message'
import auth from 'utils/auth'
import { PENDING, SUCCESS, FAILURE, FINALLY } from 'utils/states'

import * as tokenActions from '../../actions/tokens'

@connect(state => ({
  ...state.tokens
}), dispatch => ({
  ...bindActionCreators(tokenActions, dispatch)
}))
export default class extends Component {

  static propTypes = {
    meta: PropTypes.object,
    token: PropTypes.object,
    deleteToken: PropTypes.func.isRequired
  }

  // constructor(props, context) {
  //   super(props, context)
  // }

  componentDidMount () {
    const accessToken = auth.getTokens('access_token')

    if (accessToken) {
      this.props.deleteToken(accessToken)
    } else {
      alert('你还没登录')
    }
  }

  componentWillReceiveProps (props) {
    switch (props.meta.state) {
      case SUCCESS:
        auth.destroy()
    }
  }

  render () {
    let { state, message } = this.props
    return (
      <Message meta={this.props.meta} />
    )
  }

}
