import ENV from 'utils/env'
import REST from 'utils/rest'

import Promise from 'promise'

export default class extends REST {

  resource = {
    res: ENV.UC_RES,
    api: '/users',
    idVar: 'user_id'
  }

  /**
   * @override
   */
  DELETE (options) {
    return new Promise(resolve => resolve())
  }

}
