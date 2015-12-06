import { PENDING, SUCCESS, FAILURE, FINALLY } from 'utils/states'

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
      type,
      meta: {
        state: PENDING
      }
    })

    return payload
      .then(
        result => dispatch({
          payload: result,
          type,
          meta: {
            state: SUCCESS
          }
        }),
        error => dispatch({
          error: true,
          payload: error,
          type,
          meta: {
            state: FAILURE
          }
        })
      )
      .catch(
        error => dispatch({
          error: true,
          payload: error,
          type,
          meta: {
            state: FAILURE
          }
        })
      )
      .finally(() => {
        setTimeout(() => dispatch({
          type,
          meta: {
            state: FINALLY
          }
        }), delay)
      })
  }
}

export default promise
