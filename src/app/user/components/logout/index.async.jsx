import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import md5 from 'utils/md5'
import Message from 'utils/message'
import STATES from 'utils/states'
import auth from 'utils/auth'

const {
  PENDING,
  SUCCESS,
  FAILURE,
  FINALLY
} = STATES

import * as tokenActions from '../../actions/tokens'

@connect(state => ({
  ...state.tokens
}), dispatch => ({
  ...bindActionCreators(tokenActions, dispatch)
}))
export default class extends Component {

  static propTypes = {
    state: PropTypes.string.isRequired,
    message: PropTypes.string,
    deleteToken: PropTypes.func.isRequired
  }

  // constructor(props, context) {
  //   super(props, context)
  // }

  componentDidMount () {
    let accessToken = auth.getTokens('access_token')

    if (accessToken) {
      this.props.deleteToken(accessToken)
    } else {
      alert('你还没登录')
    }
  }

  componentWillReceiveProps (props) {
    switch (props.state) {
      case SUCCESS:
        auth.destroy()
    }
  }

  render () {
    let { state, message } = this.props
    return (
      <div>
        <Message state={ state } message={ message } />
      </div>
    )
  }

}
