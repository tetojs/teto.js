const isRestful = val => {
  return typeof val === 'object' && typeof val.then === 'function' &&
    (val.hasOwnProperty('$limit') || val.hasOwnProperty('$offse'))
}

export default ({ dispatch }) => {
  return next => action => {
    const { type, payload } = action

    if (payload && isRestful(payload)) {
      dispatch({
        type: type + '_RESTFUL',
        payload: {
          $offset: payload.$offset,
          $limit: payload.$limit
        }
      })
    }

    next(action)
  }
}
