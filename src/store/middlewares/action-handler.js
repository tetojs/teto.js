import * as _fluxStandardAction from 'flux-standard-action'

const RECEIVE_GLOBAL_MESSAGE = 'RECEIVE_GLOBAL_MESSAGE';
const isFunc = (arg) => typeof arg === 'function';

/**
 * meta.error {string|function}
 * meta.success {string|function}
 * meta.always {function}
 * @param dispatch
 */
export default ({dispatch}) => next => action => {
  if (action.type === RECEIVE_GLOBAL_MESSAGE) return next(action);

  const isError = _fluxStandardAction.isFSA(action) && _fluxStandardAction.isError(action);
  let { meta = {}, payload = {} } = action;
  let isShowGlobalMessage;

  let { data } = payload;

  if (isError) {
    if (isFunc(meta.error)) {
      meta.error(data);
    } else {
      isShowGlobalMessage = true;
      data.type = 'error';
      data.message = meta.error || data.message;
    }
  } else if (meta.success) {
    if (isFunc(meta.success)) {
      meta.success(data);
    } else {
      isShowGlobalMessage = true;
      data.type = 'success';
      data.message = meta.success;
    }
  }

  if (isShowGlobalMessage) {
    dispatch({
      type: RECEIVE_GLOBAL_MESSAGE,
      payload: data
    })
  }

  // 本来想用finally，怕关键字会有问题，先这样吧
  isFunc(meta.always) && meta.always(action);

  return next(action);
}