import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { todoAtions } from '../../../../../../actions'
console.log(todoAtions)
@connect(state => ({
  todos: state.todos
}), dispatch => ({
  actions: bindActionCreators(todoAtions, dispatch)
}))
export default class Index extends Component {

  static propTypes = {
    // placeholder: PropTypes.string.isRequired,
    // addTodo: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      value: ''
    }
  }

  onChange (event) {
    this.setState({
      value: event.target.value.trim()
    })
  }

  onBlur (event) {
    let value = event.target.value.trim()

    if (value === '') {
      return
    }

    this.props.addTodo({
      text: event.target.value
    })

    this.setState({
      value: ''
    })
  }

  render () {
    return (
      <input type="text"
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onBlur={this.onBlur.bind(this)} />
    )
  }
}
