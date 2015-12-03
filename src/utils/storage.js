/**
 * @module Storage
 * @author crossjs <liwenfu@crossjs.com>
 */

/**
 * @param {string} prefix  key 前缀
 * @param {number} expire  默认过期毫秒数
 * @param {object} driver  数据存储器
 * @return {object} this
 */
function Storage (prefix, expire, driver) {
  this.prefix = prefix || ''
  this.expire = expire || 0
  this.driver = driver || (expire === -1 ? window.sessionStorage : window.localStorage)
}

Storage.prototype = {

  constructor: Storage,

  makeKey: function (key) {
    return this.prefix + key
  },

  /**
   * 获取所有的本地存储数据对应的 key
   * @returns {array} keys
   */
  keys: function () {
    let keys = Object.keys(this.driver)

    if (this.prefix) {
      let index = this.prefix.length

      return keys.map(function (key) {
        return key.substring(index)
      })
    }

    return keys
  },

  /**
   * 移除某一项本地存储的数据
   */
  remove: function (key) {
    this.driver.removeItem(this.makeKey(key))
  },

  /**
   * 清除所有本地存储的数据
   */
  clear: function () {
    this.driver.clear()
  },

  /**
   * 将数据进行本地存储
   */
  set: function (key, value, expire) {
    let data = {
      value: value,
      expire: expire
    }

    if (typeof expire === 'undefined') {
      data.expire = this.expire
    }

    if (data.expire) {
      data.expire = Date.now() + data.expire
    }

    this.driver.setItem(this.makeKey(key), JSON.stringify(data))
  },

  /**
   * 提取本地存储的数据
   */
  get: function (key) {
    let data = this.driver.getItem(this.makeKey(key))

    if (data) {
      data = JSON.parse(data)

      if (data.expire) {
        if (data.expire < Date.now()) {
          this.remove(key)
          data = null
        }
      }
    }

    return data && data.value
  }

}

export default Storage
