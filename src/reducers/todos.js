function todos ( state = [{
  id: 1,
  text: 'text'
}], action ) {
  switch (action.type) {
    case 'ADD_TODO':
      return [{
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), 0) + 1,
        completed: false,
        text: action.payload.text
      }, ...state]
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, { ...action.payload }) :
          todo
      )
    case 'COMPLETE_TODO':
      return state.map(todo =>
        todo.id === action.id ?
          Object.assign({}, todo, { completed: !todo.completed }) :
          todo
      )
    default:
      return state
  }
}

export default todos
