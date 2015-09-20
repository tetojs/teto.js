import React, { PropTypes } from 'react'

export default class TodoAdd extends React.Component {

  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    addTodo: PropTypes.func.isRequired
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
    let { placeholder } = this.props
    return (
      <input type="text"
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          onBlur={this.onBlur.bind(this)} />
    )
  }
}
