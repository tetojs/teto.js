const Sha = require('nd-sha')
import Storage from 'utils/storage'

const storage = new Storage('AUTH')
const tokensKey = 'TOKENS'

let tokensObj

function nonce (diff) {
  function rnd (min, max) {
    let arr = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', 'g',
      'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't',
      'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G',
      'H', 'I', 'J', 'K', 'L', 'M', 'N',
      'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z'
    ]

    let range = max ? max - min : min
    let str = ''
    let i
    let length = arr.length - 1

    for (i = 0; i < range; i++) {
      str += arr[Math.round(Math.random() * length)]
    }

    return str
  }

  return new Date().getTime() + (diff || 0) + ':' + rnd(8)
}

export default {

  isLogin: function () {
    return !!this.getTokens()
  },

  getTokens: function (key) {
    let tokens = tokensObj

    if (!tokens) {
      // 本地存储
      tokens = storage.get(tokensKey)
    }

    if (tokens) {
      // 失效判断
      if (new Date(tokens.expires_at) <= new Date()) {
        this.setTokens(tokens = null)
      }
    }

    if (tokens) {
      tokensObj = tokens
    }

    if (key && tokens) {
      return tokens[key]
    }

    return tokens
  },

  /**
   * 设置或清除 tokens
   * @param {object} tokens token值
   * @returns {undefined} undefined
   */
  setTokens: function (tokens) {
    tokensObj = tokens

    if (tokens === null) {
      storage.remove(tokensKey)
    } else {
      let serverTime = new Date(tokens.server_time)
      let expiresAt = new Date(tokens.expires_at)

      tokens.diff = serverTime - new Date()

      storage.set(tokensKey, tokens, expiresAt - serverTime)
    }
  },

  destroy: function () {
    this.setTokens(null)
  },

  getAccessToken: function () {
    return this.getTokens('access_token')
  },

  getAuthentization: function (method, url, host) {
    return ['MAC id="' + this.getAccessToken() + '"',
      'nonce="' + this._getNonce() + '"',
      'mac="' + this._getMac(method, url, host) + '"'
    ].join(',')
  },

  _getMacContent: function (method, url, host) {
    return [this.nonce, method, url, host, ''].join('\n')
  },

  _getMac: function (method, url, host) {
    return new Sha(this._getMacContent(method, url, host), 'TEXT')
      .getHMAC(this.getTokens('mac_key'), 'TEXT', 'SHA-256', 'B64')
  },

  _getNonce: function () {
    return (this.nonce = nonce(this.getTokens('diff')))
  }

}
