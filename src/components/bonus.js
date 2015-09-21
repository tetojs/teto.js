import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as bonusAtions from '../actions/bonus'

import styles from './bonus.css'

@connect(state => ({
  counter: state.counter
}), dispatch => ({
  actions: bindActionCreators(bonusAtions, dispatch)
}))
export default class Bonus extends React.Component {

  static propTypes = {
    counter: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  // constructor(props, context) {
  //   super(props, context);
  // }

  render() {
    const { counter, actions } = this.props
    return (
      <div>
        <span>Bonus: </span>
        <button type="button" onClick={actions.increaseBonus}>+</button>
        <span> {counter.bonus} </span>
        <button type="button" onClick={actions.decreaseBonus}>-</button>
        <button type="reset" onClick={actions.resetBonus}>0</button>
      </div>
    )
  }
}
