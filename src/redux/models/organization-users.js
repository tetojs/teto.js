import CONFIG from 'utils/config'
import REST from 'utils/rest'

export default class extends REST {

  resource = {
    res: CONFIG.UC_RES,
    api: '/organizations/{org_id}/users',
    key: 'user_id'
  };

  defaults = {
    $offset: 0,
    $limit: 20
  };

}
