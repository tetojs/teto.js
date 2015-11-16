import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { combineReducers, bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import * as blogActions from '../../../actions/blog'
import history from 'utils/history'

/**
 * Replace reducers with current component
 */
import store from 'store'
import blogs from '../../../reducers/blogs'

store.replaceReducer(combineReducers({
  blogs
}))

import styles from './styles/index.scss'

@connect(state => ({
  blogs: state.blogs
}), dispatch => ({
  ...bindActionCreators(blogActions, dispatch)
}))
export default class Index extends Component {

  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    createBlog: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      loading: props.loading
    }
  }

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
    console.log('[data]', 111)
    return (
      <form className={styles.ns} onSubmit={this.onSubmit}>
        <ul>
          <li className={styles.field}>
            <input ref="title" type="text"
              value={this.props.title} />
          </li>
          <li className={styles.ns}>
            <textarea ref="content">{this.props.content}</textarea>
          </li>
        </ul>
        <div className={styles.button}>
          <button type="submit">Submit</button>
        </div>
      </form>
    )
  }
}
