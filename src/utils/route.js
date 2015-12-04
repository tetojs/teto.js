import React from 'react'
import { Link } from 'react-router'
import routes from 'routes'

import { Menu, Icon } from 'antd'

const walkRoutes = function (options = {
  recursive: true,
  level: 0,
  prefix: '/',
  Cmp: Menu,
  mode: 'horizontal',
  title: ''
}) {
  let { sets, recursive, level, prefix, Cmp, mode, title } = options

  if (!Cmp) {
    Cmp = Menu
  }

  if (!mode) {
    mode = 'horizontal'
  }

  if (!title) {
    title = ''
  }

  return (
    <Cmp key={level + ':' + prefix} mode={mode} title={title}>
      {
        Object.keys(sets)
        .filter((path) => path !== '/' && path !== '*')
        .reduce((arr, path, idx) => {
          let value = sets[path]

          if (recursive) {
            if (value.childroutes) {
              arr.push(
                walkRoutes({
                  title: <Link to={prefix + path} activeClassName="active">
                    {value.icon && <Icon type={value.icon} /> }
                    {value.title}
                  </Link>,
                  sets: value.childroutes,
                  recursive,
                  level: level + 1,
                  prefix: prefix + path + '/',
                  Cmp: Menu.SubMenu,
                  mode: mode
                })
              )

              return arr
            }
          }

          arr.push(
            <Menu.Item key={level + ':' + idx}>
              <Link to={prefix + path} activeClassName="active">
                {value.icon && <Icon type={value.icon} />}
                {value.title}
              </Link>
            </Menu.Item>
          )

          return arr
        }, [])
      }
    </Cmp>
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
        .reduce((obj, key) => {
          return obj[key || '/'].childroutes
        }, routes)
      }
    } else {
      sets = routes
    }

    return walkRoutes({
      sets,
      recursive,
      level: 0,
      prefix: scope
    })
  }

}
