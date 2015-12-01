import React, { Component } from 'react'

export default class extends Component {

  // static propTypes = {
  // }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <footer>
        &copy; {new Date().toISOString()}
      </footer>
    )
  }

}
