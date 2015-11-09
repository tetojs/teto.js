export default {

  path: '*',

  // getChildRoutes (location, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, [
  //       require('./routes/add')
  //     ])
  //   })
  // },

  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components'))
    })
  }

}
