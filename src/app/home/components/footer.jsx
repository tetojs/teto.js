import React, { Component } from 'react'

import styles from '../themes/styles/footer.scss'

export default class extends Component {

  // static propTypes = {
  // }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    return (
      <footer className={styles.ns}>
        &copy; {new Date().toISOString()}
      </footer>
    )
  }

}
