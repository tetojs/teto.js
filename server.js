const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  hot: true,
  stats: {
    colors: true
  }
}).listen(config.SERVER_PORT, config.SERVER_HOST, function (err) {
  if (err) {
    console.log(err)
  }

  console.log('Listening at ' + config.SERVER_HOST + ':' + config.SERVER_PORT)
})
