import CONFIG from 'utils/config'
import REST from 'utils/rest'

import Promise from 'promise'

export default class extends REST {

  resource = {
    res: CONFIG.UC_RES,
    api: '/tokens',
    key: 'access_token'
  };

  /**
   * @override
   */
  GET (options) {
    return new Promise(resolve => resolve())
  }

}
