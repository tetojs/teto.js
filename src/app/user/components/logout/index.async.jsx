import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import Message from 'utils/message'
// import { PENDING, SUCCESS, FAILURE, FINALLY } from 'utils/states'
import history from 'utils/history'

import { userLogout } from '../../actions/tokens'

@connect(state => ({
  ...state.tokens
}), dispatch => ({
  ...bindActionCreators({ userLogout }, dispatch)
}))
export default class extends Component {

  static propTypes = {
    access_token: PropTypes.string,
    userLogout: PropTypes.func.isRequired
  }

  // constructor(props, context) {
  //   super(props, context)
  // }

  componentDidMount () {
    const { access_token } = this.props

    if (access_token) {
      this.props.userLogout(access_token)
    } else {
      history.replaceState(null, '/')
    }
  }

  render () {
    return (
      <div>...</div>
    )
  }

}
