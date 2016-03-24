import React, { Component } from 'react'
import {Icon} from 'antd'
export default class extends Component {

  // static propTypes = {
  // };

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    const styles = {
      backgroundColor: '#ddd',
      borderRadius: '1em',
      padding: '0.5em',
      textAlign: 'center'
    }

    return (
      <article style={styles}>
        react<Icon type="caret-down" />
      </article>
    )
  }

}
