import { join, sep } from 'path'
import assert from 'assert'
import _debug from 'debug'
import send from 'koa-send'

const debug = _debug('app:server:webpack-mock')

/**
 * Serve mocks from `root`.
 *
 * @param {String} root
 * @return {Function}
 * @api public
 */

export default (root, options) => {
  debug('Enable Webpack API Mocking.')

  assert(root, 'root directory is required to serve api mocks')

  let lastMatcher = () => true
  let lastReducer = dest => dest

  const { matcher, reducer } = options

  if (matcher) {
    if (typeof matcher === 'function') {
      lastMatcher = matcher
    } else if (matcher.constructor === RegExp) {
      lastMatcher = url => matcher.test(url)
    }
  }

  if (reducer) {
    if (typeof reducer === 'function') {
      lastReducer = reducer
    } else if (reducer.constructor === RegExp) {
      lastReducer = url => url.replace(reducer, '')
    }
  }

  return async (ctx, next) => {
    if (lastMatcher(ctx.url)) {
      // reduce path
      let dest = lastReducer(ctx.path)
      // mock exactly
      if (await send(ctx, join(dest, ctx.method + '.json'), { root })) return
      // mock wildcards
      dest = dest.split(sep)
      let size = dest.length
      while (size--) {
        const _dest = [...dest]
        // alias of `*`
        _dest[size] = '_'
        if (await send(ctx, join(_dest.join(sep), ctx.method + '.json'), { root })) return
      }
    }
  }
}
