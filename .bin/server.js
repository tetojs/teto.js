require('babel/register')

const chalk = require('chalk')
const server = require('../.build/server')
const config = require('../.build/config')

const host = config.get('server_host')
const port = config.get('server_port')

server.listen(port, host, function () {
  console.log(chalk.green(
    `Server is now running at ${host}:${port}.`
  ))
})
