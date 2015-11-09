export function addTodo (todo) {
  return {
    type: 'ADD_TODO',
    payload: { ...todo }
  }
}

export function editTodo (id, todo) {
  return {
    type: 'EDIT_TODO',
    id,
    payload: { ...todo }
  }
}

export function completeTodo (id) {
  return {
    type: 'COMPLETE_TODO',
    id
  }
}

export function deleteTodo (id) {
  return {
    type: 'DELETE_TODO',
    id
  }
}

export function clearTodo (filter) {
  return {
    type: 'CLEAR_TODO',
    filter
  }
}

export function clearTodo (filter) {
  return {
    type: 'CLEAR_TODO',
    filter
  }
}
