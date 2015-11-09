export default {

  path: 'todos',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/add')
      ])
    })
  },

  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components'))
    })
  }

}
