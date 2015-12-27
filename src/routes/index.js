import users from './users'

export default {
  '/': {
    title: '首页',
    component: 'home/index',
    indexroute: 'home/_indexroute/index',
    childroutes: {
      login: {
        title: '登录',
        component: 'login/index'
      },
      logout: {
        title: '退出',
        component: 'logout/index'
      },
      ...users,
      '*': {
        component: 'error/index'
      }
    }
  }
}
