function isPromise(val) {
  return val && typeof val.then === 'function'
}

export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    const { payload, types, ...rest } = action

    if (!payload || !isPromise(payload)) {
      return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE, FINALLY] = types

    dispatch({...rest, type: REQUEST})

    return payload
      .then(
        result => dispatch({ ...rest, payload: result, type: SUCCESS }),
        error => dispatch({ ...rest, payload: error, type: FAILURE })
      )
      .catch((error) => {
        console.error('MIDDLEWARE ERROR:', error)
        dispatch({...rest, payload: error, type: FAILURE})
      })
      .finally(() => dispatch({...rest, type: FINALLY}))
  }
}
