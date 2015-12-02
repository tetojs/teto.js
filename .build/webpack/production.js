import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpackConfig from './_base'

import config from '../config'

const dist = config.get('dir_dist')

webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
  if (/css/.test(loader.test)) {
    const [first, ...rest] = loader.loaders

    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  }

  return loader
})

webpackConfig.plugins.push(
  new ExtractTextPlugin(`${dist}/[name].[chunkhash].css`),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      unused: true,
      dead_code: true
    }
  })
)

export default webpackConfig
