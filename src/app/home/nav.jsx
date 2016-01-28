import React, { Component } from 'react'
import { Link } from 'react-router'

import { Menu } from 'utils/antd'

export default class extends Component {

  // static propTypes = {
  //   children: PropTypes.element
  // };

  // constructor (props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <nav>
        <Menu mode="horizontal" theme="light">
          <Menu.Item>
            <Link to="/users" activeClassName="active">用户</Link>
          </Menu.Item>
        </Menu>
      </nav>
    )
  }

}
