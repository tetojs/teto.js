require('babel/register')

const chalk = require('chalk')
const devServer = require('../.build/webpack-dev-server')
const config = require('../.build/config')

const host = config.get('webpack_host')
const port = config.get('webpack_port')
devServer.listen(port, host, function () {
  console.log(chalk.green(
    `webpack-dev-server is now running at ${host}:${port}.`
  ))
})
