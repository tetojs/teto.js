import axios from 'axios'
const debug = require('debug')('app:server:dispatcher')

export default options => {
  debug('Enable Dispatcher middleware.')
  let cached = null

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

  return async (ctx, next) => {
    const req = ctx.request

    if (!/\/dispatcher\//.test(req.url) || !req.headers.dispatcher) {
      return next()
    }

    await getBearerToken().then(({ token, user }) => {
      const { dispatcher } = req.headers
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
      if (api.indexOf('?') !== -1) {
        api += '&orgId=' + user.org_exinfo.org_id +
          '&suid=' + token.user_id
      } else {
        api += '?orgId=' + user.org_exinfo.org_id +
          '&suid=' + token.user_id
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
    }, () => {
      debug('Dispatcher ERROR')
    })
  }
}
