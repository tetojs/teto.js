const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
  hot: true,
  stats: {
    colors: true
  }
}).listen(3000, config.IP_ADDRESS, function (err) {
  if (err) {
    console.log(err)
  }

  console.log('Listening at ' + config.IP_ADDRESS + ':3000')
})
