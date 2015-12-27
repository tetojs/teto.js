import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu, Dropdown, Icon } from 'utils/antd'

@connect(state => ({
  ...state.tokens,
  ...state.users
}))
export default class extends Component {

  static propTypes = {
    user_id: PropTypes.number,
    users: PropTypes.string
  }

  render () {
    const { user_id } = this.props
    const { nick_name } = this.props[user_id]

    let Element

    if (nick_name) {
      const link = `/user/${user_id}`
      const menu = <Menu>
        <Menu.Item>
          <Link to={link}>资料</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/user/logout">退出</Link>
        </Menu.Item>
      </Menu>

      Element =
        <Dropdown overlay={menu}>
          <h4>
            { nick_name } <Icon type="down" />
          </h4>
        </Dropdown>
    } else {
      Element =
        <h4>
          <Link to="/user/login">登录</Link>
        </h4>
    }

    return Element
  }

}
