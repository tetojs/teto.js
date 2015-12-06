import webpack from 'webpack'
import config from '../config'
import webpackConfig from './development'

webpackConfig.entry.app.push(
  `webpack-hot-middleware/client?path=/__webpack_hmr`,
  `webpack/hot/dev-server`
)

webpackConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
)

// We need to apply the react-transform HMR plugin to the Babel configuration,
// but _only_ when HMR is enabled. Putting this in the default development
// configuration will break other tasks such as test:unit because Webpack
// HMR is not enabled there, and these transforms require it.
webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
  if (/\.jsx?/.test(loader.test)) {
    loader.loaders = loader.loaders.map((item) => {
      if (item.indexOf('babel') === 0) {
        let a = item.split('?')
        a[1] = JSON.parse(a[1])
        a[1].env.development
          .extra['react-transform']
          .transforms.push({
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
          })

        return a[0] + '?' + JSON.stringify(a[1])
      }

      return item
    })
  }

  return loader
})

export default webpackConfig
