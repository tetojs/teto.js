import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import * as aboutActions from '../../actions/about'

@connect(state => ({
  ...state.about
}), dispatch => ({
  ...bindActionCreators(aboutActions, dispatch)
}))
export default class extends Component {

  static propTypes = {
    address: PropTypes.string,
    fetchAbout: PropTypes.func.isRequired,
    modifyAbout: PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      address: props.address,
      editing: false
    }
  }

  componentDidMount () {
    this.props.fetchAbout()
  }

  componentWillReceiveProps (props) {
    this.setState({
      address: props.address
    })
  }

  @autobind
  onDoubleClick (event) {
    this.setState({
      editing: true
    })
  }

  @autobind
  onBlur (event) {
    this.setState({
      editing: false
    })

    this.props.modifyAbout({
      address: event.target.value.trim()
    })
  }

  @autobind
  onChange (event) {
    this.setState({
      address: event.target.value.trim()
    })
  }

  render () {
    const { address } = this.state
    return (
      this.state.editing
       ? <textarea
        onBlur={this.onBlur}
        onChange={this.onChange}
        value={address} />
       : <div>
        <div>
          Double click below to edit
        </div>
        <div
          onDoubleClick={this.onDoubleClick}>
          {address || 'Woops!'}
        </div>
      </div>
    )
  }

}
