import React, { Component, PropTypes } from 'react'

import styles from './style.css'

export default class Todo extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    completed: PropTypes.bool,
    completeTodo: PropTypes.func.isRequired
  }

  // constructor (props, context) {
  //   super(props, context)

  //   this.state = {
  //     editing: false
  //   }
  // }

  render () {
    let { id, text, completed, completeTodo } = this.props
    return (
      <li className={completed ? styles.completed : ''}>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => completeTodo(id)} />
        <label>{text}</label>
      </li>
    )
  }
}
