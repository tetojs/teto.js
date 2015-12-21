import React, { Component, PropTypes } from 'react'

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
    const { truncated, mid, uid, created_at, content } = this.props
    // created_at = new Date(created_at)
    return (
      <article data-mid={mid}>
        <h1>{uid}</h1>
        <div>{content}{truncated && '……'}</div>
        <div>@{created_at}</div>
      </article>
    )
  }
}
