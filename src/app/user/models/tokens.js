import ENV from 'utils/env'
import REST from 'utils/rest'

export default class extends REST {

  __resource = {
    api: '/tokens',
    idVar: 'access_token',
    ...ENV.UC_RES
  }

}
