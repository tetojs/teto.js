import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { combineReducers, bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { Form, FormField, FormInput, Button } from 'elemental'

import * as blogActions from '../../actions/blog'
import history from 'utils/history'

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

  // constructor (props, context) {
  //   super(props, context)
  // }

  @autobind
  onSubmit (event) {
    event.preventDefault()

    let title = this.refs.title.value
    let content = this.refs.content.value

    if (title === '' || content === '') {
      return
    }

    this.props.createBlog({
      title,
      content
    })

    // TODO:
    // redirect after creation succeed

    // history.replaceState(null, '/blogs')
  }

  render () {
    return (
      <Form className={styles.form} onSubmit={this.onSubmit}>
        { this.props.blogs.state }
        <FormField className={styles.field}>
          <FormInput ref="title" type="text" />
        </FormField>
        <FormField className={styles.field}>
          <FormInput ref="content" multiline />
        </FormField>
        <div className={styles.button}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </div>
      </Form>
    )
  }
}
