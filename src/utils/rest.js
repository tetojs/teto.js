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
