import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { combineReducers, bindActionCreators } from 'redux'

import Message from 'utils/message'
// import STATES from 'utils/states'

import * as weiboActions from '../../actions/weibo'
import styles from '../../themes/styles/index.scss'

import Item from './item'

@connect(state => ({
  ...state.weibo
}), dispatch => ({
  ...bindActionCreators(weiboActions, dispatch)
}))
export default class extends Component {

  static propTypes = {
    state: PropTypes.string.isRequired,
    message: PropTypes.string,
    items: PropTypes.array,
    fetchWeibos: PropTypes.func.isRequired
  }

  // constructor(props, context) {
  //   super(props, context);
  // }

  componentDidMount () {
    // 默认公共广场 square, id 固定为 0
    this.props.fetchWeibos(0)
  }

  render () {
    let { state, message, items } = this.props
    return (
      <div className={styles.ns}>
        <header className={styles.header}>
          Weibos:
        </header>
        <section className={styles.weibo}>
          <Message state={ state } message={ message } />
          {
            items && items.map(
              item => <Item key={item.mid} { ...item } />
            )
          }
        </section>
      </div>
    )
  }

}
