import Promise from 'promise'

import REST from 'utils/rest'

export default class extends REST {
  __cached = null

  __resource = {
    host: '',
    version: '',
    uri: 'blogs'
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
      this.__cached = JSON.parse(localStorage.getItem(this.resource)) || []
    }

    switch (options.method) {
      case 'GET':
        return this.resolve({
          count: this.__cached.length,
          items: this.__cached
        })
      case 'POST':
        if (this.__cached.some(item => item.title === options.data.title)) {
          return this.reject({
            code: 201,
            message: 'duplicated'
          })
        }
        this.__cached = this.__cached.concat({
          id: this.__cached.reduce((maxId, item) => Math.max(item.id, maxId), 0) + 1,
          ...options.data})
        localStorage.setItem(this.resource, JSON.stringify(this.__cached))
        return this.resolve(this.__cached[this.__cached.length - 1])
      case 'DELETE':
        let matched = null
        this.__cached.some(function (item, index) {
          if (item.id === options.id) {
            matched = index
            return true
          }
        })
        if (matched !== null) {
          matched = this.__cached.splice(matched, 1)[0]
        }
        localStorage.setItem(this.resource, JSON.stringify(this.__cached))
        return this.resolve(matched || {})
    }
  }

}
