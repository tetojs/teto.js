import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { combineReducers, bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import * as blogActions from '../../../actions/blog'
import history from 'utils/history'

import styles from './styles/index.scss'

@connect(state => ({
  blogs: state.blogs
}), dispatch => ({
  ...bindActionCreators(blogActions, dispatch)
}))
export default class Index extends Component {

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

    history.replaceState(null, '/blogs')
  }

  render () {
    return (
      <form className={styles.ns} onSubmit={this.onSubmit}>
        <ul>
          <li className={styles.field}>
            <input ref="title" type="text" />
          </li>
          <li className={styles.field}>
            <textarea ref="content" />
          </li>
        </ul>
        <div className={styles.button}>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}
