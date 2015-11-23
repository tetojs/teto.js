export default class REST {

  /**
   * @private
   */
  // __cache = null

  /**
   * @abstract
   */
  __resource = {
    // host
    // version
    // uri
  }

  get resource () {
    let { host, version, uri } = this.__resource

    return [host, version, uri].join('/')
  }

  set resource (val) {
    this.__resource = val
  }

  /**
   * @protected
   */
  // parser = JSON

  /**
   * @protected
   */
  request (options) {
    console.log('request with options:', options)
  }

  /**
   * @abstract
   */
  resolve (data) {
  }

  /**
   * @abstract
   */
  reject (error) {
  }

  DELETE (id) {
    return this.request({
      type: 'DELETE',
      id
    })
  }

  GET (id) {
    return this.request({
      type: 'GET',
      id
    })
  }

  PATCH (id, data) {
    return this.request({
      type: 'PATCH',
      id,
      data
    })
  }

  POST (data) {
    return this.request({
      type: 'POST',
      data
    })
  }

  PUT (data) {
    return this.request({
      type: 'PUT',
      data
    })
  }

}
