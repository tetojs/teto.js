import ENV from 'utils/env'
import REST from 'utils/rest'

export default class extends REST {

  resource = {
    res: ENV.UC_RES,
    api: '/organizations/{org_id}/users',
    idVar: 'user_id'
  }

  defaults = {
    $offset: 0,
    $limit: 20
  }

}
