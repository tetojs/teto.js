export default {

  path: '/',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./todos'),
        require('./error')
      ])
    })
  },

  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components'))
    })
  }

}
