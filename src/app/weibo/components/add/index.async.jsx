import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { Form, Input, Button } from 'utils/antd'

// import history from 'utils/history'

import * as weiboActions from '../../actions/weibo'

@connect(state => ({
  ...state.weibo
}), dispatch => ({
  ...bindActionCreators(weiboActions, dispatch)
}))
export default class extends Component {

  static propTypes = {
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
    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <Form.Item>
          <Input onChange={this.onChange.bind(this, 'content')} type="textarea"  />
        </Form.Item>
        <div>
          <Button type="primary" htmlType="submit">Submit</Button>
        </div>
      </Form>
    )
  }

}
