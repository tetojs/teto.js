import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pushPath } from 'redux-simple-router'

import { userLogout } from '../../actions/tokens'

const goHome = path => pushPath('/')

@connect(state => ({
  ...state.tokens
}), dispatch => ({
  ...bindActionCreators({ userLogout, goHome }, dispatch)
}))
export default class extends Component {

  static propTypes = {
    access_token: PropTypes.string,
    goHome: PropTypes.func.isRequired,
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
      this.props.goHome()
    }
  }

  componentWillReceiveProps (props) {
    const { access_token } = props

    if (!access_token) {
      this.props.goHome()
    }
  }

  render () {
    return (
      <div>...</div>
    )
  }

}
