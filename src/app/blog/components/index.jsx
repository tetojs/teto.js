import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { combineReducers, bindActionCreators } from 'redux'
import { Link } from 'react-router'

// Append current reducers to store
import '../reducers/blog'

export default class extends Component {

  static propTypes = {
    children: PropTypes.element
  }

  // constructor(props, context) {
  //   super(props, context);
  // }

  render () {
    return this.props.children
  }

}
