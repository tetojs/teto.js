import store from 'redux/store'
import Sha from 'jssha'

function getNonce (diff) {
  function rnd (min, max) {
    const arr = [
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

    const range = max ? max - min : min
    let str = ''
    let i
    const length = arr.length - 1

    for (i = 0; i < range; i++) {
      str += arr[Math.round(Math.random() * length)]
    }

    return str
  }

  return new Date().getTime() + (diff || 0) + ':' + rnd(8)
}

function getMac (nonce, method, url, host, key) {
  const sha = new Sha('SHA-256', 'TEXT')
  sha.setHMACKey(key, 'TEXT')
  sha.update([nonce, method, url, host, ''].join('\n'))
  return sha.getHMAC('B64')
}

export default {

  __access_token: null,

  get accessToken () {
    return this.__access_token
  },

  set accessToken (val) {
    this.__access_token = val
  },

  __mac_key: null,

  get macKey () {
    return this.__mac_key
  },

  set macKey (val) {
    this.__mac_key = val
  },

  __diff: null,

  get diff () {
    return this.__diff
  },

  set diff (val) {
    this.__diff = val
  },

  __expires_at: null,

  get expiresAt () {
    return this.__expires_at
  },

  set expiresAt (val) {
    this.__expires_at = val
  },

  get hasAuthorization () {
    const { tokens } = store.getState()

    if (tokens) {
      const { access_token, mac_key, diff = 0, expires_at } = tokens

      if (!expires_at) {
        return false
      }

      // cached timestamp
      if (expires_at === this.expiresAt) {
        return true
      }

      if (new Date(tokens.expires_at).getTime() > Date.now() + diff) {
        this.configure(access_token, mac_key, diff, expires_at)
        return true
      }
    }

    return false
  },

  configure (accessToken, macKey, diff, expiresAt) {
    this.accessToken = accessToken
    this.macKey = macKey
    this.diff = diff
    this.expiresAt = expiresAt
  },

  getAuthorization (method, url, host) {
    const nonce = getNonce(this.diff)

    return ['MAC id="' + this.accessToken + '"',
      'nonce="' + nonce + '"',
      'mac="' + getMac(nonce, method, url, host, this.macKey) + '"'
    ].join(',')
  }

}
