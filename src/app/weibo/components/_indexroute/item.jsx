import React, { Component, PropTypes } from 'react'

import styles from '../../themes/styles/item.scss'

export default class extends Component {

  static propTypes = {
    truncated: PropTypes.bool.isRequired,
    mid: PropTypes.number.isRequired,
    uid: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }

  // constructor (props, context) {
  //   super(props, context)

  //   this.state = {
  //     editing: false
  //   }
  // }

  render () {
    let { truncated, mid, uid, created_at, content } = this.props
    // created_at = new Date(created_at)
    return (
      <article className={styles.ns} data-mid={mid}>
        <h1 className={styles.title}>{uid}</h1>
        <div className={styles.content}>{content}{truncated && '……'}</div>
        <div className={styles.content}>@{created_at}</div>
      </article>
    )
  }
}
