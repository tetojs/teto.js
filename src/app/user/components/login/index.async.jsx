import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { Form, Input, Button } from 'antd'

import md5 from 'utils/md5'
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
    postToken: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      login_name: 'admin@ndtest',
      password: ''
    }
  }

  componentWillReceiveProps (props) {
    // token:
    //   access_token
    //   expires_at
    //   mac_algorithm
    //   mac_key
    //   refresh_token
    //   server_time
    //   user_id
    switch (props.meta.state) {
      case SUCCESS:
        auth.setTokens(props.token)
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
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <Message meta={this.props.meta} />
        <Form.Item
          id="login_name"
          label="帐号">
          <Input placeholder="请输入帐号"
            id="login_name" name="login_name"
            value={this.state.login_name}
            onChange={this.setValue} />
        </Form.Item>
        <Form.Item
          id="password"
          label="密码">
          <Input type="password" placeholder="请输入密码"
            id="password" name="password"
            value={this.state.password}
            onChange={this.setValue} />
        </Form.Item>
        <p>
          <Button type="primary" htmlType="submit">登录</Button>
        </p>
      </Form>
    )
  }

}
