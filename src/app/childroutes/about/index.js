export default {

  path: 'about',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/contact'),
        require('./routes/address')
      ])
    })
  },

  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components'))
    })
  }

}
