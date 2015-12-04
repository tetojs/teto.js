import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { combineReducers, bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { Form, Input, Button } from 'antd'

import history from 'utils/history'
import Message from 'utils/message'

import * as weiboActions from '../../actions/weibo'
import styles from '../../themes/styles/add.scss'

@connect(state => ({
  ...state.weibo
}), dispatch => ({
  ...bindActionCreators(weiboActions, dispatch)
}))
export default class extends Component {

  static propTypes = {
    state: PropTypes.string.isRequired,
    message: PropTypes.string,
    createWeibo: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      content: ''
    }
  }

  @autobind
  onSubmit (event) {
    event.preventDefault()

    if (this.state.content === '') {
      return
    }

    this.props.createWeibo({
      data: {
        content: this.state.content
      }
    })

    // TODO:
    // redirect after creation succeed

    // history.replaceState(null, '/weibos')
  }

  onChange (field, event) {
    this.setState({
      [field]: event.target.value.trim()
    })
  }

  render () {
    let { state, message } = this.props
    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <Message state={ state } message={ message } />
        <Form.Item className={styles.field}>
          <Input onChange={this.onChange.bind(this, 'content')} type="textarea"  />
        </Form.Item>
        <div className={styles.button}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </div>
      </Form>
    )
  }

}
