import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { todoAtions } from '../../../../../../actions'

@connect(state => ({
  todos: state.todos
}), dispatch => ({
  ...bindActionCreators(todoAtions, dispatch)
}))
export default class Index extends Component {

  static propTypes = {
    // placeholder: PropTypes.string.isRequired,
    addTodo: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      value: ''
    }
  }

  // @autobind
  onChange (event) {
    this.setState({
      value: event.target.value.trim()
    })
  }

  // @autobind
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
    console.log(this.onBlur)
    return (
      <input type="text"
          value={this.state.value}
          onChange={this.onChange}
          onBlur={this.onBlur} />
    )
  }
}
