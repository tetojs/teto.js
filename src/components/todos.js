import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { default as Todo } from './todo'
import { default as TodoAdd } from './todoAdd'

import * as todosAtions from '../actions/todos'

@connect(state => ({
  todos: state.todos
}), dispatch => ({
  actions: bindActionCreators(todosAtions, dispatch)
}))
export default class Todos extends React.Component {

  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  // constructor(props, context) {
  //   super(props, context);
  // }

  render () {
    const { todos, actions } = this.props
    let placeholder = 'input here'
    return (
      <div>
        <TodoAdd placeholder={placeholder} addTodo={actions.addTodo} />
        <ol>
          {
            todos.map(todo =>
              <Todo key={todo.id || 0} todo={todo} {...actions} />
            )
          }
        </ol>
      </div>
    )
  }
}
