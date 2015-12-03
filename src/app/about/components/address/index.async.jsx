import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { combineReducers, bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import * as aboutActions from '../../actions/about'
import styles from '../../themes/styles/address.scss'

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

  constructor(props, context) {
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
    let { address } = this.state
    return (
      this.state.editing ?
      <textarea className={styles.editing}
        onBlur={this.onBlur}
        onChange={this.onChange}
        value={this.state.address} /> :
      <div>
        <div className={styles.comment}>
          Double click below to edit
        </div>
        <div className={styles.readonly}
          onDoubleClick={this.onDoubleClick}>
          {this.state.address || 'Woops!'}
        </div>
      </div>
    )
  }

}
