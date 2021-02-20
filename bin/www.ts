/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

// #!/usr/bin/env node
const path = require('path')

const _path = __dirname.split(path.sep)
_path.pop()
const workDir = _path.join(path.sep)
process.chdir(workDir)

import app from '../src/app'
import env from '../_config/environments'
const debug = require('debug')('api:server')
const http = require('http')

// Funções internas
const _normalizePort = (val: string) => {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

const _onError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

const _onListening = () => {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
  console.log('Listening on ' + bind)
}

// Init
const port = _normalizePort(process.env.PORT || env.conf().port)
app.set('port', port)

const server = http.createServer(app)

server.listen(port)
server.setTimeout(180000)
server.on('error', _onError)
server.on('listening', _onListening)

module.exports = server
