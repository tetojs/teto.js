import axios from 'axios'
import 'promise.prototype.finally'
import util from './env'

const encode = window.encodeURIComponent;

export default class REST {

  /**
   * @private
   */
  // __cache = null

  /**
   * @abstract
   */
  __resource = {
    // dispatchUrl
    // protocol
    // host
    // ver
    // api
    // vars
  }

  get resource() {
    return this.__resource;
  }

  set resource(val) {
    this.__resource = val
  }

  __preSendHandler = config => config

  get preSendHandler() {
    return this.__preSendHandler;
  }

  set preSendHandler(val) {
    this.__preSendHandler = val;
  }

  /**
   * @protected
   */
  // parser = JSON

  /**
   * @protected
   */
  request(options) {
    // dispatch
    this.processDispatch(options);
    this.processUrl(options);
    this.processData(options);
    this.processHeaders(options);

    let config = this.createConfig(options);
    return axios(this.preSendHandler(config));
  }

  processDispatch(options) {
    // 未开启代理
    if (!util.DISPATCHER_ENABLED) {
      return;
    }

    // 模拟环境下
    if (util.ENV === util.SIMULATION) {
      return;
    }

    let dispatchUrl = options.dispatchUrl;

    // 存在白名单
    if (util.DISPATCHER_WHITELIST) {
      // 不在白名单
      if (util.DISPATCHER_WHITELIST.indexOf(dispatchUrl) === -1) {
        return;
      }
    } else {
      // 本地接口
      if (dispatchUrl === util.LOC_ORIGIN) {
        return;
      }
    }

    // 开始设置 dispatcher
    let api = options.api;
    if (options.data && !/^POST|PATCH|PUT$/i.test(options.method)) {
      api = this.addParam(api, options.data);
    }

    options.dispatcher = JSON.stringify({
      'host': dispatchUrl.replace(/^(?:https?:)?\/\//i, ''),
      'ver': options.ver,
      'api': encodeURIComponent(api),
      'var': options.vars,
      'module': options.module
    });

    return options;
  }

  processUrl(options) {
    options.url = options.protocol + options.host + '/' + options.ver + this.replaceApiWithVars(options.api, options.vars);
  }

  processData(options) {
    if (options.data) {
      if (/^POST|PATCH|PUT$/i.test(options.method)) {
        options.data = JSON.stringify(options.data);
      } else {
        // GET
        options.url = addParam(options.url, options.data);
        // 防止 jQuery 自动拼接
        options.data = null;
      }
    }

    return options;
  }

  processHeaders(options) {
    options.headers = options.headers || {};
    // disable cache
    if (!util.CACHE_ENABLED) {
      if (options.dispatcher) {
        options.headers[Browser.browser === 'IE' ? 'Pragma' : 'Cache-Control'] = 'no-cache';
      } else {
        // waf DOESN'T support cors Cache-Control header currently
        // would be REMOVED after waf updated
        options.url += options.url.indexOf('?') === -1 ? '?' : '&';
        options.url += '_=' + new Date().getTime();
      }
    }

    // proxy pass
    if (options.dispatcher) {
      options.headers.Dispatcher = dispatcher;
    }

    // has uc tokens
    if (util.auth.isLogin()) {
      let matched = options.url.match(/^(?:https?:)?\/\/([^\/]+)(\/.+)$/i);
      // data.headers.Authorization = 'DEBUG userid=220267';
      options.headers.Authorization =
        util.auth.getAuthentization(
          options.method, matched[2], matched[1]
        );
      // data.headers.Authorization = 'DEBUG userid=220267,realm=***.nd';
    }

    return options;
  }

  createConfig(options) {
    let config = {};

    Object.keys(options).forEach(function(key) {
      if (['url', 'method', 'data', 'headers'].indexOf(key) > -1) {
        config[key] = options[key];
      }
    });

    return config;
  }

  replaceApiWithVars(api, vars) {
    if (vars) {
      Object.keys(vars).forEach(function(key) {
        api = api.replace(new RegExp('{' + key + '}', 'img'), encode(vars[key]));
      });
    }

    return api;
  }

  addParams(url, params) {
    var arr = Object.keys(params).map(function(key) {
      return encode(key) + '=' + encode(params[key]);
    }).join('&');

    if (!arr) {
      return url;
    }

    return url + (url.indexOf('?') !== -1 ? '&' : '?') + arr;
  }

  mergeOpts(options) {
    // let {
    //   vars, method, data
    // } = options;

    return Object.assign({}, this.__resource, options);
  }

  /**
   *
   * @param {Object} options 只可以设置vars和data属性
   * vars属性用于替换url中的占位符，data是get方法中url的参数，
   * 或是其他方法中的body
   * {
   *   vars: {
   *     id: xx,
   *     page: 1,
   *     size: 20
   *   },
   *   data: {
   *     id: xx,
   *     name: xx
   *   }
   * }
   */
  DELETE(options) {
    options.method = 'DELETE';
    return this.request(this.mergeOpts(options));
  }

  GET(options) {
    options.method = 'GET';
    return this.request(this.mergeOpts(options));
  }

  PATCH(options) {
    options.method = 'PATCH';
    return this.request(this.mergeOpts(options));
  }

  POST(options) {
    options.method = 'POST';
    return this.request(this.mergeOpts(options));
  }

  PUT(options) {
    options.method = 'PUT';
    return this.request(this.mergeOpts(options));
  }
}
