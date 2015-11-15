import React, { Component, PropTypes } from 'react'

import styles from './styles/item.scss'

export default class Blog extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }

  // constructor (props, context) {
  //   super(props, context)

  //   this.state = {
  //     editing: false
  //   }
  // }

  render () {
    let { id, title, content } = this.props
    return (
      <article className={styles.ns} data-id={id}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.content}>{content}</div>
      </article>
    )
  }
}
