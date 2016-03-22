// 框架版本
const APP_CORE = '1.0.0'

// 本地模拟
const SIMULATION = 0
// 开发
const DEVELOPMENT = 1
// 测试
const DEBUG = 2
// 生产
const PRODUCTION = 4
// 预生产
const PREPRODUCTION = 8
// 压测
const PRESSURE = 16
// 亚马逊
const AWS = 32

const LOC_PROTOCOL = location.protocol + '//'
const LOC_HOST = location.host
// host === hostname:port
const LOC_HOSTNAME = location.hostname

/**
 * @constant {number} ENV
 */
const ENV = (() => {
  switch (LOC_HOSTNAME) {
    case '127.0.0.1':
      return SIMULATION
    case 'localhost':
      return PREPRODUCTION
    default:
      if (/\.dev\.web\.nd$/.test(LOC_HOSTNAME)) {
        return DEVELOPMENT
      }
      if (/\.debug\.web\.nd$/.test(LOC_HOSTNAME)) {
        return DEBUG
      }
      if (/\.qa\.web\.sdp\.101\.com$/.test(LOC_HOSTNAME)) {
        return PRESSURE
      }
      if (/\.beta\.web\.sdp\.101\.com$/.test(LOC_HOSTNAME)) {
        return PREPRODUCTION
      }
      if (/\.aws\.101\.com$/.test(LOC_HOSTNAME)) {
        return AWS
      }
      return PRODUCTION
  }
})()

const LOC_RES = {
  module: 'loc',
  protocol: LOC_PROTOCOL,
  host: LOC_HOST,
  ver: 'v0.1'
}

/**
 * @constant {object} UC_RES
 */

/**
 * @constant {object} CS_RES
 */

let UC_RES = {
  module: 'uc',
  protocol: 'https://',
  ver: 'v0.9'
}
let CS_RES = {
  module: 'cs',
  protocol: 'https://',
  ver: 'v0.1'
}

switch (ENV) {
  case DEVELOPMENT:
  case DEBUG:
  case PREPRODUCTION:
  case PRESSURE:
    UC_RES.host = 'ucbetapi.101.com'
    CS_RES.host = 'betacs.101.com'
    break
  case PRODUCTION:
    UC_RES.host = 'aqapi.101.com'
    CS_RES.host = 'cs.101.com'
    break
  case AWS:
    UC_RES.host = 'awsuc.101.com'
    CS_RES.host = 'awscs.101.com'
    break
  default:
    UC_RES = LOC_RES
    CS_RES = LOC_RES
}

/**
 * @constant {object} MB_RES
 */

let MB_RES = {
  module: 'microblog',
  protocol: 'http://',
  ver: 'v0.1'
}

switch (ENV) {
  case DEVELOPMENT:
    MB_RES.host = 'microblog.dev.web.nd'
    break
  case DEBUG:
    MB_RES.host = 'microblog.debug.web.nd'
    break
  case PRODUCTION:
    MB_RES.host = 'microblog.web.sdp.101.com'
    break
  case AWS:
    MB_RES.host = 'microblog.aws.101.com'
    break
  case PREPRODUCTION:
    MB_RES.host = 'microblog.beta.web.sdp.101.com'
    break
  case PRESSURE:
    MB_RES.host = 'microblog.qa.web.sdp.101.com'
    break
  default:
    MB_RES = LOC_RES
}

/**
 * @constant {boolean} 开启接口请求缓存（浏览器机制）
 */
const CACHE_ENABLED = false

/**
 * @constant {boolean} 开启基于角色的权限控制
 */
const RBAC_ENABLED = false

/**
 * @constant {object} 接口请求代理配置，设置为 null 不走代理
 */
const DISPATCHER = ENV === SIMULATION ? null : {
  // 不走代理的资源
  ignore: [CS_RES],
  res: LOC_RES,
  api: 'dispatcher'
}

/**
 * @constant {string} DATETIME_FORMAT 默认的时间日期格式
 */
const DATETIME_FORMAT = 'yyyy-MM-dd hh:mm:ss'

/**
 * @constant {string} DATE_FORMAT 默认的日期格式
 */
const DATE_FORMAT = 'yyyy-MM-dd'

/**
 * @constant {string} TIME_FORMAT 默认的时间格式
 */
const TIME_FORMAT = 'hh:mm:ss'

/**
 * @constant {string} TOAST_DURATION 默认提示信息显示毫秒数
 */
const TOAST_DURATION = 3000

/**
 * @constant {object}  I18N 多语言对应
 */
const I18N = {
  'zh-CN': '\u7b80\u4f53\u4e2d\u6587',
  'en-US': 'English',
  'id-ID': 'Bahasa Indonesia'
}

/**
 * @constant {string}  透明图片
 */
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export default {
  APP_CORE,
  SIMULATION,
  DEVELOPMENT,
  DEBUG,
  PRODUCTION,
  PREPRODUCTION,
  PRESSURE,
  AWS,
  ENV,
  LOC_RES,
  UC_RES,
  CS_RES,
  MB_RES,
  CACHE_ENABLED,
  RBAC_ENABLED,
  DISPATCHER,
  DATETIME_FORMAT,
  DATE_FORMAT,
  TIME_FORMAT,
  TOAST_DURATION,
  I18N,
  BLANK
}
