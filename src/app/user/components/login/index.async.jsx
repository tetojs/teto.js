import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { Form, Input, Button } from 'antd'

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
    // others
    login_name: PropTypes.string,
    access_token: PropTypes.string,
    expires_at: PropTypes.string,
    mac_algorithm: PropTypes.string,
    mac_key: PropTypes.string,
    refresh_token: PropTypes.string,
    server_time: PropTypes.string,
    user_id: PropTypes.number
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      login_name: props.login_name,
      password: ''
    }
  }

  componentWillReceiveProps (props) {
    switch (props.state) {
      case SUCCESS:
        auth.setTokens({
          access_token: props.access_token,
          expires_at: props.expires_at,
          mac_algorithm: props.mac_algorithm,
          mac_key: props.mac_key,
          refresh_token: props.refresh_token,
          server_time: props.server_time,
          user_id: props.user_id
        })

    }
  }

  @autobind
  handleSubmit (event) {
    event.preventDefault()

    let { login_name, password } = this.state

    this.props.postToken({
      data: {
        login_name: login_name,
        password: md5(password)
      }
    })
  }

  @autobind
  setValue (event) {
    event.preventDefault()

    this.setState({
      [event.target.name]: event.target.value.trim()
    })
  }

  render () {
    let { login_name, password } = this.state
    let { state, message } = this.props
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <Message state={ state } message={ message } />
        <Form.Item
          id="login_name"
          label="帐号">
          <Input placeholder="请输入帐号"
            id="login_name" name="login_name"
            value={login_name}
            onChange={this.setValue} />
        </Form.Item>
        <Form.Item
          id="password"
          label="密码">
          <Input type="password" placeholder="请输入密码"
            id="password" name="password"
            value={password}
            onChange={this.setValue} />
        </Form.Item>
        <p>
          <Button type="primary" htmlType="submit">登录</Button>
        </p>
      </Form>
    )
  }

}
