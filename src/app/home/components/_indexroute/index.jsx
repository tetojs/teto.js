import React, { Component } from 'react'

export default class Index extends Component {

  // static propTypes = {
  // }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <article>
        {'hello world'.split('').reverse().join('')}
      </article>
    )
  }

}
