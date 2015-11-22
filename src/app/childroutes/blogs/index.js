// Append current reducers to store
import './reducers/blogs'

export default {

  path: 'blogs',

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./childroutes'))
    })
  },

  getIndexRoute (location, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('./dashboard')
      })
    })
  },

  getComponent (location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./component'))
    })
  }

}
