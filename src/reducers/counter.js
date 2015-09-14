function counter(state = {bonus: 0}, action) {
  switch (action.type) {
    case 'INCREASE':
      return {
        bonus: state.bonus + 1
      }
    case 'DECREASE':
      return {
        bonus: state.bonus - 1
      }
    case 'RESET':
      return {
        bonus: 0
      }
    default:
      return state;
  }
}

export default counter
