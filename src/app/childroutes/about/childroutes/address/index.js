export default {

  path: 'address',

  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./component'))
    })
  }

}
