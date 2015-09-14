function profile(state = {name: 'Jim'}, action) {
  switch (action.type) {
    case 'MODIFY':
      return Object.assign({}, state, action.payload)
    default:
      return state;
  }
}

export default profile
