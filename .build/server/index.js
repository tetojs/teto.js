import express from 'express'
import historyApiFallback from 'connect-history-api-fallback'
import config from '../config'

const server = express()

server.use(historyApiFallback({
  verbose : false
}))

// Enable webpack middleware if the application is being
// run in development mode.
if (config.get('globals').__DEV__) {
  const webpack = require('webpack')
  const webpackConfig = require('../webpack/development_hot')
  const compiler = webpack(webpackConfig)
  const bodyParser = require('body-parser')

  server.use(bodyParser.json())

  // dispatcher for cross domain
  // `.shouldnotpublic` is a module
  // that returns `login_name` and `password`
  server.use(require('./middlewares/dispatcher')(require('../../.shouldnotpublic')))

  server.use(require('./middlewares/webpack-dev')({
    compiler,
    publicPath: webpackConfig.output.publicPath
  }))

  server.use(require('./middlewares/webpack-hmr')({ compiler }))
}

export default server
