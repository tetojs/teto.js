import React, { Component, PropTypes } from 'react'
import LogMonitor from 'redux-devtools-log-monitor'

export default class Debugger extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render () {
    let { store } = this.props
    return (
      <LogMonitor store={store.devToolsStore} />
    )
  }

}
