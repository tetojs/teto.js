/**
 * this will make webpack code splitting not working
 */

export default function (options) {

  let route = {

    path: options.path,

    getChildRoutes (location, cb) {
      options.childRoutes &&
      require.ensure([], () => {
        cb(null, options.childRoutes)
      })
    },

    getIndexRoute (location, cb) {
      options.dashboard &&
      require.ensure([], () => {
        cb(null, {
          component: options.dashboard
        })
      })
    },

    getComponent (location, cb) {
      options.component &&
      require.ensure([], () => {
        cb(null, options.component)
      })
    }

  }

}
