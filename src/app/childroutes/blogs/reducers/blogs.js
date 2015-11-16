import extend from 'extend'

function blogs ( state = [], action ) {
  switch (action.type) {
    case 'FETCH_BLOGS':
      return [...action.payload] || []
    case 'CREATE_BLOG':
      return extend(true, [], state).concat[{...action.payload}]
    case 'DELETE_BLOG':
      return extend(true, [], state).concat[{...action.payload}]
    default:
      return state
  }
}

export default blogs
