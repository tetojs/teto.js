import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Menu, Dropdown, Button, Icon } from 'utils/antd'

@connect(state => ({
  tokens: state.tokens
}))
export default class extends Component {

  static propTypes = {
    tokens: PropTypes.object
  }

  render () {
    const { tokens } = this.props
    const displayName = tokens && (tokens.nick_name || tokens.user_id) || null

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
        <Button>
          { displayName } <Icon type="down" />
        </Button>
      </Dropdown>
    )
  }

}
