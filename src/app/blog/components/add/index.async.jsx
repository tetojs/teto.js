import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { combineReducers, bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { Form, FormField, FormInput, Button } from 'elemental'

import * as blogActions from '../../actions/blog'
import history from 'utils/history'
import Message from 'utils/Message'

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
      <Form className={styles.form} onSubmit={this.onSubmit}>
        <Message state={ state } />
        <FormField className={styles.field}>
          <FormInput onChange={this.onChange.bind(this, 'title')} type="text" />
        </FormField>
        <FormField className={styles.field}>
          <FormInput onChange={this.onChange.bind(this, 'content')} multiline />
        </FormField>
        <div className={styles.button}>
          <Button type="primary" submit>Submit</Button>
        </div>
      </Form>
    )
  }

}
