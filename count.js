import React from 'react'
import { connect } from 'react-redux'

export default connect(
  (state) => {
    return {
      count: state.count.count
    }
  },
  (dispatch) => {
    return {
      // onIncreaseClick: () => dispatch(increaseAction)
    }
  }
)(class Count extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.count};
  }
  tick() {
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
