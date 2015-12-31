import CONFIG from 'utils/config'
import REST from 'utils/rest'

import Promise from 'promise'

export default class extends REST {

  resource = {
    res: CONFIG.UC_RES,
    api: '/users',
    key: 'user_id'
  }

  /**
   * @override
   */
  DELETE (options) {
    return new Promise(resolve => resolve())
  }

}
