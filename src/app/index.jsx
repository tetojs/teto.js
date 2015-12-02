import React, { PropTypes } from 'react'
import { Switch } from 'antd'

export default React.createClass({

  // mixins: [RouteContext],

  propTypes: {
    children: PropTypes.element
  },

  getInitialState () {
    return {
      theme: 'light'
    }
  },

  changeTheme (value) {
    this.setState({
      theme: value ? 'dark' : 'light'
    })
  },

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <div>
        {this.props.children}
        <Switch onChange={this.changeTheme}
          checkedChildren="暗"
          unCheckedChildren="亮" />
      </div>
    )
  }

})
