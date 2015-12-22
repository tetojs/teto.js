import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { replacePath } from 'redux-simple-router'

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
      replacePath('/')
    }
  }

  render () {
    return (
      <div>...</div>
    )
  }

}
