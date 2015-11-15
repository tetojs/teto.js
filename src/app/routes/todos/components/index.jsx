import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { todoActions } from '../../../../actions'

import { default as Todo } from './todo'

@connect(state => ({
  todos: state.todos
}), dispatch => ({
  actions: bindActionCreators(todoActions, dispatch)
}))
export default class Todos extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    children: PropTypes.element
  }

  // constructor(props, context) {
  //   super(props, context);
  // }

  render () {
    let { actions } = this.props
    return (
      <div>
        <Link to="/todos/add">Add</Link>
        <p>Todos:</p>
        <ul>
        {
          this.props.children || this.props.todos.map(
            todo => <Todo key={todo.id} { ...todo } { ...actions } />
          )
        }
        </ul>
      </div>
    )
  }

}
