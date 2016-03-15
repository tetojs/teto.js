import axios from 'axios'
const debug = require('debug')('app:server:dispatcher')

export default options => {
  debug('Enable Dispatcher middleware.')
  let cached = null
  const cachedSuid = {}
  const url = 'https://ucbetapi.101.com/v0.93'

  const { login_name, password } = options
  if (!login_name || !password) {
    throw new Error('need login_name and password')
  }

  const getBearerToken = () => {
    return new Promise((resolve, reject) => {
      if (cached) {
        return resolve(cached)
      }
      axios({
        url: url + '/bearer_tokens',
        data: {
          login_name: login_name,
          password: password
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then(({ data }) => {
        cached = {
          token: data
        }
        axios({
          url: url + '/users/' + data.user_id,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer "' + data.access_token + '"'
          }
        }).then(res => {
          cached.user = res.data
          resolve(cached)
        }, () => {
          reject((cached = null))
        })
      }, () => {
        reject((cached = null))
      })
    })
  }


  const getSuid = (authorization, host, method, api) => {
    if (authorization) {
      return new Promise((resolve, reject) => {
        const macToken = {}

        authorization.trim().split(',').forEach(s => {
          const index = s.indexOf('=')
          if (index > -1) {
            const key = s.substring(0, index).trim()
            let value = s.substring(index + 1).trim()
            value = value.substring(1, value.length - 1)
            macToken[key] = value
          }
        })

        const accessToken = macToken['MAC id']
        const mac = macToken.mac
        const nonce = macToken.nonce
        let suid = cachedSuid[accessToken]

        if (suid) {
          return resolve(suid)
        }
        axios({
          url: url + '/tokens/' + accessToken + '/actions/valid',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          data: {
            mac,
            host,
            nonce,
            http_method: method,
            request_uri: '/v0.1/dispatcher' + api
          }
        }).then(({data, status}) => {
          cachedSuid[accessToken] = data.user_id
          resolve(data.user_id)
        }, ({data, status}) => {
          reject(false)
        })
      })
    } else {
      return new Promise(resolve => {
        return resolve(false)
      })
    }
  }

  return async (ctx, next) => {
    const req = ctx.request

    if (!/\/dispatcher\//.test(req.url) || !req.headers.dispatcher) {
      return next()
    }

    await getBearerToken().then(({ token, user }) => {
      const { dispatcher, authorization } = req.headers
      const dispatcherHost = req.headers.host
      const _dispatcher = JSON.parse(dispatcher)
      const { protocol, host, ver, vars } = _dispatcher
      let { api } = _dispatcher
      api = decodeURIComponent(api)
      if (vars) {
        Object.keys(vars).forEach(key => {
          api = api.replace(
            new RegExp('{' + key.replace(/([\^\$\\])/g, '\\$1') + '}', 'img'),
            vars[key]
          )
        })
      }

      return getSuid(authorization, dispatcherHost, req.method, api).then(suid => {
        if (suid && api.indexOf('?') === -1) {
          api += '?suid=' + suid
        } else if (suid && api.indexOf('?') !== -1) {
          api += '&suid=' + suid
        }

        const responder = ({ data, status }) => {
          ctx.status = status
          ctx.body = data
        }
        return axios({
          url: protocol + host + '/' + ver + api,
          method: req.method,
          data: req.body,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: 'Bearer "' + token.access_token + '"'
          }
        }).then(responder, responder)
      })
    }, () => {
      debug('Dispatcher ERROR')
    })
  }
}
