import axios from 'axios'
import Promise from 'promise'
import 'promise.prototype.finally'
import ENV from 'utils/env'
import auth from 'utils/auth'

const encode = window.encodeURIComponent

const addParams = function (url, params, useVar) {
  var arr = Object.keys(params).map(function(key) {
    return encode(key) + '=' + (useVar ? ('{' + key + '}') : encode(params[key]))
  }).join('&')

  if (!arr) {
    return url
  }

  return url + (url.indexOf('?') !== -1 ? '&' : '?') + arr
}

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
    // protocol
    // host
    // ver
    // api
    // vars
    // id
    idVar: 'id'
  }

  get resource () {
    return this.__resource;
  }

  set resource (val) {
    this.__resource = val
  }

  __inFilter = options => options

  get inFilter () {
    return this.__inFilter;
  }

  set inFilter (val) {
    this.__inFilter = val;
  }

  /**
   * @protected
   */
  // parser = JSON

  /**
   * @protected
   */
  request (options, method) {
    if (typeof options === 'string' || typeof options === 'number') {
      options = {
        id: options
      }
    }

    options = Object.assign({ method: method }, this.__resource, options)

    this.inFilter(options)

    // this.processDispatcher(options)
    // this.processId(options)
    // this.processVars(options)
    this.processUrl(options)
    this.processData(options)
    this.processHeaders(options)

    let config = {}

    let keys = ['url', 'method', 'data', 'headers']

    keys.forEach(function(key) {
      if (options.hasOwnProperty(key)) {
        config[key] = options[key]
      }
    })

    return new Promise(function(resolve, reject) {
      axios(config).then(function(response) {
        resolve(response.data)
      }, function(response) {
        reject(response.data)
      })
    })
  }

  processUrl (options) {
    let { api, id, data, method, vars } = options

    if (typeof id !== 'undefined') {
      api += '/' + id
    }

    if (data && /^GET|DELETE$/i.test(method)) {
      api = addParams(api, data)
    }

    if (vars) {
      Object.keys(vars).forEach(function(key) {
        api = api.replace(new RegExp('{' + key + '}', 'img'), encode(vars[key]))
      })
    }

    // disable cache
    if (!ENV.CACHE_ENABLED) {
      // waf DOESN'T support cors Cache-Control header currently
      // would be REMOVED after waf updated
      api += api.indexOf('?') === -1 ? '?' : '&'
      api += '_=' + new Date().getTime()
    }

    options.api = api

    options.url = options.protocol + options.host + '/' + options.ver + options.api
  }

  processData (options) {
    if (options.data && /^POST|PATCH|PUT$/i.test(options.method)) {
      options.data = JSON.stringify(options.data)
    }
  }

  processHeaders (options) {
    options.headers = options.headers || {
      'Content-Type': 'application/json'
    }

    // disable cache
    if (!ENV.CACHE_ENABLED) {
      if (options.dispatcher) {
        options.headers[Browser.browser === 'IE' ? 'Pragma' : 'Cache-Control'] = 'no-cache'
      }
    }

    // proxy pass
    if (options.dispatcher) {
      options.headers.Dispatcher = options.dispatcher
    }

    // has uc tokens
    if (auth.isLogin()) {
      // data.headers.Authorization = 'DEBUG userid=220267'
      // data.headers.Authorization = 'DEBUG userid=220267,realm=***.nd'
      options.headers.Authorization =
        auth.getAuthentization(
          options.method, '/' + options.ver + options.api, options.host
        )
    }
  }

  createConfig (options) {
    let config = {}

    Object.keys(options).forEach(function(key) {
      if (['url', 'method', 'data', 'headers'].indexOf(key) !== -1) {
        config[key] = options[key]
      }
    })

    return config
  }

  appendApiWithId (api, options) {
    if (options.data && options.data[options.idVar]) {
      return api + '/' + options.data[options.idVar]
    }

    return api
  }

  mergeOpts(options) {
    // let {
    //   vars, method, data
    // } = options

    return Object.assign({}, this.__resource, options)
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

  processDispatcher (options) {
    // 未开启代理
    if (!ENV.DISPATCHER_ENABLED) {
      return
    }

    // 模拟环境下
    if (ENV.ENV === ENV.SIMULATION) {
      return
    }

    let dispatchUrl = options.dispatchUrl

    // 存在白名单
    if (ENV.DISPATCHER_WHITELIST) {
      // 不在白名单
      if (ENV.DISPATCHER_WHITELIST.indexOf(dispatchUrl) === -1) {
        return
      }
    } else {
      // 本地接口
      if (dispatchUrl === ENV.LOC_ORIGIN) {
        return
      }
    }

    // 开始设置 dispatcher
    let api = options.api

    if (options.data && !/^POST|PATCH|PUT$/i.test(options.method)) {
      api = addParams(api, options.data, true)
      this.addVars(options)
    }

    options.dispatcher = JSON.stringify({
      'protocol': options.protocol,
      'host': dispatchUrl.replace(/^(?:https?:)?\/\//i, ''),
      'ver': options.ver,
      'api': encodeURIComponent(api),
      'var': options.vars,
      'module': options.module
    })

    return options
  }

  addVars (options) {
    options.vars = { ...options.vars, ...options.data }
  }

}
