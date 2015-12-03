import React, { Component } from 'react'
//import { Row, Col } from 'elemental'

export default class extends Component {

  // static propTypes = {
  // }

  // constructor(props, context) {
  //   super(props, context)
  // }

  render () {
    let styles = {
      backgroundColor: '#ddd',
      borderRadius: '1em',
      padding: '0.5em',
      textAlign: 'center'
    }

    return (
    <article style={styles}>
      react
    </article>
      //<Row>
      //  <Col sm="1/3">
      //    <article style={styles}>
      //      react
      //    </article>
      //  </Col>
      //  <Col sm="1/3">
      //    <article style={styles}>
      //      redux
      //    </article>
      //  </Col>
      //  <Col sm="1/3">
      //    <article style={styles}>
      //      webpack
      //    </article>
      //  </Col>
      //</Row>
    )
  }

}
