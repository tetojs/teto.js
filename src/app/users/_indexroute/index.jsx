import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import autobind from 'autobind-decorator'

import { fetchUsers } from 'redux/actions/users'

import Item from './item'

@connect(state => ({
  user_id: state.tokens.user_id,
  users: state.users
}), dispatch => ({
  ...bindActionCreators({ fetchUsers }, dispatch)
}))
export default class extends Component {

  static propTypes = {
    user_id: PropTypes.number,
    users: PropTypes.object,
    fetchUsers: PropTypes.func.isRequired
  };

  constructor (props, context) {
    super(props, context)

    this.state = {
      data: {
        $offset: 0,
        $limit: 20
      },
      vars: {
        org_id: props.users.entities[props.user_id].org_exinfo.org_id
      }
    }
  }

  componentDidMount () {
    this.props.fetchUsers(this.state)
  }

  @autobind
  prev () {
    const { $offset, $limit } = this.state.data

    this.setState({
      data: {
        $offset: $offset - $limit,
        $limit
      }
    })

    this.props.fetchUsers(this.state)
  }

  @autobind
  next () {
    const { $offset, $limit } = this.state.data

    this.setState({
      data: {
        $offset: $offset + $limit,
        $limit
      }
    })

    this.props.fetchUsers(this.state)
  }

  render () {
    const { ids, entities } = this.props.users
    const { $offset, $limit } = this.state.data
    const slicedIds = ids.slice($offset, $offset + $limit)
    console.log(slicedIds)
    return (
      <div className="app-users-index">
        <ul>
          {slicedIds.map(id => <Item key={id} user={entities[id]} />)}
        </ul>
        <button onClick={this.prev}>prev</button>
        <button onClick={this.next}>next</button>
      </div>
    )
  }

}
