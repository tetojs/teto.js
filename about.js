import React from 'react'
import { connect } from 'react-redux'

import { default as Contact } from './contact'

export default connect(
  (state) => {
    return {
      name: state.about.name
    }
  },
  (dispatch) => {
    return {
      // onIncreaseClick: () => dispatch(increaseAction)
    }
  }
)(class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: props.name};
  }
  handleChange (event) {
    console.log(this)
    this.setState({
      name: event.target.value
    })
  }
  render () {
    return (
      <article>
        <h1>Hello, my name is {this.state.name}</h1>
        <input value={this.state.name} onChange={this.handleChange.bind(this)} />
        <Contact />
      </article>
    )
  }
})
