require('babel-register')

const config = require('../.build/config')
const server = require('../.build/server')
const debug = require('debug')('app:bin:server')

const host = config.server_host
const port = config.server_port

server.listen(port, host, () => {
  debug('Server is now running at ' + host + ':' + port + '.')
})
