import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { combineReducers, bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { Form, Input, Button } from 'antd'

import * as blogActions from '../../actions/blog'
import history from 'utils/history'
import Message from 'utils/message'

import styles from './styles/index.scss'

@connect(state => ({
  blogs: state.blogs
}), dispatch => ({
  ...bindActionCreators(blogActions, dispatch)
}))
export default class extends Component {

  static propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      title: '',
      content: ''
    }
  }

  @autobind
  onSubmit (event) {
    event.preventDefault()

    if (this.state.title === '' || this.state.content === '') {
      return
    }

    this.props.createBlog(this.state)

    // TODO:
    // redirect after creation succeed

    // history.replaceState(null, '/blogs')
  }

  onChange (field, event) {
    this.setState({
      [field]: event.target.value.trim()
    })
  }

  render () {
    let { state } = this.props
    return (
      <Form horizontal onSubmit={this.onSubmit}>
        <Message state={ state } />
        <Form.Item className={styles.field}>
          <FormInput onChange={this.onChange.bind(this, 'title')} type="text" />
        </Form.Item>
        <Form.Item className={styles.field}>
          <FormInput onChange={this.onChange.bind(this, 'content')} type="multiline"  />
        </Form.Item>
        <div className={styles.button}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </div>
      </Form>
    )
  }

}
