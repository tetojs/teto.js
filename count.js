import React from 'react'
import { connect } from 'react-redux'

export default connect(
  (state) => {
    return {
      count: state.count
    }
  }
)(class Count extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {count: props.count};
  }
  tick() {
    this.props.dispatch({
      type: 'INCREASE'
    })
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this.tick.bind(this)}>
        Clicks: {this.state.count}
      </div>
    );
  }
})
