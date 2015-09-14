import React, { Component } from 'react'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'

export default class Debugger extends Component {
  render() {
    let { store } = this.props
    return (
      <DebugPanel key="debug" top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    )
  }
}
