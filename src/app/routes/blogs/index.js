export default {

  path: 'blogs',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/add')
      ])
    })
  },

  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('./components')
      })
    })
  },

  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/main'))
    })
  }

}
