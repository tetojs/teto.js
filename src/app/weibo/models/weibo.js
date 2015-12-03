import Promise from 'promise'

import ENV from 'utils/env'
import REST from 'utils/rest'

export default class extends REST {

  __resource = {
    api: '/timelines/{timeline_name}',
    vars: {
      timeline_name: 'square'
    },
    ...ENV.MB_RES
  }

}
