import Promise from 'promise'

import REST from 'utils/rest'

export default class Blogs extends REST {
  resource = '/blogs'

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
      this.__cached = JSON.parse(localStorage.getItem(this.resource)) || []
    }

    switch (options.type) {
      case 'GET':
        return this.promise(this.__cached)
      case 'POST':
        this.__cached = this.__cached.concat({
          id: this.__cached.reduce((maxId, item) => Math.max(item.id, maxId), 0) + 1,
          ...options.data})
        localStorage.setItem(this.resource, JSON.stringify(this.__cached))
        return this.promise(this.__cached[this.__cached.length])
      case 'DELETE':
        let matched = null
        this.__cached.some(function (item, index) {
          if (item.id === options.id) {
            matched = index
            return true
          }
        })
        if (matched !== -1) {
          matched = this.__cached.splice(matched, 1)
        }
        localStorage.setItem(this.resource, JSON.stringify(this.__cached))
        return this.promise(matched || {})
    }
  }

}
