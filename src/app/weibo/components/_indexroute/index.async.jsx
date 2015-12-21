import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as weiboActions from '../../actions/weibo'

import Item from './item'

@connect(state => ({
  ...state.weibo
}), dispatch => ({
  ...bindActionCreators(weiboActions, dispatch)
}))
export default class extends Component {

  static propTypes = {
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
    const { items } = this.props
    return (
      <div>
        <header>
          Weibos:
        </header>
        <section>
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
