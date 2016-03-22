const debug = require('debug')('app:bin:server')
import config from '../config'
import server from '../server'

const host = config.server_host
const port = config.server_port

server.listen(port, host, () => {
  debug('Server is now running at ' + host + ':' + port + '.')
})
