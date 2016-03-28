import httpRequest from 'superagent'
import CONFIG from 'utils/config'
import auth from 'utils/auth'
import Promise from 'nd-promise'

/**
 * options' structure
 * {
 *   // 提交数据
 *   data: {
 *     $offset: 0,
 *     $limit: 20
 *   },
 *   // 根据 REST 规范，直接添加到 uri 末尾
 *   id: 123,
 *   // 替换请求地址中的 `{xyz}`
 *   vars: {
 *     xyz: 'abc'
 *   }
 * }
 */

const DELETE = 'DELETE'
const GET = 'GET'
const PATCH = 'PATCH'
const POST = 'POST'
const PUT = 'PUT'

const orgName = CONFIG.ORG_NAME

const encode = window.encodeURIComponent

const addParams = (url, params) => {
  const arr = Object.keys(params).map(key => {
    return key + '=' + '{' + key + '}'
  }).join('&')

  if (!arr) {
    return url
  }

  return url + (url.indexOf('?') !== -1 ? '&' : '?') + arr
}

const configStraight = options => {
  const { id, data, method } = options
  let { api, vars = {} } = options

  if (typeof id !== 'undefined') {
    api += '/{' + options.key + '}'
    // 保存到 vars
    vars[options.key] = id
  }

  if (data) {
    if (/^GET|DELETE$/i.test(method)) {
      api = addParams(api, data)
      vars = { ...vars, ...data }
    } else {
      // options.data = JSON.stringify(data)
    }
  }

  // disable cache
  if (!CONFIG.CACHE_ENABLED) {
    // options.headers[Browser.browser === 'IE' ? 'Pragma' : 'Cache-Control'] = 'no-cache'
    // waf DOES NOT support cors Cache-Control header currently
    // would be REMOVED after waf updated
    api += api.indexOf('?') === -1 ? '?' : '&'
    api += '_=' + new Date().getTime()
  }

  options.api = api
  options.vars = vars
}

const configDispatcher = options => {
  const dispatcher = CONFIG.DISPATCHER

  // 未开启代理
  if (!dispatcher) {
    return
  }

  // 模拟环境下，跳过代理
  if (CONFIG.ENV === CONFIG.SIMULATION) {
    return
  }

  // 本地接口，跳过代理
  if (dispatcher.res === options.res) {
    return
  }

  // 不在白名单
  if (dispatcher.ignore.indexOf(options.res) !== -1) {
    return
  }

  const { res, api, vars, headers } = options

  headers.Dispatcher = JSON.stringify({
    ...res,
    api: encode(api),
    // use vars, NOT var any more
    vars: vars
  })

  // 修改 res
  options.res = dispatcher.res

  // 修改 api
  options.api = '/' + dispatcher.api + api
}

const configAuthorization = options => {
  const { res, vars, method, headers } = options
  let { api } = options

  // always replace vars at last
  if (vars) {
    Object.keys(vars).forEach(key => {
      api = api.replace(
        new RegExp('{' + key.replace(/([\^\$\\])/g, '\\$1') + '}', 'img'),
        encode(vars[key])
      )
    })
  }
  // has uc tokens
  if (auth.hasAuthorization) {
    // data.headers.Authorization = 'DEBUG userid=220267,realm=***.nd'
    headers.Authorization =
      auth.getAuthorization(
        method, '/' + res.ver + api, res.host
      )
  }

  options.api = api
}

export default class REST {

  __resource = {
    // res: {
    //   protocol
    //   host
    //   ver
    // }
    // api
    // vars
    // id
    key: 'id'
  };

  get resource () {
    return this.__resource
  }

  set resource (val) {
    this.__resource = { ...this.__resource, ...val }
  }

  /**
   * default request data
   */
  __defaults = null;

  get defaults () {
    return this.__defaults
  }

  set defaults (val) {
    this.__defaults = { ...this.__defaults, ...val }
  }

  __interceptors = {
    options: options => options,
    response: response => response
  };

