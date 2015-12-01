import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { Form, FormField, FormInput, Button } from 'elemental'

import md5 from 'utils/md5'
import Message from 'utils/Message'

// Append current reducers to store
import '../reducers/tokens'

import * as tokenActions from '../actions/tokens'

@connect(state => ({
  ...state.tokens
}), dispatch => ({
  ...bindActionCreators(tokenActions, dispatch)
}))
export default class Index extends Component {

  static propTypes = {
    username: PropTypes.string,
    password: PropTypes.string
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      username: props.username,
      password: props.password
    }
  }

  componentWillReceiveProps (props) {
    if (props.state === 'state') {

    }
  }

  @autobind
  handleSubmit (event) {
    event.preventDefault()

    let { username, password } = this.state

    this.props.postToken({
      login_name: username,
      password: md5(password)
    })
  }

  @autobind
  setValue (event) {
    event.preventDefault()

    let obj = {}
    obj[event.target.name] = event.target.value.trim()

    this.setState(obj)
  }

  render () {
    let { username, password } = this.state
    let { state } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Message state={ state } />
        <FormField
          id="username"
          label="帐号">
          <FormInput placeholder="请输入帐号"
            id="username" name="username"
            value={username}
            onChange={this.setValue} />
        </FormField>
        <FormField
          id="password"
          label="密码">
          <FormInput type="password" placeholder="请输入密码"
            id="password" name="password"
            value={password}
            onChange={this.setValue} />
        </FormField>
        <p>
          <Button type="primary" htmlType="submit">登录</Button>
        </p>
      </Form>
    )
  }

}
