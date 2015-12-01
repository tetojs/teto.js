import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'

import styles from './styles/item.scss'

export default class Blog extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    deleteBlog: PropTypes.func.isRequired
  }

  // constructor (props, context) {
  //   super(props, context)

  //   this.state = {
  //     editing: false
  //   }
  // }

  @autobind
  onClick () {
    this.props.deleteBlog(this.props.id)
  }

  render () {
    let { id, title, content } = this.props
    return (
      <article className={styles.ns} data-id={id}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.content}>{content}</div>
        <div className={styles.button}>
          <button onClick={this.onClick}>Delete</button>
        </div>
      </article>
    )
  }
}