  get interceptors () {
    return this.__interceptors
  }

  set interceptors (val) {
    this.__interceptors = { ...this.__interceptors, ...val }
  }

  /**
   * @protected
   */
  request (_options, method, callback) {
    let options = {
      method: method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'orgname': orgName
      },
      data: {}
    }

    Object.assign(options, this.resource)

    // 转换直接传入 ID 值的情况
    if (typeof _options === 'string' || typeof _options === 'number') {
      options.id = _options
    } else {
      const finalData = {}

      if (method === GET) {
        Object.assign(finalData, this.defaults)
      }

      if (_options) {
        const { data, ...rest } = _options
        Object.assign(options, rest)
        Object.assign(finalData, data)
      }

      Object.assign(options.data, finalData)
    }

    // interceptor for options
    const optionsInterceptor = this.interceptors.options
    options = optionsInterceptor(options)

    // id, data, vars, etc
    configStraight(options)

    // dispatcher
    options.flag !== -1 && configDispatcher(options)

    // authorization
    configAuthorization(options)
    // configRequest(options)

    callback(options)
  }

  [DELETE] (options) {
    return new Promise((resolve, reject) => {
      this.request(options, DELETE, (options) => {
        if (!options) {
          return 'option can not be null'
        }
        let { api } = options
        const { res, headers } = options
        const host = res.protocol + res.host + '/' + res.ver

        if (api.indexOf('?') > -1) {
          api = host + api.substring(0, api.indexOf('?'))
        }

        options && httpRequest
        .del(api)
        .set(headers)
        .end((err, res) => {
          return !err ? resolve(res.body) : reject(err)
        })
      })
    })
  }

  [GET] (options) {
    return new Promise((resolve, reject) => {
      this.request(options, GET, (options) => {
        if (!options) {
          return 'option can not be null'
        }
        let { api } = options
        const { res, headers, data } = options
        const host = res.protocol + res.host + '/' + res.ver

        if (api.indexOf('?') > -1) {
          api = host + api.substring(0, api.indexOf('?'))
        }

        options && httpRequest
        .get(api)
        .query(data)
        .set(headers)
        .end((err, res) => {
          return !err ? resolve(res.body) : reject(err)
        })
      })
    })
  }

  [PATCH] (options) {
    return new Promise((resolve, reject) => {
      this.request(options, PATCH, (options) => {
        if (!options) {
          return 'option can not be null'
        }
        let { api } = options
        const { res, headers, data } = options
        const host = res.protocol + res.host + '/' + res.ver

        if (api.indexOf('?') > -1) {
          api = host + api.substring(0, api.indexOf('?'))
        }

        options && httpRequest
        .patch(api)
        .send(data)
        .set(headers)
        .end((err, res) => {
          return !err ? resolve(res.body) : reject(err)
        })
      })
    })
  }

  [POST] (options) {
    return new Promise((resolve, reject) => {
      this.request(options, POST, (options) => {
        if (!options) {
          return 'option can not be null'
        }
        let { api } = options
        const { res, headers, data } = options
        const host = res.protocol + res.host + '/' + res.ver

        if (api.indexOf('?') > -1) {
          api = host + api.substring(0, api.indexOf('?'))
        }

        options && httpRequest
        .post(api)
        .send(data)
        .set(headers)
        .end((err, res) => {
          return !err ? resolve(res.body) : reject(err)
        })
      })
    })
  }

  [PUT] (options) {
    return new Promise((resolve, reject) => {
      this.request(options, PUT, (options) => {
        if (!options) {
          return 'option can not be null'
        }
        let { api } = options
        const { res, headers, data } = options
        const host = res.protocol + res.host + '/' + res.ver

        if (api.indexOf('?') > -1) {
          api = host + api.substring(0, api.indexOf('?'))
        }

        options && httpRequest
        .put(api)
        .send(data)
        .set(headers)
        .end((err, res) => {
          return !err ? resolve(res.body) : reject(err)
        })
      })
    })
  }

}
