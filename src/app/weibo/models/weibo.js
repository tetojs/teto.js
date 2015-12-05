import ENV from 'utils/env'
import REST from 'utils/rest'

export default class extends REST {

  __resource = {
    res: ENV.MB_RES,
    api: '/timelines/{timeline_name}',
    vars: {
      timeline_name: 'square'
    }
  }

}
