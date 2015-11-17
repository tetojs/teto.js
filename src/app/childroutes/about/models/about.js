import Promise from 'promise'

import REST from 'utils/rest'

export default class Blogs extends REST {
  resource = '/about'

  __cached = null

  promise (data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data)
      }, 0)
    })
  }

  request (options) {
    if (!this.__cached) {
      this.__cached = JSON.parse(localStorage.getItem(this.resource)) || {}
    }

    switch (options.type) {
      case 'GET':
        return this.promise(this.__cached)
      case 'PUT':
      console.log('[data]', options)
        Object.keys(options.data).forEach((key) => (this.__cached[key] = options.data[key]), this)
        localStorage.setItem(this.resource, JSON.stringify(this.__cached))
        return this.promise(this.__cached)
    }
  }

}
