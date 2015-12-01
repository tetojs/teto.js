import Promise from 'promise'

import REST from 'utils/rest'

export default class extends REST {
  __cached = null

  __resource = {
    host: '',
    version: '',
    uri: 'about'
  }

  resolve (data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, 1000)
    })
  }

  reject (data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(data)
      }, 1000)
    })
  }

  request (options) {
    if (!this.__cached) {
      this.__cached = JSON.parse(localStorage.getItem(this.resource)) || {}
    }

    switch (options.type) {
      case 'GET':
        return this.resolve(this.__cached)
      case 'PUT':
      console.log('[data]', options)
        Object.keys(options.data).forEach((key) => (this.__cached[key] = options.data[key]), this)
        localStorage.setItem(this.resource, JSON.stringify(this.__cached))
        return this.resolve(this.__cached)
    }
  }

}
