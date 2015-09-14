import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as aboutAtions from '../actions/about'

@connect(state => ({
  profile: state.profile
}), dispatch => ({
  actions: bindActionCreators(aboutAtions, dispatch)
}))
export default class About extends React.Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  // constructor(props, context) {
  //   super(props, context);
  // }

  render () {
    const { profile, actions } = this.props
    return (
      <div>
        <input placeholder="name" type="text" value={profile.name} onChange={actions.modifyName} />
        <input placeholder="mobile" type="text" value={profile.mobile} onChange={actions.modifyMobile} />
      </div>
    )
  }
}
