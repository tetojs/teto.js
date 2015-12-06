import { PENDING, SUCCESS, FAILURE, FINALLY } from 'utils/states'

const createTypeWithState = (type, state) => {
  return state ? type + '_' + state : type
}

const isPromise = (val) => {
  return val && typeof val.then === 'function'
}

/**
 * 创建 promise middleware
 * @param  {number} delay)  finally dispatch 的延迟时间
 * @return {function}       redux middleware
 */
const promise = (delay) => ({ dispatch }) => {
  return next => action => {
    const { type, payload } = action

    if (!payload || !isPromise(payload)) {
      return next(action)
    }

    dispatch({
      type: createTypeWithState(type, PENDING)
    })

    return payload
      .then(
        result => dispatch({
          payload: result,
          type: createTypeWithState(type, SUCCESS)
        }),
        error => dispatch({
          error: true,
          payload: error,
          type: createTypeWithState(type, FAILURE)
        })
      )
      .catch(
        error => dispatch({
          error: true,
          payload: error,
          type: createTypeWithState(type, FAILURE)
        })
      )
      .finally(() => {
        setTimeout(() => dispatch({
          type: createTypeWithState(type, FINALLY)
        }), delay)
      })
  }
}

export default promise
