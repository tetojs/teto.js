// Append current reducers to store
import './reducers/about'

export default {

  path: 'about',

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
