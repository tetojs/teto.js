import ENV from 'utils/env'
import REST from 'utils/rest'

import Promise from 'promise'

export default class extends REST {

  resource = {
    res: ENV.UC_RES,
    api: '/tokens',
    idVar: 'access_token'
  }

  /**
   * @override
   */
  GET (options) {
    return new Promise(resolve => resolve())
  }

}
