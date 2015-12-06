import axios from 'axios'
import Promise from 'promise'
import ENV from 'utils/env'
import auth from 'utils/auth'

/**
 * options' structure
 * {
 *   // 提交数据
 *   data: {
 *     page: 1,
 *     size: 20
 *   },
 *   // 根据 REST 规范，直接添加到 uri 末尾
 *   id: 123,
 *   // 替换请求地址中的 `{xyz}`
 *   vars: {
 *     xyz: 'abc'
 *   }
 * }
 */

export default class REST {

  /**
   * @private
   */
  // __cache = null

  /**
   * @abstract
   */
  __resource = {
    // res: {
    //   protocol
    //   host
    //   ver
    // }
    // api
    // vars
    // id
    idVar: 'id'
  }

  get resource () {
    return this.__resource
  }

  set resource (val) {
    this.__resource = { ...this.__resource, ...val }
  }

  __interceptors = {
    options: (options) => options,
    response: (response) => response
  }

  get interceptors () {
    return this.__interceptors
  }

  set interceptors (val) {
    this.__interceptors = { ...this.__interceptors, ...val }
  }

  /**
   * @protected
   */
  // parser = JSON

  /**
   * @protected
   */
  request (options, method) {
    // 转换直接传入 ID 值的情况
    if (typeof options === 'string' || typeof options === 'number') {
      options = {
        id: options
      }
    }

    options = Object.assign({
      method: method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }, this.resource, options)

    // interceptor for options
    let optionsInterceptors = this.interceptors.options
    options = optionsInterceptors(options)

    let dispatcher = getDispatcher(options)

    // id, data, vars, etc
    processIdAndData(options, !!dispatcher)
    // dispatcher
    dispatcher && processDispatcher(options, dispatcher)
    // authorization
    processAuthorization(options)

    // interceptor for response
    let responseInterceptors = this.interceptors.response
    // 只返回 axios 构造的返回值中的 data 部分
    return new Promise((resolve, reject) => {
      axios(getConfigForAxios(options))
      .then(({ data }) => {
        resolve(responseInterceptors(data))
      }, ({ data }) => {
        reject(responseInterceptors(data))
      })
    })
  }

  DELETE (options) {
    return this.request(options, 'DELETE')
  }

  GET (options) {
    return this.request(options, 'GET')
  }

  PATCH (options) {
    return this.request(options, 'PATCH')
  }

  POST (options) {
    return this.request(options, 'POST')
  }

  PUT (options) {
    return this.request(options, 'PUT')
  }

}

const encode = window.encodeURIComponent

const addParams = (url, params, hasDispatcher) => {
  let arr = Object.keys(params).map((key) => {
    return encode(key) + '=' + (hasDispatcher ? ('{' + key + '}') : encode(params[key]))
  }).join('&')

  if (!arr) {
    return url
  }

  return url + (url.indexOf('?') !== -1 ? '&' : '?') + arr
}

const getDispatcher = (options) => {
  // 未开启代理
  if (!ENV.DISPATCHER) {
    return false
  }

  // 模拟环境下，跳过代理
  if (ENV.ENV === ENV.SIMULATION) {
    return false
  }

  // 本地接口，跳过代理
  if (ENV.DISPATCHER.res === options.res) {
    return false
  }

  // 存在白名单
  if (ENV.DISPATCHER.whitelist) {
    // 不在白名单
    if (ENV.DISPATCHER.whitelist.indexOf(options.res) === -1) {
      return false
    }
  }

  return ENV.DISPATCHER
}

const processIdAndData = (options, dispatcher) => {
  let { api, id, data, method, vars = {}, res } = options

  if (typeof id !== 'undefined') {
    if (dispatcher) {
      api += '/{' + options.idVar + '}'
      // 保存到 vars
      vars[options.idVar] = id
    } else {
      api += '/' + id
    }
  }

  if (data) {
    if (/^GET|DELETE$/i.test(method)) {
      api = addParams(api, data, dispatcher)

      if (dispatcher) {
        vars = { ...vars, ...data }
      }
    } else {
      options.data = JSON.stringify(data)
    }
  }

  // disable cache
  if (!ENV.CACHE_ENABLED) {
    if (dispatcher) {
      // options.headers[Browser.browser === 'IE' ? 'Pragma' : 'Cache-Control'] = 'no-cache'
    } else {
      // waf DOES NOT support cors Cache-Control header currently
      // would be REMOVED after waf updated
      api += api.indexOf('?') === -1 ? '?' : '&'
      api += '_=' + new Date().getTime()
    }
  }

  options.api = api
  options.vars = vars
}

const processDispatcher = (options, dispatcher) => {
  let { res, api, vars, headers } = options

  headers.Dispatcher = JSON.stringify({
    ...res,
    api: encode(api),
    // use vars, NOT var any more
    vars: vars
  })

  // disable cache
  // if (!ENV.CACHE_ENABLED) {
    // headers[Browser.browser === 'IE' ? 'Pragma' : 'Cache-Control'] = 'no-cache'
  // }

  // 修改 res
  options.res = dispatcher.res

  // 修改 api
  options.api = '/' + dispatcher.api + api
}

const processAuthorization = (options) => {
  let { res, api, vars, method, headers } = options

  // always replace vars at last
  if (vars) {
    Object.keys(vars).forEach((key) => {
      api = api.replace(new RegExp('{' + key + '}', 'img'), encode(vars[key]))
    })
  }

  // has uc tokens
  if (auth.isLogin()) {
    // data.headers.Authorization = 'DEBUG userid=220267,realm=***.nd'
    headers.Authorization =
      auth.getAuthentization(
        method, '/' + res.ver + api, res.host
      )
  }

  options.api = api
}

const getConfigForAxios = (options) => {
  let { res, api, data, method, headers } = options

  return {
    url: res.protocol + res.host + '/' + res.ver + api,
    method,
    data,
    headers
  }
}
