import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { Menu, Icon } from 'antd'

export default class extends Component {

  // static propTypes = {
  //   children: PropTypes.element
  // }

  // constructor (props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <nav>
        <Menu mode="horizontal" theme="light">
          <Menu.Item>
            <Link to="/weibo" activeClassName="active">微博</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/about" activeClassName="active">关于</Link>
          </Menu.Item>
        </Menu>
      </nav>
    )
  }

}
