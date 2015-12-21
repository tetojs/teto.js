import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { Form, Input, Button } from 'utils/antd'

import md5 from 'utils/md5'
import history from 'utils/history'
// import { PENDING, SUCCESS, FAILURE, FINALLY } from 'utils/states'

import { userToken, userFetch } from '../../actions/tokens'

@connect(state => ({
  ...state.tokens
}), dispatch => ({
  ...bindActionCreators({ userToken, userFetch }, dispatch)
}))
export default class extends Component {

  static propTypes = {
    access_token: PropTypes.string,
    userToken: PropTypes.func.isRequired,
    userFetch: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      login_name: 'admin@ndtest',
      password: ''
    }
  }

  componentWillReceiveProps (props) {
    if (props.access_token) {
      if (props.org_exinfo) {
        history.replaceState(null, '/')
      } else {
        this.props.userFetch(props.user_id)
      }
    }
  }

  @autobind
  handleSubmit (event) {
    event.preventDefault()

    const { login_name, password } = this.state

    this.props.userToken({
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
