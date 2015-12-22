import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu, Dropdown, Icon } from 'utils/antd'

@connect(state => ({
  ...state.tokens
}))
export default class extends Component {

  static propTypes = {
    nick_name: PropTypes.string
  }

  render () {
    const { nick_name } = this.props

    if (nick_name) {
      const menu = <Menu>
        <Menu.Item>
          <Link to="/user">资料</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/user/logout">退出</Link>
        </Menu.Item>
      </Menu>

      return (
        <Dropdown overlay={menu}>
          <h4>
            { nick_name } <Icon type="down" />
          </h4>
        </Dropdown>
      )
    } else {
      return <h4>
        <Link to="/user/login">登录</Link>
      </h4>
    }
  }

}
