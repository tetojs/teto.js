import React from 'react'
import { Link } from 'react-router'
import routes from 'routes'

const walkRoutes = function (sets, recursive = true, level = 0, prefix = '/') {
  return (
    <ul>
      {
        Object.keys(sets)
        .filter((path) => path !== '/' && path !== '*')
        .map((path, idx) =>
          <li key={level + ':' + idx}>
            <Link to={prefix + path} activeClassName="active">{sets[path].title}</Link>
            { recursive && sets[path].childroutes &&
              walkRoutes(sets[path].childroutes, recursive, level + 1, prefix + path + '/') }
          </li>
        )
      }
    </ul>
  )
}

export default {

  /**
   * 根据给定的路径返回导航
   * @param  {string}  scope     路径
   * @param  {boolean} recursive 是否递归
   * @return {string}            HTML 代码
   */
  getLinks (scope, recursive) {
    let sets

    if (scope) {
      if (scope === '/') {
        sets = routes['/'].childroutes
      } else {
        sets = scope
        .replace(/\/$/, '')
        .split('/')
        .reduce(function (obj, key) {
          return obj[key || '/'].childroutes
        }, routes)
      }
    } else {
      sets = routes
    }

    return walkRoutes(sets, recursive, 0, scope)
  }

}
