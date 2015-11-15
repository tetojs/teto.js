export default class REST {

  /**
   * @private
   */
  __cache = null

  /**
   * @abstract
   */
  resource = ''

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

  GET (id) {
    return this.request({
      type: 'GET',
      id
    })
  }

  POST (data) {
    return this.request({
      type: 'POST',
      data
    })
  }

  PATCH (id, data) {
    return this.request({
      type: 'PATCH',
      id,
      data
    })
  }

  PUT (id, data) {
    return this.request({
      type: 'PATCH',
      id,
      data
    })
  }

}
